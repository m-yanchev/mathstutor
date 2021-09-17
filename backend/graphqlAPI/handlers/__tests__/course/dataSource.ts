import {dbAPI} from "../../../libs/dynamoDBAPI";
import {getDataSource} from "../../course/dataSource";

describe("get", () => {

    test("Получить курс", async () => {

        const {get} = getDataSource(dbAPI)
        const title = "Подготовка к ЕГЭ профильного уровня. 11 класс. Продвинутый уровень."
        const item = await get(title)
        const result = {
            title: "Подготовка к ЕГЭ профильного уровня. 11 класс. Продвинутый уровень.",
            lessonTitles: ["Задания 13. Тригонометрические уравнения.", "Задания 17. Кредиты."]
        }
        await expect(item).toEqual(result)
    })
})