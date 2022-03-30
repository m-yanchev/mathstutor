import type {
    AddProblemResult, AddTestResult, GetTestResult, GetTestResults, GetProblem, GetProblemResults, GetTest,
    UpdateTestResult, GetProblemResult, UpdateProblemResult, GetDataSource, TestResultItem, ProblemResultItem
} from "./results";

export const getDataSource: GetDataSource = (dbAPI) => {

    const {getItems, getItem, putItem, updateItem} = dbAPI

    const getTestResult: GetTestResult = async key => {
        const {userId, msTimeStamp} = key
        const item = await getItem("testResults", {userId: {S: userId}, msTimeStamp: {S: msTimeStamp}})
        if (!item) throw new Error("Ожидается наличие msTimeStamp или testId")
        return {
            userId,
            msTimeStamp: item.msTimeStamp.S,
            testId: item.testId.N,
            percentage: Number(item.percentage.N),
            finishedTimeStamp: item.finishedTimeStamp ? Number(item.finishedTimeStamp.N) : null
        }
    }

    const getTestResults: GetTestResults = async filter => {
        const {userId, testId} = filter
        const items: TestResultItem[] = await getItems("testResults", {
            expression: testId ? "testId = :testId and userId = :userId" : "userId = :userId",
            values: testId ? {":testId": {N: String(testId)}, ":userId": {S: userId}} : {":userId": {S: userId}}
        })
        return items.map(item => ({
            userId: userId,
            testId: item.testId.N,
            percentage: Number(item.percentage.N),
            msTimeStamp: item.msTimeStamp.S,
            finishedTimeStamp: item.finishedTimeStamp ? Number(item.finishedTimeStamp.N) : null
        }))
    }

    const addProblemResult: AddProblemResult = async data => {
        const {msTimeStamp, userId, estimate, msTestResultTimeStamp, problemId, answer, exerciseIndex} = data
        const item: ProblemResultItem = {
            msTimeStamp: {S: msTimeStamp},
            userId: {S: userId},
            msTestResultTimeStamp: {S: msTestResultTimeStamp},
            problemId: {N: String(problemId)},
            exerciseIndex: {N: String(exerciseIndex)}
        }
        if (answer !== null) item.answer = {S: answer}
        if (estimate !== null) item.estimate = {N: String(estimate)}
        await putItem("problemResults", item)
    }

    const getProblem: GetProblem = async id => {
        const {answer} = await getItem("problems", {id: {N: String(id)}})
        return {
            answer: answer ? answer.S : null
        }
    }

    const addTestResult: AddTestResult = async data => {
        const {msTimeStamp, userId, testId, finishedTimeStamp, percentage} = data
        const testResultItem: TestResultItem = {
            msTimeStamp: {S: msTimeStamp},
            userId: {S: userId},
            testId: {N: String(testId)},
            percentage: {N: String(percentage)}
        }
        if (finishedTimeStamp) testResultItem.finishedTimeStamp = {N: String(finishedTimeStamp)}
        await putItem("testResults", testResultItem)
    }

    const updateTestResult: UpdateTestResult = async (filter, data) => {
        const {msTimeStamp, userId} = filter
        const {finishedTimeStamp, percentage} = data
        const expression = `SET ${
            finishedTimeStamp ? "finishedTimeStamp = :finishedTimeStamp, " : ""
        }percentage = :percentage`
        const values = finishedTimeStamp ? {
                ":finishedTimeStamp": {N: String(finishedTimeStamp)},
                ":percentage": {N: String(percentage)}
            } : {
            ":percentage": {N: String(percentage)}
        }
        await updateItem(
            "testResults",
            {msTimeStamp: {S: msTimeStamp}, userId: {S: userId}},
            {expression, values}
        )
    }

    const updateProblemResult: UpdateProblemResult = async (filter, data) => {
        const {msTimeStamp, userId} = filter
        const {estimate} = data
        const expression = `SET estimate = :estimate`
        const values = {":estimate": {N: String(estimate)}}
        await updateItem(
            "problemResults",
            {msTimeStamp: {S: msTimeStamp}, userId: {S: userId}},
            {expression, values}
        )
    }

    const getTest: GetTest = async id => {
        const {exercises} = await getItem("tests", {id: {N: String(id)}})
        return {
            exercises: exercises.L.map(exercise => ({maxEstimate: Number(exercise.M.maxEstimate.N)}))
        }
    }

    const getProblemResults: GetProblemResults = async filter => {
        const {userId, msTestResultTimeStamp} = filter
        const items: ProblemResultItem[] = await getItems("problemResults", {
            expression: "msTestResultTimeStamp = :msTestResultTimeStamp and userId = :userId",
            values: {":msTestResultTimeStamp": {S: msTestResultTimeStamp}, ":userId": {S: userId}}
        })
        return items.map(item => ProblemResult.create(item))
    }

    const getProblemResult: GetProblemResult = async key => {
        const {msTimeStamp, userId} = key
        const item: ProblemResultItem = await getItem("problemResults", {
            msTimeStamp: {S: msTimeStamp},
            userId: {S: userId}
        })
        return ProblemResult.create(item)
    }

    return {
        getTestResult, getTestResults, addProblemResult, getProblem, addTestResult, updateTestResult,
        updateProblemResult, getTest, getProblemResults, getProblemResult
    }
}

class ProblemResult {

    userId: string
    msTestResultTimeStamp: string
    msTimeStamp: string
    problemId: string
    estimate: number | null
    answer: string | null
    exerciseIndex: number

    constructor(item: ProblemResultItem) {
        this.userId = item.userId.S
        this.msTestResultTimeStamp = item.msTestResultTimeStamp.S
        this.msTimeStamp = item.msTimeStamp.S
        this.problemId = item.problemId.N
        this.estimate = item.estimate ? Number(item.estimate.N) : null
        this.answer = item.answer?.S || null
        this.exerciseIndex = Number(item.exerciseIndex.N)
    }

    static create(item: ProblemResultItem): ProblemResult {
        return new ProblemResult(item)
    }
}