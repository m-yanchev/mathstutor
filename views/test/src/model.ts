import {Illus, IllusData} from "../../common/rules/Illus";

interface TestData {
    id: number
    title: string
    msNotFinishedResultTimeStamp
    completedLength: number
    exercises: ExerciseData[]
}

interface MutationResponseData {
    testResult: TestResultData
}

interface ExerciseData {
    problem: ProblemData
    withDetailedAnswer: boolean
}

interface ProblemData {
    id: number
    desc: string
    commonDesc: string | null
    illus: IllusData | null
}

interface TestResultData {
    msTimeStamp: string
}

export class Test {

    id: number
    title: string
    msNotFinishedResultTimeStamp: string | null
    completedLength: number
    exercises: Exercise[]

    constructor(data: TestData) {
        this.id = data.id
        this.title = data.title
        this.completedLength = data.completedLength
        this.msNotFinishedResultTimeStamp = data.msNotFinishedResultTimeStamp
        this.exercises = data.exercises.map(exercise => Exercise.create(exercise))
    }

    static create(data: TestData | null | void): Test | null {
        return data ? new Test(data) : null
    }

    isFinish(index: number): boolean {
        return this.exercises.length <= index
    }

    getExercise(index: number): Exercise | null {
        return index < this.exercises.length ? this.exercises[index] : null
    }
}

export class Exercise {

    problem: Problem
    withDetailedAnswer: boolean

    constructor(data: ExerciseData) {
        this.problem = Problem.create(data.problem)
        this.withDetailedAnswer = data.withDetailedAnswer
    }

    static create(data: ExerciseData): Exercise {
        return new Exercise(data)
    }
}

export class MutationResponse {

    testResult: TestResult

    constructor(data: MutationResponseData) {
        this.testResult = TestResult.create(data.testResult)
    }

    static create(data: MutationResponseData | null | void): MutationResponse | null {
        return data ? new MutationResponse(data) : null
    }
}

class Problem {

    id: number
    desc: string
    commonDesc: string | null
    illus: Illus | null

    constructor(data: ProblemData) {
        this.id = data.id
        this.desc = data.desc
        this.commonDesc = data.commonDesc || null
        this.illus = Illus.create(data.illus, {useCase: "problem", problemId: data.id})
    }

    static create(data: ProblemData): Problem {
        return new Problem(data)
    }
}

class TestResult {

    msTimeStamp: string

    constructor(data: TestResultData) {
        this.msTimeStamp = data.msTimeStamp
    }

    static create(data: TestResultData): TestResult {
        return new TestResult(data)
    }
}