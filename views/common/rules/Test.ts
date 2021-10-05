import TestResult, {TestResultData} from "./TestResult";

export type TestData = {
    id: number,
    results: TestResultData[]
}

export default class Test {

    _id: number
    _results: TestResult[]

    constructor(data: TestData) {
        this._id = data.id
        this._results = data.results.map(result => TestResult.create(result))
    }

    static create(data: TestData | null) {
        return data ? new Test(data) : null
    }

    get results(): TestResult[] {
        return this._results
    }

    get id(): number {
        return this._id
    }
}