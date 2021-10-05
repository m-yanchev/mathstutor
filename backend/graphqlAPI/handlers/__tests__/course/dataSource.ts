import {dbAPI} from "../../../libs/dynamoDBAPI";
import {getDataSource} from "../../course/dataSource";

describe("get", () => {

    test("Получить курс", async () => {

        const {get} = getDataSource(dbAPI)
        const id = 1
        const item = await get(id)
        const result = "Подготовка к ЕГЭ профильного уровня. 10 - 11 класс. Начальный уровень: средний. 140 часов."
        await expect(item.title).toEqual(result)
    })
})