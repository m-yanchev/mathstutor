import {resolvers} from "./resolvers";
import {getDataSource} from "./dataSource";
import {dbAPI} from "../../libs/dynamoDBAPI";

describe("test", () => {
    const parent = {problemId: 1}
    const context = {dataSource: getDataSource(dbAPI)}
    test("Получить задачу", async () => {
        const result = {
            id: 1,
            desc: "5+5",
            answer: "10"
        }

        const response = await resolvers.Exercise.problem(parent, {}, context)
        await expect(response).toEqual(result)
    })
})