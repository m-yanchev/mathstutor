import TestResult, {TestResultData} from "./TestResult";
import Exercise, {ExerciseData} from "./Exercise";

export type TestData = {
    id: number,
    exercises?: ExerciseData[]
    results?: TestResultData[]
}

export default class Test {

    _id: number
    _results: TestResult[] | null
    _exercises: Exercise[] | null

    constructor(data: TestData) {
        const {id, exercises, results} = data
        this._id = id
        this._results = results ? results.map(result => TestResult.create(result)) : null
        this._exercises = exercises ? exercises.map(exercise => Exercise.create(exercise)) : null
    }

    static create(data: TestData | null) {
        return data ? new Test(data) : null
    }

    get id(): number {
        return this._id
    }

    get exercises(): Exercise[] | null {
        return this._exercises
    }

    get results(): TestResult[] | null {
        return this._results
    }
}