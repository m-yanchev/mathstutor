import {getDataSource} from "./dataSource";
import {dbAPI} from "../../libs/dynamoDBAPI";
import {
    Context, DataSource, GetProblemResultsArgs, GetProblemResultsParent,
    GetTestResult, GetTestResultArgs,
    GetTestResultsArgs,
    ProblemResult,
    ProblemResultKey, TestParent,
    TestResult,
    TestResultItem,
    TestResultKey, UpdateArgs, WriteArgs,
    WriteResponse
} from "./results";
import {usersDataSource} from "../../libs/mongoUsersDataSource";
import {testUsers} from "./accessConsts";
import {resolvers} from "./resolvers";
import {typeDefs} from "./schema";
import {gql} from "apollo-server";
import {getTestServer} from "../../libs/apolloSubgraphHandler";

const getTestDataSource = dbAPI => {

    const {getItem, deleteItem} = dbAPI

    const getTestResult: GetTestResult = async key => {
        const {msTimeStamp, userId} = key
        const item: TestResultItem = await getItem("testResults", {
            msTimeStamp: {S: msTimeStamp},
            userId: {S: userId}
        })
        return {
            msTimeStamp: item.msTimeStamp.S,
            userId: item.userId.S,
            finishedTimeStamp: item.finishedTimeStamp ? Number(item.finishedTimeStamp.N) : null,
            testId: item.testId.N,
            percentage: Number(item.percentage.N)
        }
    }

    const deleteTestResult = async (key: TestResultKey) => {
        const {msTimeStamp, userId} = key
        await deleteItem("testResults", {
            msTimeStamp: {S: msTimeStamp},
            userId: {S: userId}
        })
    }

    const deleteProblemResult = async (key: ProblemResultKey) => {
        const {msTimeStamp, userId} = key
        await getItem("problemResults", {
            msTimeStamp: {S: msTimeStamp},
            userId: {S: userId}
        })
    }

    return {getTestResult, deleteTestResult, deleteProblemResult}
}

const writeResultExpect = async (args: WriteArgs, responseReference: WriteResponse): Promise<WriteResponse> => {

    const query = gql`
        mutation WriteResult(
            $testId: ID!, $msTestResultTimeStamp: String, $answer: String, $problemId: ID!, $exerciseIndex: Int!
        ) {
            writeResult(
                testId: $testId,
                msTestResultTimeStamp: $msTestResultTimeStamp,
                answer: $answer,
                problemId: $problemId,
                exerciseIndex: $exerciseIndex
            ) {
                testResult {
                    msTimeStamp,
                    userId,
                    percentage
                    testId
                    finishedTimeStamp
                }
                problemResult {
                    estimate,
                    msTimeStamp,
                    userId,
                    problemId,
                    answer,
                    exerciseIndex,
                    msTestResultTimeStamp
                }
            }
        }
    `

    const {studentForMutate} = testUsers
    const userId = studentForMutate.id
    const dataSource: DataSource = {results: getDataSource(dbAPI), users: usersDataSource}
    const {getTestResult} = getTestDataSource(dbAPI)
    const {getProblemResult} = getDataSource(dbAPI)

    const server = await getTestServer({typeDefs, resolvers, dataSource}, studentForMutate)
    const response = await server.executeOperation({query, variables: args})
    if (response.errors) response.errors.forEach(error => console.error(error))
    const writeData = response.data?.writeResult
    await expect(writeData).toEqual(responseReference)
    await expect(writeData.problemResult.msTestResultTimeStamp).toBe(writeData.testResult.msTimeStamp)
    const testResult: TestResult = await getTestResult({msTimeStamp: writeData.testResult.msTimeStamp, userId})
    const problemResult: ProblemResult = await getProblemResult({
        msTimeStamp: writeData.problemResult.msTimeStamp, userId
    })
    await expect(testResult).toEqual(writeData.testResult)
    await expect(problemResult).toEqual(writeData.problemResult)

    return writeData
}

const updateResultExpect = async (args: UpdateArgs, responseReference: WriteResponse): Promise<void> => {
    const {tutor} = testUsers
    const {getTestResult} = getTestDataSource(dbAPI)
    const {getProblemResult} = getDataSource(dbAPI)
    const query = gql`
        mutation UpdateResult($studentId: ID!, $msProblemResultTimeStamp: String!, $estimate: Int!) {
            updateResult(
                estimate: $estimate, studentId: $studentId, msProblemResultTimeStamp: $msProblemResultTimeStamp
            ) {
                success
            }
        }
    `
    const dataSource: DataSource = {results: getDataSource(dbAPI), users: usersDataSource}
    const server = await getTestServer({typeDefs, resolvers, dataSource}, tutor)
    const response = await server.executeOperation({query, variables: args})
    if (response.errors) response.errors.forEach(error => console.error(error))
    const testResult: TestResult = await getTestResult({
        msTimeStamp: responseReference.testResult.msTimeStamp, userId: args.studentId
    })
    const problemResult: ProblemResult = await getProblemResult({
        msTimeStamp: responseReference.problemResult.msTimeStamp, userId: args.studentId
    })
    await expect(response.data?.updateResult.success).toBeTruthy()
    await expect(testResult).toEqual(responseReference.testResult)
    await expect(problemResult).toEqual(responseReference.problemResult)
}

describe("results TestResult.problemResults resolver", () => {

    const {student, tutor} = testUsers
    const context: Context = {
        dataSource: {results: getDataSource(dbAPI), users: usersDataSource},
        userAPI: {user: tutor}
    }

    test("Получить список результатов", async () => {

        const parent: GetProblemResultsParent = {userId: student.id, msTimeStamp: "1633089600123"}
        const result: ProblemResult[] = [{
            "userId": student.id,
            "msTimeStamp": "1633089600123",
            "problemId": "1",
            "estimate": 100,
            "msTestResultTimeStamp": "1633089600123",
            "answer": "10",
            exerciseIndex: 0
        }, {
            "userId": student.id,
            "msTimeStamp": "1633089700123",
            "problemId": "2",
            "estimate": null,
            "msTestResultTimeStamp": "1633089600123",
            "answer": "7",
            exerciseIndex: 1
        }]
        const response = await resolvers.TestResult.problemResults(parent, {}, context)
        await expect(response).toEqual(result)
    })
})

describe("results Test.results resolver", () => {

    const {student} = testUsers
    const context: Context = {
        dataSource: {results: getDataSource(dbAPI), users: usersDataSource},
        userAPI: {user: student}
    }

    test("Получить список результатов", async () => {
        const parent: TestParent = {id: 1}
        const result: TestResult[] = [{
            percentage: 80,
            msTimeStamp: "1633089600123",
            testId: "1",
            userId: student.id,
            finishedTimeStamp: null
        }, {
            percentage: 70,
            msTimeStamp: "1633176000456",
            testId: "1",
            userId: student.id,
            finishedTimeStamp: 1633178240
        }]
        const response = await resolvers.Test.results(parent, {}, context)
        await expect(response).toEqual(result)
    })
})

describe("results Query.testResults resolver", () => {

    const {tutor, student} = testUsers
    const query = gql`
        query TestResults($studentId: ID!) {
            testResults(studentId: $studentId) {
                percentage,
                msTimeStamp,
                testId,
                userId,
                finishedTimeStamp
            }
        }
    `
    const variables: GetTestResultsArgs = {studentId: student.id}
    const dataSource: DataSource = {results: getDataSource(dbAPI), users: usersDataSource}

    test("Получить пустой список, если пользователь не залогинен", async () => {
        const server = await getTestServer({typeDefs, resolvers, dataSource})
        const response = await server.executeOperation({query, variables})
        await expect(response.data?.testResults).toHaveLength(0)
    })

    test("Получить пустой список, если пользователь не авторизован как учитель", async () => {
        const server = await getTestServer({typeDefs, resolvers, dataSource}, student)
        const response = await server.executeOperation({query, variables})
        await expect(response.data?.testResults).toHaveLength(0)
    })

    test("Получить список результатов ученика", async () => {
        const server = await getTestServer({typeDefs, resolvers, dataSource}, tutor)
        const response = await server.executeOperation({query, variables})
        const result: TestResult[] = [{
            percentage: 80,
            msTimeStamp: "1633089600123",
            testId: "1",
            userId: student.id,
            finishedTimeStamp: null
        }, {
            percentage: 80,
            msTimeStamp: "1633089600124",
            testId: "4",
            userId: student.id,
            finishedTimeStamp: null
        }, {
            percentage: 70,
            msTimeStamp: "1633176000456",
            testId: "1",
            userId: student.id,
            finishedTimeStamp: 1633178240
        }, {
            percentage: 70,
            msTimeStamp: "1633176000457",
            testId: "4",
            userId: student.id,
            finishedTimeStamp: 1633178240
        }, {
            percentage: 70,
            msTimeStamp: "1633177000456",
            testId: "5",
            userId: student.id,
            finishedTimeStamp: 1633177240
        }, {
            percentage: 60,
            msTimeStamp: "1633262400123",
            testId: "2",
            userId: student.id,
            finishedTimeStamp: null
        }]
        await expect(response.data?.testResults).toEqual(result)
    })
})

describe("results Query.problemResults resolver", () => {

    const {tutor, student} = testUsers
    const query = gql`
        query ProblemResults($studentId: ID, $msTestResultTimeStamp: String!) {
            problemResults(studentId: $studentId, msTestResultTimeStamp: $msTestResultTimeStamp) {
                estimate,
                msTimeStamp,
                userId,
                problemId,
                answer,
                exerciseIndex,
                msTestResultTimeStamp
            }
        }
    `
    const result: ProblemResult[] = [{
        "userId": student.id,
        "msTimeStamp": "1633089600123",
        "problemId": "1",
        "estimate": 100,
        "msTestResultTimeStamp": "1633089600123",
        "answer": "10",
        exerciseIndex: 0
    }, {
        "userId": student.id,
        "msTimeStamp": "1633089700123",
        "problemId": "2",
        "estimate": null,
        "msTestResultTimeStamp": "1633089600123",
        "answer": "7",
        exerciseIndex: 1
    }]

    const dataSource: DataSource = {results: getDataSource(dbAPI), users: usersDataSource}

    test("Получить список результатов", async () => {
        const variables: GetProblemResultsArgs = {studentId: student.id, msTestResultTimeStamp: "1633089600123"}
        const server = await getTestServer({typeDefs, resolvers, dataSource}, tutor)
        const response = await server.executeOperation({query, variables})
        await expect(response.data?.problemResults).toEqual(result)
    })

    test("Получить пустой список, если пользователь не залогинен", async () => {
        const variables: GetProblemResultsArgs = {studentId: student.id, msTestResultTimeStamp: "1633089600123"}
        const server = await getTestServer({typeDefs, resolvers, dataSource})
        const response = await server.executeOperation({query, variables})
        await expect(response.data?.problemResults).toHaveLength(0)
    })

    test("Получить пустой список, если пользователь не авторизован как учитель", async () => {
        const variables: GetProblemResultsArgs = {studentId: student.id, msTestResultTimeStamp: "1633089600123"}
        const server = await getTestServer({typeDefs, resolvers, dataSource}, student)
        const response = await server.executeOperation({query, variables})
        await expect(response.data?.problemResults).toHaveLength(0)
    })

    test("Получить список результатов. Запросил ученик", async () => {
        const variables: GetProblemResultsArgs = {msTestResultTimeStamp: "1633089600123"}
        const server = await getTestServer({typeDefs, resolvers, dataSource}, student)
        const response = await server.executeOperation({query, variables})
        await expect(response.data?.problemResults).toEqual(result)
    })
})

describe("results Query.TestResult resolver", () => {

    const {tutor, student} = testUsers
    const query = gql`
        query TestResult($studentId: ID, $msTimeStamp: String!) {
            testResult(studentId: $studentId, msTimeStamp: $msTimeStamp) {
                msTimeStamp,
                userId,
                percentage
                testId
                finishedTimeStamp
            }
        }
    `
    const dataSource: DataSource = {results: getDataSource(dbAPI), users: usersDataSource}

    test("Получить результат", async () => {
        const variables: GetTestResultArgs = {studentId: student.id, msTimeStamp: "1633176000456"}
        const result: TestResult = {
            percentage: 70,
            msTimeStamp: "1633176000456",
            testId: "1",
            userId: student.id,
            finishedTimeStamp: 1633178240
        }
        const server = await getTestServer({typeDefs, resolvers, dataSource}, tutor)
        const response = await server.executeOperation({query, variables})
        await expect(response.data?.testResult).toEqual(result)
    })

    test("Получить null, если пользователь не залогинен", async () => {
        const variables: GetTestResultArgs = {studentId: student.id, msTimeStamp: "1633176000456"}
        const server = await getTestServer({typeDefs, resolvers, dataSource})
        const response = await server.executeOperation({query, variables})
        await expect(response.data).toBeNull()
    })

    test("Получить null, если пользователь не авторизован как учитель", async () => {
        const variables: GetTestResultArgs = {studentId: student.id, msTimeStamp: "1633176000456"}
        const server = await getTestServer({typeDefs, resolvers, dataSource}, student)
        const response = await server.executeOperation({query, variables})
        await expect(response.data).toBeNull()
    })

    test("Получить результат, если пользователь авторизован как ученик", async () => {
        const variables: GetTestResultArgs = {msTimeStamp: "1633176000456"}
        const result: TestResult = {
            percentage: 70,
            msTimeStamp: "1633176000456",
            testId: "1",
            userId: student.id,
            finishedTimeStamp: 1633178240
        }
        const server = await getTestServer({typeDefs, resolvers, dataSource}, student)
        const response = await server.executeOperation({query, variables})
        await expect(response.data?.testResult).toEqual(result)
    })
})

describe("results Mutate.writeResult Mutate.updateResult resolver", () => {

    const {studentForMutate} = testUsers
    const writeResultResponses: WriteResponse[] = []

    test("Записать и изменить результаты теста", async () => {

        const userId = studentForMutate.id
        const {deleteTestResult, deleteProblemResult} = getTestDataSource(dbAPI)
        const args: WriteArgs[] = []
        const writeResultResponseReferences: WriteResponse[] = []

        args.push({
            testId: 1,
            msTestResultTimeStamp: null,
            answer: "10",
            problemId: 1,
            exerciseIndex: 0
        })
        writeResultResponseReferences.push({
            testResult: {
                msTimeStamp: expect.any(String),
                userId,
                testId: "1",
                finishedTimeStamp: null,
                percentage: 15
            },
            problemResult: {
                msTimeStamp: expect.any(String),
                userId,
                estimate: 10,
                msTestResultTimeStamp: expect.any(String),
                problemId: "1",
                answer: "10",
                exerciseIndex: 0
            }
        })
        writeResultResponses.push(await writeResultExpect(args[0], writeResultResponseReferences[0]))

        args.push({
            testId: 1,
            msTestResultTimeStamp: writeResultResponses[0].testResult.msTimeStamp,
            answer: null,
            problemId: 2,
            exerciseIndex: 1
        })
        writeResultResponseReferences.push({
            testResult: {
                msTimeStamp: writeResultResponses[0].testResult.msTimeStamp,
                userId,
                testId: "1",
                finishedTimeStamp: null,
                percentage: 15
            },
            problemResult: {
                msTimeStamp: expect.any(String),
                userId,
                estimate: null,
                msTestResultTimeStamp: writeResultResponses[0].testResult.msTimeStamp,
                problemId: "2",
                answer: null,
                exerciseIndex: 1
            }
        })
        writeResultResponses.push(await writeResultExpect(args[1], writeResultResponseReferences[1]))

        args.push({
            testId: 1,
            msTestResultTimeStamp: writeResultResponses[0].testResult.msTimeStamp,
            answer: "12",
            problemId: 3,
            exerciseIndex: 2
        })
        writeResultResponseReferences.push({
            testResult: {
                msTimeStamp: writeResultResponses[0].testResult.msTimeStamp,
                userId,
                testId: "1",
                finishedTimeStamp: expect.any(Number),
                percentage: 92
            },
            problemResult: {
                msTimeStamp: expect.any(String),
                userId,
                estimate: 50,
                msTestResultTimeStamp: writeResultResponses[0].testResult.msTimeStamp,
                problemId: "3",
                answer: "12",
                exerciseIndex: 2
            }
        })
        writeResultResponses.push(await writeResultExpect(args[2], writeResultResponseReferences[2]))

        await updateResultExpect({
                studentId: userId,
                estimate: 3,
                msProblemResultTimeStamp: writeResultResponses[1].problemResult.msTimeStamp
            }, {
                testResult: {
                    msTimeStamp: writeResultResponses[0].testResult.msTimeStamp,
                    userId,
                    testId: "1",
                    finishedTimeStamp: writeResultResponses[2].testResult.finishedTimeStamp,
                    percentage: 97
                },
                problemResult: {
                    msTimeStamp: writeResultResponses[1].problemResult.msTimeStamp,
                    userId,
                    estimate: 3,
                    msTestResultTimeStamp: writeResultResponses[0].testResult.msTimeStamp,
                    problemId: "2",
                    answer: null,
                    exerciseIndex: 1
                }
            }
        )

        await Promise.all(writeResultResponses.map(response => deleteProblemResult({
            msTimeStamp: response.problemResult.msTimeStamp,
            userId
        })))
        await deleteTestResult({
            msTimeStamp: writeResultResponses[0].testResult.msTimeStamp,
            userId
        })
    })
})