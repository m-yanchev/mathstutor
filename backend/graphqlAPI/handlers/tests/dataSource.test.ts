import {DbAPI, DynamoProblemResultItem, DynamoTestResultItem, ProblemResultData, TestResultData} from "./tests";
import {getProblemResultsDataSource, getTestResultsDataSource} from "./dataSource";
import {testUsers} from "./accessConsts";
import {dbAPI} from "../../libs/dynamoDBAPI";

const getItemMock = async () => ({
    id: {N: "1"},
    title: {S: ""},
    exercises: {L: [{M: {problemIdList: {L: [{N: "1"}]}, maxEstimate: {N: "1"}}}]}
})

describe("getTestResultsDataSource", () => {

    const testResults: DynamoTestResultItem[] = [{
        msTimeStamp: {S: "1631023543324"}, // 07.09.2021 17:05
        finishedTimeStamp: {N: "1631026543"}, // 07.09.2021 17:55
    }, {
        msTimeStamp: {S: "1641570823324"}, // 07.01.2022 18:53
    }, {
        msTimeStamp: {S: "1637942023324"}, // 26.11.2021 18:53
        finishedTimeStamp: {N: "1637945623"}, // 26.11.2021 19:53
    }]

    const dbAPI: DbAPI = {
        getItems: async () => testResults,
        getItem: getItemMock
    }

    test("getItem", async () => {
        const result: TestResultData = {
            msTimeStamp: "1641570823324",
            isFinished: false
        }
        await expect(await getTestResultsDataSource(dbAPI).getItem({testId: 1, studentId: "1"})).toEqual(result)
    })
})

describe("getProblemResultsDataSource", () => {

    const problemResults: DynamoProblemResultItem[] = [{
        msTimeStamp: {S: "1631023543324"}, // 07.09.2021 17:05
        problemId: {N: "1"},
        estimate: {N: "4"},
        exerciseIndex: {N: "0"}
    }, {
        msTimeStamp: {S: "1641570823324"}, // 07.01.2022 18:53
        problemId: {N: "1"},
        estimate: {N: "5"},
        exerciseIndex: {N: "2"}
    }, {
        msTimeStamp: {S: "1637942023324"}, // 26.11.2021 18:53
        problemId: {N: "1"},
        estimate: {N: "10"},
        exerciseIndex: {N: "1"}
    }]

    test("getItem", async () => {

        const dbAPI: DbAPI = {
            getItems: async () => problemResults,
            getItem: getItemMock
        }

        const result: ProblemResultData = {
            msTimeStamp: "1641570823324",
            problemId: 1,
            estimate: 5,
            exerciseIndex: 2
        }
        await expect(await getProblemResultsDataSource(dbAPI).getItem({
            studentId: "1", problemId: 1
        })).toEqual(result)
    })

    test("getList mock", async () => {

        const dbAPI: DbAPI = {
            getItems: async () => problemResults,
            getItem: getItemMock
        }

        const result: ProblemResultData[] = [{
            msTimeStamp: "1631023543324",
            problemId: 1,
            estimate: 4,
            exerciseIndex: 0
        }, {
            msTimeStamp: "1641570823324",
            problemId: 1,
            estimate: 5,
            exerciseIndex: 2
        }, {
            msTimeStamp: "1637942023324",
            problemId: 1,
            estimate: 10,
            exerciseIndex: 1
        }]
        await expect(await getProblemResultsDataSource(dbAPI).getList({
            studentId: "1", msTestResultTimeStamp: "1633089600123"
        })).toEqual(result)
    })

    test("getList db", async () => {

        const {student} = testUsers

        const result: ProblemResultData[] = [{
            msTimeStamp: "1633089600123",
            problemId: 1,
            estimate: 100,
            exerciseIndex: 0
        }, {
            msTimeStamp: "1633089700123",
            problemId: 2,
            estimate: null,
            exerciseIndex: 1
        }]
        await expect(await getProblemResultsDataSource(dbAPI).getList({
            studentId: student.id, msTestResultTimeStamp: "1633089600123"
        })).toEqual(result)
    })
})