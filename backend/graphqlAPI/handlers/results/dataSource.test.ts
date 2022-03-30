import {dbAPI} from "../../libs/dynamoDBAPI";
import {getDataSource} from "./dataSource";
import {TestResult} from "./results";
import {testUsers} from "./accessConsts";

describe("get dataSource testResult", () => {

    test("Получить список из 2-х результатов по ученику и номеру теста", async () => {
        const {getTestResults} = getDataSource(dbAPI)
        const {student} = testUsers
        const filter = {userId: student.id, testId: 1}
        const items = await getTestResults(filter)
        const result: TestResult[] = [{
            percentage: 80,
            msTimeStamp: "1633089600123",
            testId: "1",
            userId: student.id,
            finishedTimeStamp: null
        }, {
            percentage: 70,
            msTimeStamp: "1633176000456",
            testId: "1",
            userId: student.id,
            finishedTimeStamp: 1633178240
        }]
        await expect(items).toEqual(result)
    })

    test("Получить список из 5-ти результатов по ученику", async () => {
        const {getTestResults} = getDataSource(dbAPI)
        const {student} = testUsers
        const filter = {userId: student.id}
        const items = await getTestResults(filter)
        const result: TestResult[] = [{
            percentage: 80,
            msTimeStamp: "1633089600123",
            testId: "1",
            userId: student.id,
            finishedTimeStamp: null
        }, {
            percentage: 80,
            msTimeStamp: "1633089600124",
            testId: "4",
            userId: student.id,
            finishedTimeStamp: null
        }, {
            percentage: 70,
            msTimeStamp: "1633176000456",
            testId: "1",
            userId: student.id,
            finishedTimeStamp: 1633178240
        }, {
            percentage: 70,
            msTimeStamp: "1633176000457",
            testId: "4",
            userId: student.id,
            finishedTimeStamp: 1633178240
        }, {
            percentage: 70,
            msTimeStamp: "1633177000456",
            testId: "5",
            userId: student.id,
            finishedTimeStamp: 1633177240
        }, {
            percentage: 60,
            msTimeStamp: "1633262400123",
            testId: "2",
            userId: student.id,
            finishedTimeStamp: null
        }]
        await expect(items).toEqual(result)
    })
})