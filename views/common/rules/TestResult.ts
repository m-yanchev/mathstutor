import TimeDate from "./TimeDate";

const PERCENT_LIMIT = 70

export type TestResultData = {
    msTimeStamp: string,
    percentage: number
}
type ResultStatus = "зачтено" | "не зачтено"


export default class TestResult {

    _date: TimeDate
    _percent: number

    constructor(data: TestResultData) {
        this._date = TimeDate.create(Number(data.msTimeStamp))
        this._percent = data.percentage
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