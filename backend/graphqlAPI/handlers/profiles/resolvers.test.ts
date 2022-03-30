import {testUsers} from "./accessConsts";
import {resolvers} from "./resolvers";
import {usersDataSource} from "../../libs/mongoUsersDataSource";
import {postTransport} from "../../libs/postTransportAPI";
import {Profile} from "../../libs/User";
import {getTestServer} from "../../libs/apolloSubgraphHandler";
import {typeDefs} from "./schema";
import {Context, DataSource, ProfileResponse} from "./profiles";
import {gql} from "apollo-server";

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

describe("profiles Query.student resolver", () => {

    const dataSource: DataSource = {users: usersDataSource, postTransport}
    const query = gql`
        query Student($id: ID){
            student(id: $id) {
                id
                appointmentId
                name
                email
                emailConfirmed
                access
            }
        }
    `

    test("Получить данные ученика, через id", async () => {

        const result: ProfileResponse ={
            id: student.id,
            name: student.name,
            email: student.email,
            emailConfirmed: true,
            appointmentId: "61335c2473590aa9597154e7",
            access: "student"
        }

        const server = await getTestServer({typeDefs, resolvers, dataSource}, tutor)
        const response = await server.executeOperation({query, variables: {id: student.id}})
        if (response.errors) console.error(response.errors)
        await expect(response.data?.student).toEqual(result)
    })

    test("Получить данные ученика, как пользователя", async () => {

        const result: ProfileResponse ={
            id: student.id,
            name: student.name,
            email: student.email,
            emailConfirmed: true,
            appointmentId: "61335c2473590aa9597154e7",
            access: "student"
        }

        const server = await getTestServer({typeDefs, resolvers, dataSource}, student)
        const response = await server.executeOperation({query})
        if (response.errors) console.error(response.errors)
        await expect(response.data?.student).toEqual(result)
    })

    test("Попытка получить данные ученика не авторизованным пользователем", async () => {
        const server = await getTestServer({typeDefs, resolvers, dataSource})
        const response = await server.executeOperation({query, variables: {id: student.id}})
        await expect(response.data?.student).toBeUndefined()
    })

    test("Попытка получить данные ученика другим учеником", async () => {
        const server = await getTestServer({typeDefs, resolvers, dataSource}, student)
        const response = await server.executeOperation({query, variables: {id: student.id}})
        await expect(response.data?.student).toBeUndefined()
    })
})

describe("profiles Query.profile resolver", () => {

    const dataSource: DataSource = {users: usersDataSource, postTransport}
    const query = gql`
        query {
            profile {
                id
                appointmentId
                name
                email
                emailConfirmed
                access
            }
        }
    `

    test("Получить данные учителя", async () => {

        const result: ProfileResponse ={
            id: tutor.id,
            name: tutor.name,
            email: tutor.email,
            emailConfirmed: true,
            appointmentId: null,
            access: "tutor"
        }

        const server = await getTestServer({typeDefs, resolvers, dataSource}, tutor)
        const response = await server.executeOperation({query})
        if (response.errors) console.error(response.errors)
        await expect(response.data?.profile).toEqual(result)
    })

    test("Получить null, если пользователь не залогинен", async () => {
        const server = await getTestServer({typeDefs, resolvers, dataSource})
        const response = await server.executeOperation({query})
        if (response.errors) console.error(response.errors)
        await expect(response.data?.profile).toBeNull()
    })
})