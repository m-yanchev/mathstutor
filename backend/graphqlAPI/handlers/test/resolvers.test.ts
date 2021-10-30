import {resolvers} from "./resolvers";
import {getDataSource} from "./dataSource";
import {dbAPI} from "../../libs/dynamoDBAPI";

describe("test", () => {
    const parent = {finalTestId: 1}
    const args = {id: 1}
    const context = {dataSource: getDataSource(dbAPI)}
    test("Получить тест из поля finalTest", async () => {
        const info = {fieldName: "finalTest"}
        const response = await resolvers.Lesson.finalTest(parent, {}, context, info)
        await expect(response.id).toBe(1)
    })
    test("Получить тест из поля test", async () => {
        const info = {fieldName: "test"}
        const response = await resolvers.Query.test({}, args, context, info)
        await expect(response.id).toBe(1)
        await expect(response.exercises).toHaveLength(3)
        await expect([1]).toEqual(expect.arrayContaining([response.exercises[0].problemId]))
        await expect([4, 5, 2]).toEqual(expect.arrayContaining([response.exercises[1].problemId]))
        await expect([6, 3]).toEqual(expect.arrayContaining([response.exercises[2].problemId]))
        await expect(response.exercises[0].withDetailedAnswer).toBe(false)
        await expect(response.exercises[1].withDetailedAnswer).toBe(false)
        await expect(response.exercises[2].withDetailedAnswer).toBe(true)
    })
    test("Получить исключение", async () => {
        const info = {fieldName: "test"}
        const args = {id: 0}
        expect.assertions(1)
        try {
            await resolvers.Lesson.finalTest({}, args, context, info)
        } catch (e) {
            expect(e.message).toBe("args.id должен принимать значение")
        }
    })
})