import {dbAPI} from "../dynamoDBAPI";

describe("getItem", () => {

    test("Получить курс", async () => {

        const {getItem} = dbAPI
        const title = "Подготовка к ЕГЭ профильного уровня. 10 - 11 класс. Начальный уровень: средний. 140 часов."
        const key = {title: {S: title}}
        const item = await getItem("courses", key)
        const result = {S: "Подготовка к ЕГЭ профильного уровня. 10 - 11 класс. Начальный уровень: средний. 140 часов."}
        await expect(item.title).toEqual(result)
    })
})