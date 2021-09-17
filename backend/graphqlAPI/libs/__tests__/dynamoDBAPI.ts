import {dbAPI} from "../dynamoDBAPI";

describe("getItem", () => {

    test("Получить курс", async () => {

        const {getItem} = dbAPI
        const title = "Подготовка к ЕГЭ профильного уровня. 11 класс. Продвинутый уровень."
        const key = {title: {S: title}}
        const item = await getItem("courses", key)
        const result = {
            title: {S: "Подготовка к ЕГЭ профильного уровня. 11 класс. Продвинутый уровень."},
            lessonTitles: {L: [{S: "Задания 13. Тригонометрические уравнения."}, {S: "Задания 17. Кредиты."}]}
        }
        await expect(item).toEqual(result)
    })
})