import {getDataSource} from "../../course/dataSource";
import {dbAPI} from "../../../libs/dynamoDBAPI";
import {resolvers} from "../../course/resolvers";

describe("course", () => {
    const context = {dataSource: getDataSource(dbAPI)}
    const parent = {courseId: 1}
    test("Получить курс", async () => {
        const result = {
            id: 1,
            title: "Подготовка к ЕГЭ профильного уровня. 10 - 11 класс. Начальный уровень: средний. 140 часов."
        }
        const course = await resolvers.Appointment.course(parent, undefined, context)
        await expect(course.id).toBe(result.id)
        await expect(course.title).toBe(result.title)
        await expect(course.lessonIdList[0]).toBe(1)
    })
})