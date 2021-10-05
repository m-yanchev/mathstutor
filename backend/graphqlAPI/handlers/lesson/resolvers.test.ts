import {getDataSource} from "./dataSource";
import {dbAPI} from "../../libs/dynamoDBAPI";
import {resolvers} from "./resolvers";

describe("lesson", () => {
    const context = {dataSource: getDataSource(dbAPI)}
    const args = {id: 1}
    test("Получить урок", async () => {
        const result = {
            id: 1,
            title: "Градусная и радианная мера на числовой окружности.",
            finalTestId: 1
        }
        const response = await resolvers.Query.lesson({}, args, context)
        await expect(response).toEqual(result)
    })
})

describe("lessons", () => {
    const context = {dataSource: getDataSource(dbAPI)}
    const parent = {lessonIdList: [1, 2, 3]}
    test("Получить список уроков", async () => {
        const result = [{
            id: 1,
            title: "Градусная и радианная мера на числовой окружности.",
            finalTestId: 1
        }, {
            id: 2,
            title: "Определение множества значений по точкам на числовой окружности.",
            finalTestId: 2
        }, {
            id: 3,
            title: "Синус и косинус на числовой окружности.",
            finalTestId: 3
        }]
        const response = await resolvers.Course.lessons(parent, {}, context)
        await expect(response).toEqual(result)
    })
})