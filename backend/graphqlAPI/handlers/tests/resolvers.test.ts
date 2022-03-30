import {resolvers} from "./resolvers";
import {getProblemResultsDataSource, getTestResultsDataSource, getTestsDataSource} from "./dataSource";
import {dbAPI} from "../../libs/dynamoDBAPI";
import {Context, DataSource, GetTestArgs, Test, TestResponse} from "./tests";
import {usersDataSource} from "../../libs/mongoUsersDataSource";
import {getTestServer} from "../../libs/apolloSubgraphHandler";
import {typeDefs} from "./schema";
import {testUsers} from "./accessConsts";
import {gql} from "@apollo/client";

const dataSource: DataSource = {
    tests: getTestsDataSource(dbAPI),
    testResults: getTestResultsDataSource(dbAPI),
    problemResults: getProblemResultsDataSource(dbAPI),
    users: usersDataSource
}
const context: Context = {dataSource, userAPI: {user: null}}

describe("tests Lesson.finalTest resolver", () => {

    const parent = {finalTestId: 1}
    const args = {id: 1}

    test("Получить тест из поля finalTest", async () => {
        const info = {fieldName: "finalTest"}
        const response = await resolvers.Lesson.finalTest(parent, {}, context, info)
        await expect(response?.id).toBe(1)
    })
    test("Получить тест из поля test по аргументам", async () => {
        const info = {fieldName: "test"}
        const response = await resolvers.Query.test({}, args, context, info)
        await expect(response?.id).toBe(1)
    })
    test("Получить тест из поля test по родителю", async () => {
        const info = {fieldName: "test"}
        const response = await resolvers.TestResult.test({testId: 1}, {}, context, info)
        await expect(response?.id).toBe(1)
        await expect(response?.title).toBe("Контрольная работа №1")
        await expect(response?.exercises).toHaveLength(3)
        await expect([1]).toEqual(expect.arrayContaining([response?.exercises[0].problemId]))
        await expect([4, 5, 2]).toEqual(expect.arrayContaining([response?.exercises[1].problemId]))
        await expect([6, 3]).toEqual(expect.arrayContaining([response?.exercises[2].problemId]))
        await expect(response?.exercises[0].withDetailedAnswer).toBe(false)
        await expect(response?.exercises[0].maxEstimate).toBe(10)
        await expect(response?.exercises[1].withDetailedAnswer).toBe(true)
        await expect(response?.exercises[1].maxEstimate).toBe(5)
        await expect(response?.exercises[2].withDetailedAnswer).toBe(false)
        await expect(response?.exercises[2].maxEstimate).toBe(50)
    })
    test("Получить исключение", async () => {
        const info = {fieldName: "test"}
        const args = {id: 0}
        expect.assertions(1)
        try {
            await resolvers.Lesson.finalTest({}, args, context, info)
        } catch (e) {
            expect(e.message).toBe("args.id или parent.testId должен принимать значение")
        }
    })
})

describe("tests TestResult.test resolver", () => {
    const {student} = testUsers

    test("Получить тест из поля test по родительскому полю testId", async () => {
        const parent = {testId: 1}
        const info = {fieldName: "test"}
        const response = await resolvers.TestResult.test(parent, {}, context, info)
        await expect(response?.title).toBe("Контрольная работа №1")
    })

    test("Получить тест из поля test по родительским полям userId и msTimeStamp", async () => {
        const parent = {userId: student.id, msTimeStamp: "1633089600123", testId: 1}
        const info = {fieldName: "test"}
        const result: Test = {
            id: 1,
            title: "Контрольная работа №1",
            msNotFinishedResultTimeStamp: "1633089600123",
            completedLength: 2,
            state: "NOT_FINISHED",
            exercises: [expect.objectContaining({
                problemId: 1,
                withDetailedAnswer: false,
                maxEstimate: 10
            }), expect.objectContaining({
                problemId: 2,
                withDetailedAnswer: true,
                maxEstimate: 5
            }), expect.objectContaining({
                problemId: 3,
                withDetailedAnswer: false,
                maxEstimate: 50
            })]
        }
        const response = await resolvers.TestResult.test(parent, {}, context, info)
        await expect(response).toEqual(result)
    })
})

describe("tests Query.test resolver", () => {

    const {student} = testUsers
    const query = gql`
        query Test($id: ID!) {
            test(id: $id) {
                id
                title
                msNotFinishedResultTimeStamp
                completedLength
                state
                exercises {
                    problemId
                    withDetailedAnswer
                }
            }
        }
    `

    test("Получить тест с непроверенным заданием", async () => {
        const variables: GetTestArgs = {id: 1}
        const result: TestResponse = {
            id: "1",
            title: "Контрольная работа №1",
            msNotFinishedResultTimeStamp: null,
            completedLength: 3,
            state: "NOT_CHECKED",
            exercises: [{
                problemId: "1",
                withDetailedAnswer: false
            }, {
                problemId: "4",
                withDetailedAnswer: true
            }, {
                problemId: "6",
                withDetailedAnswer: false
            }]
        }
        await expectQueryTest(variables, result)
    })

    test("Получить незаконченный тест", async () => {
        const variables: GetTestArgs = {id: 2}
        const result: TestResponse = {
            id: "2",
            title: "Контрольная работа №5",
            msNotFinishedResultTimeStamp: "1633262400123",
            completedLength: 1,
            state: "NOT_FINISHED",
            exercises: [{
                problemId: "113",
                withDetailedAnswer: false
            }, {
                problemId: "5",
                withDetailedAnswer: false
            }, {
                problemId: "4",
                withDetailedAnswer: false
            }]
        }
        await expectQueryTest(variables, result)
    })

    test("Получить новый тест ранее не выполняемый", async () => {
        const variables: GetTestArgs = {id: 3}
        const result: TestResponse = {
            id: "3",
            title: "Контрольная работа №2",
            msNotFinishedResultTimeStamp: null,
            completedLength: 0,
            state: "NEW",
            exercises: [{
                problemId: "1",
                withDetailedAnswer: false
            }, {
                problemId: "2",
                withDetailedAnswer: false
            }]
        }
        await expectQueryTest(variables, result)
    })

    test("Получить новый тест выполняемый ранее", async () => {
        const variables: GetTestArgs = {id: 5}
        const result: TestResponse = {
            id: "5",
            title: "Контрольная работа №4",
            msNotFinishedResultTimeStamp: null,
            completedLength: 0,
            state: "NEW",
            exercises: [{
                problemId: "7",
                withDetailedAnswer: true
            }]
        }
        await expectQueryTest(variables, result)
    })

    async function expectQueryTest(variables: GetTestArgs, result: TestResponse) {
        const server = await getTestServer({typeDefs, resolvers, dataSource}, student)
        const response = await server.executeOperation({query, variables})
        if (response.errors) console.error(response.errors)
        return expect(response.data?.test).toEqual(result)
    }
})