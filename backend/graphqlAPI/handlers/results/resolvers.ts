import type {
    Context,
    GetTestResultArgs,
    GetTestResultsArgs,
    TestParent,
    GetProblemResultsParent,
    TestResult,
    GetProblemResultsArgs,
    ProblemResult,
    Exercise,
    WriteArgs,
    UpdateArgs,
    UpdateResponse,
    WriteResponse
} from "./results";

type GetNewTestPercentageArgs = {
    problemResults: ProblemResult[],
    exercises: Exercise[],
    index: number,
    estimate: number
}

const getTestResult = async (
    parent: TestParent, args: GetTestResultArgs, context: Context
): Promise<TestResult | null> => {
    const {studentId, msTimeStamp} = args
    const {dataSource, userAPI} = context
    const {user} = userAPI
    const {results, users} = dataSource
    const {getAccess} = users
    const access = await getAccess(user)
    if (studentId) {
        if (access !== "tutor") return null
        return results.getTestResult({userId: studentId, msTimeStamp})
    } else {
        if (!user) return null
        return results.getTestResult({userId: user.id, msTimeStamp})
    }
}

const getTestResults = async (
    parent: TestParent, args: GetTestResultsArgs, context: Context
): Promise<TestResult[]> => {
    const {studentId} = args
    const {dataSource, userAPI} = context
    const {user} = userAPI
    const {results, users} = dataSource
    if (studentId) {
        const {getAccess} = users
        const access = await getAccess(user)
        if (access !== "tutor") return []
        return results.getTestResults({userId: studentId})
    } else {
        return user ? results.getTestResults({userId: user.id, testId: parent.id}) : []
    }
}

const getProblemResults = async (
    parent: GetProblemResultsParent | void, args: GetProblemResultsArgs, context: Context
): Promise<ProblemResult[]> => {
    const {dataSource, userAPI} = context
    const {user} = userAPI
    const {results} = dataSource
    const {getAccess} = dataSource.users
    const access = await getAccess(user)
    if (parent?.userId && parent.msTimeStamp) {
        return results.getProblemResults({userId: parent.userId, msTestResultTimeStamp: parent.msTimeStamp})
    } else if (args.msTestResultTimeStamp) {
        if (args.studentId) {
            if (access !== "tutor") return []
            return results.getProblemResults({
                userId: args.studentId, msTestResultTimeStamp: args.msTestResultTimeStamp
            })
        } else {
            if (!access) return []
            return user ?
                results.getProblemResults({userId: user.id, msTestResultTimeStamp: args.msTestResultTimeStamp}) :
                []
        }
    } else {
        return []
    }
}

const getNewTestPercentage = (args: GetNewTestPercentageArgs): number => {
    const {problemResults, exercises, index, estimate} = args
    const sum = problemResults.reduce((sum, result, i) =>
        sum + (i === index ? 0: (result.estimate || 0)),
        estimate
    )
    const maxSum = exercises.reduce((sum, exercise) => sum + exercise.maxEstimate, 0)
    return Math.round(sum / maxSum * 100)
}

const write = async (_, args: WriteArgs, context: Context): Promise<WriteResponse> => {
    const {dataSource, userAPI} = context
    const {user} = userAPI
    const {answer, msTestResultTimeStamp, testId, problemId, exerciseIndex} = args
    const {
        addProblemResult, addTestResult, updateTestResult, getTest, getProblem, getProblemResults
    } = dataSource.results
    if (!user) throw new Error("Доступ запрещён!")
    const problemResults = msTestResultTimeStamp ?
        await getProblemResults({msTestResultTimeStamp, userId: user.id}) : []
    const [test, problem] = await Promise.all([getTest(testId), getProblem(problemId)])
    const msCurTimeStamp = Date.now()
    const estimate = answer === problem.answer ? test.exercises[exerciseIndex].maxEstimate : 0
    const msTimeStamp = msTestResultTimeStamp || String(msCurTimeStamp)
    const problemResult: ProblemResult = {
        msTimeStamp: String(msCurTimeStamp),
        estimate: answer !== null ? estimate : null,
        userId: user.id,
        problemId: String(problemId),
        msTestResultTimeStamp: msTimeStamp,
        answer,
        exerciseIndex
    }
    await addProblemResult(problemResult)
    const testResult: TestResult = {
        msTimeStamp,
        userId: user.id,
        testId: String(testId),
        finishedTimeStamp: test.exercises.length === problemResults.length + 1 ? Math.floor(msCurTimeStamp/1000) : null,
        percentage: getNewTestPercentage({
            problemResults,
            exercises: test.exercises,
            index: exerciseIndex,
            estimate
        })
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

const update = async (_, args: UpdateArgs, context: Context): Promise<UpdateResponse> => {
    const {dataSource, userAPI} = context
    const {results, users} = dataSource
    const {user} = userAPI
    const {getAccess} = users
    if (await getAccess(user) !== "tutor") return {success: false}
    const {studentId, msProblemResultTimeStamp, estimate} = args
    const {
        getTest, updateProblemResult, updateTestResult, getProblemResults, getProblemResult, getTestResult
    } = results
    const problemResult = await getProblemResult({userId: studentId, msTimeStamp: msProblemResultTimeStamp})
    const problemResults = await getProblemResults({
        userId: studentId, msTestResultTimeStamp: problemResult.msTestResultTimeStamp
    })
    const testResult = await getTestResult({
        userId: studentId, msTimeStamp: problemResult.msTestResultTimeStamp
    })
    const test = await getTest(Number(testResult.testId))
    await updateProblemResult(
        {userId: studentId, msTimeStamp: msProblemResultTimeStamp},
        {estimate}
    )
    await updateTestResult(
        {userId: studentId, msTimeStamp: testResult.msTimeStamp},
        {percentage: getNewTestPercentage({
                problemResults, exercises: test.exercises, index: problemResult.exerciseIndex, estimate
        })}
    )
    return {success: true}
}

export const resolvers = {
    TestResult: {
        problemResults: getProblemResults
    },
    Test: {
        result: getTestResult,
        results: getTestResults
    },
    Query: {
        testResults: getTestResults,
        problemResults: getProblemResults,
        testResult: getTestResult
    },
    Mutation: {
        writeResult: write,
        updateResult: update
    }
}