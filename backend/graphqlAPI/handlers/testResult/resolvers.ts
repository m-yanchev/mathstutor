import type {UserAPI} from "apolloSubgraphHandler";

type Context = {
    dataSource: DataSource,
    userAPI: UserAPI
}
export type DataSource = {
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
export type GetProblemResults = (filter: GetProblemResultsFilter) => Promise<GetProblemResultData[]>
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
    userId: string
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
    testId: number
}
type GetProblemResultsFilter = {
    msTestResultTimeStamp: string,
    userId: string
}
type TestData = {
    exercisesLength: number
}
type GetProblemResultData = {
    percentage: number
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
type Parent = {
    id: number
}
type Problem = {
    answer: string
}

const results = async (parent: Parent, _, context: Context): Promise<TestResult[]> => {
    const {dataSource, userAPI} = context
    const {user} = userAPI
    const {getTestResults} = dataSource
    return user ? getTestResults({userId: user.id, testId: parent.id}) : []
}

const writeResult = async (_, args: WriteResultArgs, context: Context): Promise<WriteResultResponse> => {
    const {dataSource, userAPI} = context
    const {user} = userAPI
    const {answer, msTestResultTimeStamp, testId, problemId} = args
    const {addProblemResult, addTestResult, updateTestResult, getTest, getProblem, getProblemResults} = dataSource
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
        msTestResultTimeStamp: msTimeStamp
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
        results
    },
    Mutation: {
        writeResult
    }
}