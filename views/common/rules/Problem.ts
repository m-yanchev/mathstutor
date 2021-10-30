export type ProblemData = {
    id: number,
    desc: string,
    answer: string | null
}

export default class Problem {

    _id: number
    _desc: string
    _answer: string | null

    constructor(data: ProblemData) {
        const {id, desc, answer} = data
        this._id = id
        this._desc = desc
        this._answer = answer || null
    }

    static create(data: ProblemData) {
        return new Problem(data)
    }

    get id(): number {
        return this._id
    }

    get desc(): string {
        return this._desc
    }

    get answer(): string | null {
        return this._answer
    }
}