import {dbAPI} from "../../libs/dynamoDBAPI";
import {getDataSource} from "./dataSource";
import {TestResult} from "./resolvers";

describe("get dataSource testResult", () => {

    test("Получить список из 2-х результатов", async () => {
        const {getTestResults} = getDataSource(dbAPI)
        const filter = {userId: "6148e012088bd4488dc3d6bf", testId: 1}
        const items = await getTestResults(filter)
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
        await expect(items).toEqual(result)
    })
})