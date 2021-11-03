export type ProblemData = {
    id: number,
    commonDesc: string | null,
    desc: string,
    imageAlt: string | null,
    answer: string | null
}

export type Image = {
    src: string,
    alt: string
}

export default class Problem {

    _id: number
    _commonDesc: string | null
    _desc: string
    _imageAlt: string | null
    _answer: string | null

    constructor(data: ProblemData) {
        const {id, commonDesc, desc, imageAlt, answer} = data
        this._id = id
        this._commonDesc = commonDesc || null
        this._desc = desc
        this._imageAlt = imageAlt || null
        this._answer = answer || null
    }

    static create(data: ProblemData) {
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
        return this._imageAlt ? {src: `/images/problems/${this._id}`, alt: this._imageAlt} : null
    }

    get answer(): string | null {
        return this._answer
    }
}