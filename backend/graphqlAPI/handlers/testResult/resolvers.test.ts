import {getDataSource} from "./dataSource";
import {dbAPI} from "../../libs/dynamoDBAPI";
import {resolvers} from "./resolvers";

describe("testResult resolver", () => {

    test("Получить список из 2-х результатов", async () => {
        const context = {dataSource: getDataSource(dbAPI), userAPI: {user: {id: "6148e012088bd4488dc3d6bf", token: ""}}}
        const parent = {id: 1}
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
        const response = await resolvers.Test.results(parent, {}, context)
        await expect(response).toEqual(result)
    })
})