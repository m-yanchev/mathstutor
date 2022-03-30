import TimeDate from "../../common/rules/TimeDate";

export type UserId = string

export type LessonData = {
    id: number
    title: string
    isExamples: boolean
    finalTest: TestData | null
}

export class Lesson {

    _id: number
    _title: string
    _finalTest: Test | null
    _isExamples: boolean

    constructor(data: LessonData) {
        this._id = data.id
        this._title = data.title
        this._finalTest = Test.create(data.finalTest)
        this._isExamples = data.isExamples
    }

    static create(data: LessonData): Lesson {
        return new Lesson(data)
    }

    get id(): number {
        return this._id
    }

    get title(): string {
        return this._title
    }

    get isExamples(): boolean {
        return this._isExamples
    }

    get finalTest(): Test | null {
        return this._finalTest
    }
}

export type TestData = {
    id: number,
    title: string,
    state: TestState
    results: TestResultData[]
}

type TestState = "NEW" | "NOT_CHECKED" | "NOT_FINISHED"

export class Test {

    id: number
    title: string
    state: TestState
    results: TestResult[]

    constructor(data: TestData) {
        const {id, results, title, state} = data
        this.id = id
        this.title = title
        this.state = state
        this.results = results.map(result => TestResult.create(result))
    }

    static create(data: TestData | null) {
        return data ? new Test(data) : null
    }
}

type TestResultData = {
    msTimeStamp: string
    percentage: number
    finishedTimeStamp: number | null
}

type ResultStatus = "зачтено" | "не зачтено"
const PERCENT_LIMIT = 70

export class TestResult {

    _date: TimeDate
    _percent: number
    readonly finished: boolean

    constructor(data: TestResultData) {
        this._date = TimeDate.create(Number(data.msTimeStamp))
        this._percent = data.percentage
        this.finished = Boolean(data.finishedTimeStamp)
    }

    static create(data: TestResultData) {
        return new TestResult(data)
    }

    get date(): TimeDate {
        return this._date
    }

    get percent(): number {
        return this._percent
    }

    get status(): ResultStatus {
        return this._percent < PERCENT_LIMIT ? "не зачтено" : "зачтено"
    }
}