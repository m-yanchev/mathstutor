import {findOne} from "../../../libs/mongoDBDataSource";
import {resolvers} from "../../appointment/resolvers";

describe("appointment", () => {
    const context = {mongoAPI: {findOne}}
    const parent = {appointmentId: "61335c2473590aa9597154e7"}
    test("Получить назначение", async () => {
        const result = {
            id: "61335c2473590aa9597154e7",
            startTimeStamp: 1632171600,
            weekDays: [
                {number: 2, hour: 17, minute: 0},
                {number: 6, hour: 17, minute: 0}
            ],
            vacations: [
                {startTimeStamp: 1640898000, finishTimeStamp: 1641675600},
                {startTimeStamp: 1653426000, finishTimeStamp: 1662325200}
            ],
            courseId: 1
        }
        await expect(await resolvers.Profile.appointment(parent, undefined, context)).toEqual(result)
    })
})