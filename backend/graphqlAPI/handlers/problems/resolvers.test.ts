import {resolvers} from "./resolvers";
import {getDataSource} from "./dataSource";
import {dbAPI} from "../../libs/dynamoDBAPI";

describe("test", () => {

    const context = {dataSource: getDataSource(dbAPI)}

    test("Получить задачу без commonDesc и imageAlt", async () => {
        const parent = {problemId: 1}
        const result = {
            id: 1,
            commonDesc: null,
            desc: "5+5",
            imageAlt: null,
            answer: "10"
        }

        const response = await resolvers.Exercise.problem(parent, {}, context)
        await expect(response).toEqual(result)
    })

    test("Получить задачу с commonDesc и imageAlt", async () => {
        const parent = {problemId: 2}
        const result = {
            id: 2,
            commonDesc: "Вычислите:",
            desc: "5+2",
            imageAlt: "иллюстрация",
            answer: "7"
        }

        const response = await resolvers.Exercise.problem(parent, {}, context)
        await expect(response).toEqual(result)
    })
})