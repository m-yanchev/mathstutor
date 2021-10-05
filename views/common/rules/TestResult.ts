import TimeDate from "./TimeDate";

const PERCENT_LIMIT = 70

export type TestResultData = {
    timeStamp: number,
    percent: number
}
type ResultStatus = "зачтено" | "не зачтено"


export default class TestResult {

    _date: TimeDate
    _percent: number

    constructor(data: TestResultData) {
        this._date = TimeDate.createBySec(data.timeStamp)
        this._percent = data.percent
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