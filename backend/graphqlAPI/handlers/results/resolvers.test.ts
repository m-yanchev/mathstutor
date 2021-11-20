import {getDataSource, ProblemResultItem, TestResultItem} from "./dataSource";
import {dbAPI} from "../../libs/dynamoDBAPI";
import {
    Context,
    GetProblemResult,
    GetTestResult, Parent,
    ProblemResult,
    ProblemResultKey,
    resolvers, ResultsArgs,
    TestResult,
    TestResultKey, WriteResultArgs, WriteResultResponse
} from "./resolvers";
import {usersDataSource} from "../../libs/mongoUsersDataSource";
import {testUsers} from "./accessConsts";

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
            testId: Number(item.testId.N),
            percentage: Number(item.percentage.N)
        }
    }

    const getProblemResult: GetProblemResult = async key => {
        const {msTimeStamp, userId} = key
        const item: ProblemResultItem = await getItem("problemResults", {
            msTimeStamp: {S: msTimeStamp},
            userId: {S: userId}
        })
        return {
            msTimeStamp: item.msTimeStamp.S,
            userId: item.userId.S,
            percentage: Number(item.percentage.N),
            msTestResultTimeStamp: item.msTestResultTimeStamp.S,
            problemId: Number(item.problemId.N),
            answer: item.answer.S
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

    return {getTestResult, getProblemResult, deleteTestResult, deleteProblemResult}
}

const writeResultExpect = async (args, responseReference) => {

    const {studentForWrite} = testUsers
    const userId = studentForWrite.id
    const context = {
        dataSource: {results: getDataSource(dbAPI), users: usersDataSource},
        userAPI: {user: {id: userId, token: studentForWrite.token}}
    }
    const {getTestResult, getProblemResult} = getTestDataSource(dbAPI)

    const response: WriteResultResponse = await resolvers.Mutation.writeResult({}, args, context)
    await expect(response).toEqual(responseReference)
    await expect(response.problemResult.msTestResultTimeStamp).toBe(response.testResult.msTimeStamp)
    const testResult: TestResult = await getTestResult({msTimeStamp: response.testResult.msTimeStamp, userId})
    const problemResult: ProblemResult = await getProblemResult({
        msTimeStamp: response.problemResult.msTimeStamp, userId
    })
    await expect(testResult).toEqual(response.testResult)
    await expect(problemResult).toEqual(response.problemResult)

    return response
}

describe("results testResult resolver", () => {

    test("Получить результат", async () => {
        const {tutor, student} = testUsers
        const context: Context = {
            dataSource: {results: getDataSource(dbAPI), users: usersDataSource},
            userAPI: {user: tutor}
        }
        const args = {studentId: student.id, msTestResultTimeStamp: "1633176000456"}
        const result: TestResult = {
            percentage: 70,
            msTimeStamp: "1633176000456",
            testId: 1,
            userId: student.id,
            finishedTimeStamp: 1633178240
        }
        const response = await resolvers.Query.testResult({}, args, context)
        await expect(response).toEqual(result)
    })
})

describe("results testResults resolver", () => {

    test("Получить пустой список", async () => {
        const {student} = testUsers
        const args: ResultsArgs = {
            studentId: student.id
        }
        const context: Context = {
            dataSource: {results: getDataSource(dbAPI), users: usersDataSource},
            userAPI: {user: null}
        }
        const response = await resolvers.Query.testResults({}, args, context)
        await expect(response).toHaveLength(0)
    })

    test("Получить список результатов ученика из Query", async () => {
        const {tutor, student} = testUsers
        const context: Context = {
            dataSource: {results: getDataSource(dbAPI), users: usersDataSource},
            userAPI: {user: tutor}
        }
        const args: ResultsArgs = {
            studentId: student.id
        }
        const results: TestResult[] = [{
            percentage: 80,
            msTimeStamp: "1633089600123",
            testId: 1,
            userId: student.id,
            finishedTimeStamp: null
        }, {
            percentage: 80,
            msTimeStamp: "1633089600124",
            testId: 4,
            userId: student.id,
            finishedTimeStamp: null
        }, {
            percentage: 70,
            msTimeStamp: "1633176000456",
            testId: 1,
            userId: student.id,
            finishedTimeStamp: 1633178240
        }, {
            percentage: 70,
            msTimeStamp: "1633176000457",
            testId: 4,
            userId: student.id,
            finishedTimeStamp: 1633178240
        }, {
            percentage: 60,
            msTimeStamp: "1633262400123",
            testId: 2,
            userId: student.id,
            finishedTimeStamp: null
        }]
        const response = await resolvers.Query.testResults({}, args, context)
        await expect(response).toEqual(results)
    })

    test("Получить список из 2-х результатов", async () => {
        const {student} = testUsers
        const context: Context = {
            dataSource: {results: getDataSource(dbAPI), users: usersDataSource},
            userAPI: {user: student}
        }
        const parent: Parent = {id: 1}
        const result: TestResult[] = [{
            percentage: 80,
            msTimeStamp: "1633089600123",
            testId: 1,
            userId: student.id,
            finishedTimeStamp: null
        }, {
            percentage: 70,
            msTimeStamp: "1633176000456",
            testId: 1,
            userId: student.id,
            finishedTimeStamp: 1633178240
        }]
        const response = await resolvers.Test.results(parent, {}, context)
        await expect(response).toEqual(result)
    })
})

describe("results problemResults resolver", () => {

    test("Получить список результатов", async () => {
        const {student, tutor} = testUsers
        const context: Context = {
            dataSource: {results: getDataSource(dbAPI), users: usersDataSource},
            userAPI: {user: tutor}
        }
        const args = {studentId: student.id, msTestResultTimeStamp: "1633089600123"}
        const result: ProblemResult[] = [{
            "userId": "6148e012088bd4488dc3d6bf",
            "msTimeStamp": "1633089600123",
            "problemId": 1,
            "percentage": 100,
            "msTestResultTimeStamp": "1633089600123",
            "answer": "10"
        }, {
            "userId": "6148e012088bd4488dc3d6bf",
            "msTimeStamp": "1633089700123",
            "problemId": 2,
            "percentage": 0,
            "msTestResultTimeStamp": "1633089600123",
            "answer": "7"
        }]
        const response = await resolvers.Query.problemResults({}, args, context)
        await expect(response).toEqual(result)
    })

    test("Получить пустой список. Запросил не учитель", async () => {
        const {student} = testUsers
        const context: Context = {
            dataSource: {results: getDataSource(dbAPI), users: usersDataSource},
            userAPI: {user: student}
        }
        const args = {studentId: student.id, msTestResultTimeStamp: "1633089600123"}
        const response = await resolvers.Query.problemResults({}, args, context)
        await expect(response).toHaveLength(0)
    })

    test("Получить пустой список. Запросил не авторизированный пользователь", async () => {
        const {student} = testUsers
        const context: Context = {
            dataSource: {results: getDataSource(dbAPI), users: usersDataSource},
            userAPI: {user: null}
        }
        const args = {studentId: student.id, msTestResultTimeStamp: "1633089600123"}
        const response = await resolvers.Query.problemResults({}, args, context)
        await expect(response).toHaveLength(0)
    })
})

describe("results writeResult resolver", () => {

    test("Записать результаты теста", async () => {

        const userId = testUsers.studentForWrite.id
        const {deleteTestResult, deleteProblemResult} = getTestDataSource(dbAPI)
        const args: WriteResultArgs[] = []
        const writeResultResponseReferences: WriteResultResponse[] = []
        const writeResultResponses: WriteResultResponse[] = []

        args.push({
            testId: 1,
            msTestResultTimeStamp: null,
            answer: "10",
            problemId: 1
        })
        writeResultResponseReferences.push({
            testResult: {
                msTimeStamp: expect.any(String),
                userId,
                testId: 1,
                finishedTimeStamp: null,
                percentage: 33
            },
            problemResult: {
                msTimeStamp: expect.any(String),
                userId,
                percentage: 100,
                msTestResultTimeStamp: expect.any(String),
                problemId: 1,
                answer: "10"
            }
        })
        writeResultResponses.push(await writeResultExpect(args[0], writeResultResponseReferences[0]))

        args.push({
            testId: 1,
            msTestResultTimeStamp: writeResultResponses[0].testResult.msTimeStamp,
            answer: "7",
            problemId: 2
        })
        writeResultResponseReferences.push({
            testResult: {
                msTimeStamp: writeResultResponses[0].testResult.msTimeStamp,
                userId,
                testId: 1,
                finishedTimeStamp: null,
                percentage: 67
            },
            problemResult: {
                msTimeStamp: expect.any(String),
                userId,
                percentage: 100,
                msTestResultTimeStamp: writeResultResponses[0].testResult.msTimeStamp,
                problemId: 2,
                answer: "7"
            }
        })
        writeResultResponses.push(await writeResultExpect(args[1], writeResultResponseReferences[1]))

        args.push({
            testId: 1,
            msTestResultTimeStamp: writeResultResponses[0].testResult.msTimeStamp,
            answer: "12",
            problemId: 3
        })
        writeResultResponseReferences.push({
            testResult: {
                msTimeStamp: writeResultResponses[0].testResult.msTimeStamp,
                userId,
                testId: 1,
                finishedTimeStamp: expect.any(Number),
                percentage: 100
            },
            problemResult: {
                msTimeStamp: expect.any(String),
                userId,
                percentage: 100,
                msTestResultTimeStamp: writeResultResponses[0].testResult.msTimeStamp,
                problemId: 3,
                answer: "12"
            }
        })
        writeResultResponses.push(await writeResultExpect(args[2], writeResultResponseReferences[2]))

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