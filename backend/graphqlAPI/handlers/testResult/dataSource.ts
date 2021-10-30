import {
    AddProblemResult,
    AddTestResult,
    DataSource,
    GetTestResults,
    GetProblem,
    GetProblemResults,
    GetTest,
    UpdateTestResult
} from "./resolvers";
import type {DynamoNumber, DynamoString} from "dynamoDBAPI";

type GetDataSource = (dbAPI: DbAPI) => DataSource
type DbAPI = {
    getItems: (tableName: TableName, filter: Filter) => Promise<TestResultItem[]>,
    getItem: (tableName: TableName, key: Key) => Promise<any>,
    putItem: (tableName: TableName, item: any) => Promise<void>,
    updateItem: (tableName: TableName, key: any, attributeUpdates: any) => Promise<void>
}

type TableName = "testResults" | "problems" | "tests" | "problemResults"
type Key = {
    id: DynamoNumber
}
type Filter = {
    expression: "testId = :testId and userId = :userId" | "msTestResultTimeStamp = :msTestResultTimeStamp and userId = :userId",
    values: any
}
export type TestResultItem = {
    msTimeStamp: DynamoString,
    userId: DynamoString,
    testId: DynamoNumber,
    finishedTimeStamp?: DynamoNumber
    percentage: DynamoNumber
}
export type ProblemResultItem = {
    percentage: DynamoNumber,
    msTimeStamp: DynamoString,
    msTestResultTimeStamp: DynamoString,
    userId: DynamoString
}

export const getDataSource: GetDataSource = (dbAPI) => {

    const {getItems, getItem, putItem, updateItem} = dbAPI

    const getTestResults: GetTestResults = async filter => {
        const {userId, testId} = filter
        const items = await getItems("testResults", {
            expression: "testId = :testId and userId = :userId",
            values: {":testId": {N: String(testId)}, ":userId": {S: userId}}
        })
        return items.map(item => ({
            userId: userId,
            testId: testId,
            percentage: Number(item.percentage.N),
            msTimeStamp: item.msTimeStamp.S,
            finishedTimeStamp: item.finishedTimeStamp ? Number(item.finishedTimeStamp.N) : null
        }))
    }

    const addProblemResult: AddProblemResult = async data => {
        const {msTimeStamp, userId, percentage, msTestResultTimeStamp} = data
        const item: ProblemResultItem = {
            msTimeStamp: {S: msTimeStamp},
            userId: {S: userId},
            percentage: {N: String(percentage)},
            msTestResultTimeStamp: {S: msTestResultTimeStamp}
        }
        await putItem("problemResults", item)
    }

    const getProblem: GetProblem = async id => {
        const {answer} = await getItem("problems", {id: {N: String(id)}})
        return {
            answer: answer.S
        }
    }

    const addTestResult: AddTestResult = async data => {
        const {msTimeStamp, userId, testId, finishedTimeStamp, percentage} = data
        const testResultItem: TestResultItem = {
            msTimeStamp: {S: msTimeStamp},
            userId: {S: userId},
            testId: {N: String(testId)},
            percentage: {N: String(percentage)}
        }
        if (finishedTimeStamp) testResultItem.finishedTimeStamp = {N: String(finishedTimeStamp)}
        await putItem("testResults", testResultItem)
    }

    const updateTestResult: UpdateTestResult = async (filter, data) => {
        const {msTimeStamp, userId} = filter
        const {finishedTimeStamp, percentage} = data
        const expression = `SET ${finishedTimeStamp ? "finishedTimeStamp = :finishedTimeStamp, " : ""}percentage = :percentage`
        const values = finishedTimeStamp ? {
                ":finishedTimeStamp": {N: String(finishedTimeStamp)},
                ":percentage": {N: String(percentage)}
            } : {
            ":percentage": {N: String(percentage)}
        }
        await updateItem(
            "testResults",
            {msTimeStamp: {S: msTimeStamp}, userId: {S: userId}},
            {expression, values})
    }

    const getTest: GetTest = async id => {
        const {exercises} = await getItem("tests", {id: {N: String(id)}})
        return {
            exercisesLength: exercises.L.length
        }
    }

    const getProblemResults: GetProblemResults = async filter => {
        const {userId, msTestResultTimeStamp} = filter
        const items = await getItems("problemResults", {
            expression: "msTestResultTimeStamp = :msTestResultTimeStamp and userId = :userId",
            values: {":msTestResultTimeStamp": {S: msTestResultTimeStamp}, ":userId": {S: userId}}
        })
        return items.map(item => ({
            percentage: Number(item.percentage.N)
        }))
    }

    return {getTestResults, addProblemResult, getProblem, addTestResult, updateTestResult, getTest, getProblemResults}
}