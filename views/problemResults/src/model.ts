import {Problem as BaseProblem, ProblemData} from "../../common/rules/Problem";

interface UserData {
    access: Role | null
}

export type Role = "tutor" | "student"

type TestResultData = {
    msTimeStamp: string
    test: TestData
    problemResults: ProblemResultData[]
}

type ProblemResultData = {
    msTimeStamp: string
    estimate: number | null
    answer: string | null
}

type TestData = {
    title: string
    exercises: ExerciseData[]
}

type ExerciseData = {
    maxEstimate: number
    withDetailedAnswer: boolean
    problem: ProblemData
}

export class User {

    role: Role

    constructor(data: UserData) {
        this.role = data.access || "student"
    }

    static create(data: UserData | null): User | null {
        return data ? new User(data) : null
    }
}

export class TestResult {

    msTimeStamp: string
    test: Test
    problemResults: ProblemResult[]

    constructor(data: TestResultData) {
        const {test, problemResults, msTimeStamp} = data
        this.msTimeStamp = msTimeStamp
        this.test = Test.create(test)
        this.problemResults = problemResults.map(item => ProblemResult.create(item))
    }

    static create(data: TestResultData | null): TestResult | null {
        return data ? new TestResult(data) : null
    }

    get exercises(): Exercise[] {
        return this.test.exercises
    }

    get problems(): Problem[] {
        return this.test.exercises.map(item => item.problem)
    }

    isLastResult(index: number): boolean {
        return this.problemResults.length - 1 === index
    }

    getSuccess(index: number): boolean {
        return !this.test.exercises[index].withDetailedAnswer &&
            this.test.exercises[index].problem.answer === this.problemResults[index].answer
    }
}

class Test {

    title: string
    exercises: Exercise[]

    constructor(data: TestData) {
        const {title, exercises} = data
        this.title = title
        this.exercises = exercises.map(item => Exercise.create(item))
    }

    static create(data: TestData): Test {
        return new Test(data)
    }
}

class Exercise {

    maxEstimate: number
    withDetailedAnswer: boolean
    problem: Problem

    constructor(data: ExerciseData) {
        this.maxEstimate = data.maxEstimate
        this.withDetailedAnswer = data.withDetailedAnswer
        this.problem = Problem.create(data.problem)
    }

    static create(data: ExerciseData): Exercise {
        return new Exercise(data)
    }

    validate(estimate: number | null): boolean {
        return estimate !== null && estimate >=0 && estimate <= this.maxEstimate
    }
}

class Problem extends BaseProblem {

    constructor(data: ProblemData) {
        super(data);
    }

    static create(data: ProblemData): Problem {
        return new Problem(data)
    }
}

class ProblemResult {

    msTimeStamp: string
    estimate: number | null
    answer: string | null

    constructor(data: ProblemResultData) {
        this.msTimeStamp = data.msTimeStamp
        this.estimate = data.estimate
        this.answer = data.answer
    }

    static create(data: ProblemResultData): ProblemResult {
        return new ProblemResult(data)
    }

    get received(): boolean {
        return this.estimate !== null
    }
}