export type ProblemResultData = {
    problem: ProblemData
    answer: string
}

export type ProblemData = {
    id: number
    commonDesc: string | null
    desc: string
    image: Image | null
    answer: string
}

type Image = {
    src: string
    alt: string
}

type TestResultData = {
    test: TestData
}

type TestData = {
    title: string
}

export class ProblemResults {

    _problems: Problem[]
    _results: Result[]

    constructor(data: ProblemResultData[]) {
        this._problems = data.map(item => Problem.create(item.problem))
        this._results = data.map(item => Result.create(item))
    }

    static create(data: ProblemResultData[] | void): ProblemResults | null {
        return data ? new ProblemResults(data) : null
    }

    get problems(): Problem[] {
        return this._problems
    }

    get results(): Result[] {
        return this._results
    }

    get length(): number {
        return this._problems.length
    }
}

class Problem {

    _id: number
    _commonDesc: string | null
    _desc: string
    _image: Image | null
    _answer: string

    constructor(data: ProblemData) {
        const {id, commonDesc, desc, image, answer} = data
        this._id = id
        this._commonDesc = commonDesc || null
        this._desc = desc
        this._image = image || null
        this._answer = answer
    }

    static create(data: ProblemData): Problem {
        return new Problem(data)
    }

    get id(): number {
        return this._id
    }

    get commonDesc(): string | null {
        return this._commonDesc
    }

    get desc(): string {
        return this._desc
    }

    get image(): Image | null {
        return this._image
    }

    get answer(): string {
        return this._answer
    }
}

class Result {

    _success: boolean
    _answer: string

    constructor(data: ProblemResultData) {
        const {problem, answer} = data
        this._answer = answer
        this._success = answer === problem.answer
    }

    static create(data: ProblemResultData): Result {
        return new Result(data)
    }

    get success(): boolean {
        return this._success
    }

    get answer(): string {
        return this._answer
    }
}

export class TestResult {

    _test: Test

    constructor(data: TestResultData) {
        const {test} = data
        this._test = Test.create(test)
    }

    static create(data: TestResultData | null): TestResult | null {
        return data ? new TestResult(data) : null
    }

    get test(): Test {
        return this._test
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