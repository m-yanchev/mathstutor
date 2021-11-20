import type {UserAPI} from "apolloSubgraphHandler";
import {UsersDataSource} from "User";

export type Context = {
    dataSource: DataSource,
    userAPI: UserAPI
}
type DataSource = {
    results: TestResultsDataSource,
    users: UsersDataSource
}
export type TestResultsDataSource = {
    getTestResult: GetTestResult,
    getTestResults: GetTestResults,
    addProblemResult: AddProblemResult,
    addTestResult: AddTestResult,
    updateTestResult: UpdateTestResult,
    getTest: GetTest,
    getProblem: GetProblem,
    getProblemResults: GetProblemResults
}
export type GetTestResults = (filter: TestResultsFilter) => Promise<TestResult[]>
export type AddProblemResult = (data: ProblemResult) => Promise<void>
export type AddTestResult = (data: TestResult) => Promise<void>
export type UpdateTestResult = (filter: TestResultKey, data: UpdateTestResultData) => Promise<void>
export type GetTest = (id: number) => Promise<TestData>
export type GetProblem = (id: number) => Promise<Problem>
export type GetProblemResults = (filter: GetProblemResultsFilter) => Promise<ProblemResult[]>
export type GetTestResult = (key: TestResultKey) => Promise<TestResult>
export type GetProblemResult = (key: ProblemResultKey) => Promise<ProblemResult>
export type TestResult = {
    msTimeStamp: string,
    userId: string,
    testId: number,
    finishedTimeStamp: number | null
    percentage: number
}
export type ProblemResult = {
    percentage: number,
    msTimeStamp: string,
    msTestResultTimeStamp: string,
    problemId: number,
    userId: string,
    answer: string
}
export type TestResultKey = {
    msTimeStamp: string,
    userId: string
}
export type ProblemResultKey = {
    msTimeStamp: string,
    userId: string
}
type TestResultsFilter = {
    userId: string,
    testId?: number
}
type GetProblemResultsFilter = {
    msTestResultTimeStamp: string,
    userId: string
}
type TestData = {
    exercisesLength: number
}
type UpdateTestResultData = {
    finishedTimeStamp: number | null,
    percentage: number
}
export type WriteResultResponse = {
    testResult: TestResult,
    problemResult: ProblemResult
}
export type WriteResultArgs = {
    answer: string,
    testId: number,
    msTestResultTimeStamp: string | null,
    problemId: number
}
export type Parent = {
    id?: number
}
type Problem = {
    answer: string
}
export type TestResultArgs = {
    studentId: string,
    msTestResultTimeStamp: string
}
export type ResultsArgs = {
    studentId?: string
}
type ProblemResultsArgs = {
    studentId: string,
    msTestResultTimeStamp: string
}

const testResult = async (_, args: TestResultArgs, context: Context): Promise<TestResult | null> => {
    const {studentId, msTestResultTimeStamp} = args
    const {dataSource, userAPI} = context
    const {user} = userAPI
    const {results, users} = dataSource
    const {getTestResult} = results
    const {getAccess} = users
    const access = await getAccess(user)
    if (access !== "tutor") return null
    return getTestResult({userId: studentId, msTimeStamp: msTestResultTimeStamp})
}

const testResults = async (parent: Parent, args: ResultsArgs | void, context: Context): Promise<TestResult[]> => {
    const {studentId} = args || {}
    const {dataSource, userAPI} = context
    const {user} = userAPI
    const {getTestResults} = dataSource.results
    const {getAccess} = dataSource.users
    const access = await getAccess(user)
    if (studentId) {
        if (access !== "tutor") return []
        return getTestResults({userId: studentId})
    } else {
        if (!access) return []
        return user ? getTestResults({userId: user.id, testId: parent.id}) : []
    }

}

const problemResults = async (_, args: ProblemResultsArgs, context: Context): Promise<ProblemResult[]> => {
    const {dataSource, userAPI} = context
    const {user} = userAPI
    const {studentId, msTestResultTimeStamp} = args
    const {getProblemResults} = dataSource.results
    const {getAccess} = dataSource.users
    const access = await getAccess(user)
    if (access !== "tutor") return []
    return getProblemResults({userId: studentId, msTestResultTimeStamp})
}

const writeResult = async (_, args: WriteResultArgs, context: Context): Promise<WriteResultResponse> => {
    const {dataSource, userAPI} = context
    const {user} = userAPI
    const {answer, msTestResultTimeStamp, testId, problemId} = args
    const {
        addProblemResult, addTestResult, updateTestResult, getTest, getProblem, getProblemResults
    } = dataSource.results
    if (!user) throw new Error("Доступ запрещён!")
    const problemResults = msTestResultTimeStamp ?
        await getProblemResults({msTestResultTimeStamp, userId: user.id}) : []
    const prevProblemPercentSum = problemResults.reduce((sum, result) =>
        result.percentage + sum,
        0
    )
    const [test, problem] = await Promise.all([getTest(testId), getProblem(problemId)])
    const msCurTimeStamp = Date.now()
    const percentage = answer === problem.answer ? 100 : 0
    const msTimeStamp = msTestResultTimeStamp || String(msCurTimeStamp)
    const problemResult: ProblemResult = {
        msTimeStamp: String(msCurTimeStamp),
        percentage,
        userId: user.id,
        problemId,
        msTestResultTimeStamp: msTimeStamp,
        answer
    }
    await addProblemResult(problemResult)
    const testResult: TestResult = {
        msTimeStamp,
        userId: user.id,
        testId,
        finishedTimeStamp: test.exercisesLength === problemResults.length + 1 ? Math.floor(msCurTimeStamp/1000) : null,
        percentage: Math.round((prevProblemPercentSum + percentage) / test.exercisesLength)
    }
    if (msTestResultTimeStamp) {
        await updateTestResult(
            {msTimeStamp, userId: user.id},
            {finishedTimeStamp: testResult.finishedTimeStamp, percentage: testResult.percentage})
    } else {
        await addTestResult(testResult)
    }
    return {
        testResult,
        problemResult
    }
}

export const resolvers = {
    Test: {
        results: testResults
    },
    Mutation: {
        writeResult
    },
    Query: {
        testResults,
        problemResults,
        testResult
    }
}