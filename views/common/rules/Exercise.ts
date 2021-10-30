import Problem, {ProblemData} from "./Problem";

export type ExerciseData = {
    problem: ProblemData
}

export default class Exercise {

    _problem: Problem

    constructor(data: ExerciseData) {
        const {problem} = data
        this._problem = Problem.create(problem)
    }

    static create(data: ExerciseData) {
        return new Exercise(data)
    }

    get problem(): Problem {
        return this._problem
    }
}