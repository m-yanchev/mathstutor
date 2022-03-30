export interface IllusData {
    name: string | null
}

interface IllusOptions {
    problemId: number
    useCase: "problem" | "solution"
}

export class Illus {

    alt: string
    src: string

    constructor(data: IllusData, options: IllusOptions) {
        const alt = {
            "problem": "Иллюстрация к условию задания",
            "solution": "Иллюстрация к решению"
        }
        const folder  = {
            "problem": "problems",
            "solution": "solutions"
        }
        this.alt = alt[options.useCase]
        this.src = `/images/${folder[options.useCase]}/${data.name || options.problemId}`
    }

    static create(data: IllusData, options: IllusOptions): Illus | null {
        return data ? new Illus(data, options) : null
    }
}