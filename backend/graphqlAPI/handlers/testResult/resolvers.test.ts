import {getDataSource, ProblemResultItem, TestResultItem} from "./dataSource";
import {dbAPI} from "../../libs/dynamoDBAPI";
import {
    GetProblemResult,
    GetTestResult,
    ProblemResult,
    ProblemResultKey,
    resolvers,
    TestResult,
    TestResultKey, WriteResultArgs, WriteResultResponse
} from "./resolvers";

const getTestDataSource = dbAPI => {

    const {getItem, deleteItem} = dbAPI

    const getTestResult: GetTestResult = async key => {
        const {msTimeStamp, userId} = key
        const item: TestResultItem = await getItem("testResults", {
            msTimeStamp: {S: msTimeStamp},
            userId: {S: userId}
        })
        return {
            msTimeStamp: item.msTimeStamp.S,
            userId: item.userId.S,
            finishedTimeStamp: item.finishedTimeStamp ? Number(item.finishedTimeStamp.N) : null,
            testId: Number(item.testId.N),
            percentage: Number(item.percentage.N)
        }
    }

    const getProblemResult: GetProblemResult = async key => {
        const {msTimeStamp, userId} = key
        const item: ProblemResultItem = await getItem("problemResults", {
            msTimeStamp: {S: msTimeStamp},
            userId: {S: userId}
        })
        return {
            msTimeStamp: item.msTimeStamp.S,
            userId: item.userId.S,
            percentage: Number(item.percentage.N),
            msTestResultTimeStamp: item.msTestResultTimeStamp.S,
        }
    }

    const deleteTestResult = async (key: TestResultKey) => {
        const {msTimeStamp, userId} = key
        await deleteItem("testResults", {
            msTimeStamp: {S: msTimeStamp},
            userId: {S: userId}
        })
    }

    const deleteProblemResult = async (key: ProblemResultKey) => {
        const {msTimeStamp, userId} = key
        await getItem("problemResults", {
            msTimeStamp: {S: msTimeStamp},
            userId: {S: userId}
        })
    }

    return {getTestResult, getProblemResult, deleteTestResult, deleteProblemResult}
}

const writeResultExpect = async (args, responseReference) => {

    const userId = "6148e012088bd4488dc3d6bf"
    const context = {dataSource: getDataSource(dbAPI), userAPI: {user: {id: userId, token: ""}}}
    const {getTestResult, getProblemResult} = getTestDataSource(dbAPI)

    const response: WriteResultResponse = await resolvers.Mutation.writeResult({}, args, context)
    await expect(response).toEqual(responseReference)
    await expect(response.problemResult.msTestResultTimeStamp).toBe(response.testResult.msTimeStamp)
    const testResult: TestResult = await getTestResult({msTimeStamp: response.testResult.msTimeStamp, userId})
    const problemResult: ProblemResult = await getProblemResult({
        msTimeStamp: response.problemResult.msTimeStamp, userId
    })
    await expect(testResult).toEqual(response.testResult)
    await expect(problemResult).toEqual(response.problemResult)

    return response
}

describe("testResult results resolver", () => {

    test("Получить список из 2-х результатов", async () => {
        const context = {dataSource: getDataSource(dbAPI), userAPI: {user: {id: "6148e012088bd4488dc3d6bf", token: ""}}}
        const parent = {id: 1}
        const result: TestResult[] = [{
            percentage: 80,
            msTimeStamp: "1633089600123",
            testId: 1,
            userId: "6148e012088bd4488dc3d6bf",
            finishedTimeStamp: null
        }, {
            percentage: 70,
            msTimeStamp: "1633176000456",
            testId: 1,
            userId: "6148e012088bd4488dc3d6bf",
            finishedTimeStamp: 1633178240
        }]
        const response = await resolvers.Test.results(parent, {}, context)
        await expect(response).toEqual(result)
    })
})

describe("testResult writeResult resolver", () => {

    test("Записать результаты, теста", async () => {

        const userId = "6148e012088bd4488dc3d6bf"
        const {deleteTestResult, deleteProblemResult} = getTestDataSource(dbAPI)
        const args: WriteResultArgs[] = []
        const writeResultResponseReferences: WriteResultResponse[] = []
        const writeResultResponses: WriteResultResponse[] = []

        args.push({
            testId: 1,
            msTestResultTimeStamp: null,
            answer: "10",
            problemId: 1
        })
        writeResultResponseReferences.push({
            testResult: {
                msTimeStamp: expect.any(String),
                userId,
                testId: 1,
                finishedTimeStamp: null,
                percentage: 33
            },
            problemResult: {
                msTimeStamp: expect.any(String),
                userId,
                percentage: 100,
                msTestResultTimeStamp: expect.any(String)
            }
        })
        writeResultResponses.push(await writeResultExpect(args[0], writeResultResponseReferences[0]))

        args.push({
            testId: 1,
            msTestResultTimeStamp: writeResultResponses[0].testResult.msTimeStamp,
            answer: "7",
            problemId: 2
        })
        writeResultResponseReferences.push({
            testResult: {
                msTimeStamp: writeResultResponses[0].testResult.msTimeStamp,
                userId,
                testId: 1,
                finishedTimeStamp: null,
                percentage: 67
            },
            problemResult: {
                msTimeStamp: expect.any(String),
                userId,
                percentage: 100,
                msTestResultTimeStamp: writeResultResponses[0].testResult.msTimeStamp
            }
        })
        writeResultResponses.push(await writeResultExpect(args[1], writeResultResponseReferences[1]))

        args.push({
            testId: 1,
            msTestResultTimeStamp: writeResultResponses[0].testResult.msTimeStamp,
            answer: "12",
            problemId: 3
        })
        writeResultResponseReferences.push({
            testResult: {
                msTimeStamp: writeResultResponses[0].testResult.msTimeStamp,
                userId,
                testId: 1,
                finishedTimeStamp: expect.any(Number),
                percentage: 100
            },
            problemResult: {
                msTimeStamp: expect.any(String),
                userId,
                percentage: 100,
                msTestResultTimeStamp: writeResultResponses[0].testResult.msTimeStamp
            }
        })
        writeResultResponses.push(await writeResultExpect(args[2], writeResultResponseReferences[2]))

        await Promise.all(writeResultResponses.map(response => deleteProblemResult({
            msTimeStamp: response.problemResult.msTimeStamp,
            userId
        })))
        await deleteTestResult({
            msTimeStamp: writeResultResponses[0].testResult.msTimeStamp,
            userId
        })
    })
})