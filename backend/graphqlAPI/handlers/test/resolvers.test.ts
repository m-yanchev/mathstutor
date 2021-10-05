import {resolvers} from "./resolvers";

describe("test", () => {
    const parent = {finalTestId: 1}
    const info = {fieldName: "finalTest"}
    test("Получить тест", async () => {
        const result = {
            id: 1
        }
        const response = resolvers.Lesson.finalTest(parent, {}, {}, info)
        await expect(response).toEqual(result)
    })
})