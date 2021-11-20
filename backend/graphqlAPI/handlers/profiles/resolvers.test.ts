import {testUsers} from "./accessConsts";
import {Context, resolvers} from "./resolvers";
import {usersDataSource} from "../../libs/mongoUsersDataSource";
import {postTransport} from "../../libs/postTransportAPI";
import {Profile} from "../../libs/User";

const {tutor, student} = testUsers
const context: Context = {
    dataSource: {
        users: usersDataSource,
        postTransport: postTransport
    },
    userAPI: {user: {id: tutor.id, token: tutor.token}}
}

describe("profiles students resolver", () => {

    test("Получить список студентов", async () => {
        const result: Profile[] = [expect.objectContaining({
            id: student.id,
            name: "Николай",
            email: "n.yanchev@yandex.ru",
            token: student.token,
            emailConfirmed: true,
            appointmentId: "61335c2473590aa9597154e7",
            access: "student"
        })]
        const response = await resolvers.Query.students({}, {}, context)
        await expect(response).toEqual(expect.arrayContaining(result))
    })
})

describe("profiles profile resolver", () => {

    test("Получить данные учителя", async () => {
        const result: Profile ={
            id: tutor.id,
            name: tutor.name,
            email: tutor.email,
            secret: tutor.secret,
            token: tutor.token,
            emailConfirmed: true,
            access: "tutor"
        }
        const response = await resolvers.Query.profile({}, {}, context)
        await expect(response).toEqual(result)
    })
})