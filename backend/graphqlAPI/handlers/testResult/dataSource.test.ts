import {dbAPI} from "../../libs/dynamoDBAPI";
import {getDataSource} from "./dataSource";

describe("get dataSource testResult", () => {

    test("Получить список из 2-х результатов", async () => {
        const {get} = getDataSource(dbAPI)
        const filter = {userId: "6148e012088bd4488dc3d6bf", testId: 1}
        const items = await get(filter)
        const result = [{
            percent: 80,
            timeStamp: 1633089600,
            testId: 1,
            userId: "6148e012088bd4488dc3d6bf"
        }, {
            percent: 70,
            timeStamp: 1633176000,
            testId: 1,
            userId: "6148e012088bd4488dc3d6bf"
        }]
        await expect(items).toEqual(result)
    })
})