import {
    Context,
    ExerciseData,
    GetTestArgs,
    GetTestParent,
    Info, ProblemId, ProblemResultData,
    TestData, TestId,
    TestFetchOptions, TestState, ProblemIdList
} from "./tests";

const getTest = async (parent: GetTestParent | void,
                       args: GetTestArgs,
                       context: Context,
                       info: Info): Promise<Test | null> => {
    const {dataSource} = context
    const {tests} = dataSource
    const id = getTestId(parent, args, info)
    const testData = id ? await tests.getItem({id}) : null
    return testData ? await getTestResponse(parent, args, context, testData) : null
}

const getTestId = (parent: GetTestParent | void, args: GetTestArgs, info: Info) => {
    const {fieldName} = info
    switch (fieldName) {
        case "finalTest":
            if (!parent?.finalTestId) return null
            return parent.finalTestId
        case "test":
            if (parent?.testId) return parent.testId
            if (args.id) return args.id
            throw new Error("args.id или parent.testId должен принимать значение")
    }
    throw new Error(`для fieldName=${fieldName} case не предусмотрен`)
}

async function getTestResponse(parent: GetTestParent | void,
                               args: GetTestArgs,
                               context: Context,
                               testData: TestData): Promise<Test> {
    const studentId = parent?.userId || context.userAPI.user?.id
    const test = new Test(testData)
    if (studentId) {
        await test.fetch({studentId, msTestResultTimeStamp: parent?.msTimeStamp, dataSource: context.dataSource})
    }
    return test
}

class Test {

    readonly id: TestId
    readonly title: string
    msNotFinishedResultTimeStamp: string | null
    readonly exercises: Exercise[]
    state: TestState
    completedLength: number

    constructor(data: TestData) {
        this.id = data.id
        this.title = data.title
        this.msNotFinishedResultTimeStamp = null
        this.exercises = data.exercises.map(exercise => new Exercise(exercise))
        this.state = "NEW"
        this.completedLength = 0
    }

    public async fetch(options: TestFetchOptions): Promise<void> {

        const {studentId, dataSource, msTestResultTimeStamp} = options

        const testResultData = await dataSource.testResults.getItem({
            testId: this.id, studentId, msTimeStamp: msTestResultTimeStamp
        })
        const problemResults: ProblemResultData[] = testResultData ?
            await dataSource.problemResults.getList({
                msTestResultTimeStamp: testResultData.msTimeStamp, studentId
            }) : []
        const byTestResult = Boolean(msTestResultTimeStamp)
        this.setState(problemResults, byTestResult)
        if (this.state === "NOT_FINISHED" && testResultData) {
            this.msNotFinishedResultTimeStamp = testResultData.msTimeStamp
        }
        this.setCompletedLength(problemResults, byTestResult)

        await Promise.all(this.exercises.map((exercise, i) => {
            if (i < this.completedLength) {
                const problemResult = problemResults.find(result => result.exerciseIndex === i)
                if (problemResult) {
                    exercise.problemId = problemResult.problemId
                }
            } else {
                return exercise.fetch(options)
            }
        }))
    }

    private setState(problemResults: ProblemResultData[], byTestResult: boolean) {
        if (problemResults.length > 0 && problemResults.length < this.length) this.state = "NOT_FINISHED"
        else if (problemResults.find(result => result.estimate === null)) this.state = "NOT_CHECKED"
        else if (byTestResult) this.state = "CHECKED"
        else this.state = "NEW"
    }

    private setCompletedLength(problemResults: ProblemResultData[], byTestResult: boolean) {
        if (problemResults.length < this.length) this.completedLength = problemResults.length
        else if (problemResults.find(result => result.estimate === null) || byTestResult) {
            this.completedLength = this.length
        }
        else this.completedLength = 0
    }

    private get length(): number {
        return this.exercises.length
    }
}

class Exercise {

    readonly withDetailedAnswer: boolean
    readonly maxEstimate: number
    problemId: ProblemId
    private readonly problemIdList: ProblemIdList

    constructor(data: ExerciseData) {
        this.withDetailedAnswer = data.withDetailedAnswer
        this.maxEstimate = data.maxEstimate
        this.problemId = data.problemIdList[Math.floor(Math.random() * data.problemIdList.length)]
        this.problemIdList = data.problemIdList
    }

    public async fetch(options: TestFetchOptions): Promise<void> {

        const {studentId, dataSource} = options

        const problemResults: (ProblemResultData | null)[] = await Promise.all(this.problemIdList.map(problemId =>
            dataSource.problemResults.getItem({studentId, problemId})
        ))

        const index = problemResults.findIndex(result => result === null)

        if (index > -1) {
            this.problemId = this.problemIdList[index]
            return
        }

        problemResults.sort((result1, result2) => {
            if (!result1 || !result2) throw new RangeError("Ожидалось, что переменная отлична от null")
            if (result1?.msTimeStamp < result2?.msTimeStamp) return -1
            else if (result1.msTimeStamp === result2.msTimeStamp) return 0
            else return 1
        })

        if (!problemResults[0]) throw  new RangeError("Ожидалось, что переменная отлична от null")
        this.problemId = problemResults[0].problemId
    }
}

export const resolvers = {
    Lesson: {
        finalTest: getTest
    },
    TestResult: {
        test: getTest
    },
    Query: {
        test: getTest
    }
}