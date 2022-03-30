import TimeDate from "../../common/rules/TimeDate";

type TestResultData = {
    msTimeStamp: string
    finishedTimeStamp: number | null
    percentage: number
    test: TestData
}

type TestData = {
    title: string
}

type StudentData = {
    name: string,
    email: string
}

export class TestResult {

    _date: TimeDate
    _percent: number
    _test: Test
    readonly finished: boolean

    constructor(data: TestResultData) {
        const {test, msTimeStamp, percentage} = data
        this._date = TimeDate.create(Number(msTimeStamp))
        this._percent = percentage
        this._test = Test.create(test)
        this.finished = Boolean(data.finishedTimeStamp)
    }

    static createList(list: TestResultData[] | null): TestResult[] | null {
        return list ? list.map(item => new TestResult(item)) : null
    }

    get test(): Test {
        return this._test
    }

    get id(): string {
        return String(this._date.timeStamp)
    }

    get date(): string {
        return this._date.format("day.month")
    }

    get time(): string {
        return this._date.format("hour:minute")
    }

    get percent(): number {
        return this._percent
    }
}

class Test {

    _title: string

    constructor(data: TestData) {
        const {title} = data
        this._title = title
    }

    static create(data: TestData): Test {
        return new Test(data)
    }

    get title(): string {
        return this._title
    }
}

export class Student {

    _name: string
    _email: string

    constructor(data: StudentData) {
        const {name, email} = data
        this._name = name
        this._email = email
    }

    static create(data: StudentData | null): Student | null {
        return data ? new Student(data) : null
    }

    get name(): string {
        return this._name
    }

    get email(): string {
        return this._email
    }
}