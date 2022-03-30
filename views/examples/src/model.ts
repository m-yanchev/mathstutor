import {IllusData} from "../../common/rules/Illus";
import {SolutionData} from "../../common/rules/Solution";
import {Problem} from "../../common/rules/Problem";

interface LessonData {
    title: string
    examples: ExampleData[]
}

interface ExampleData {
    id: number
    commonDesc: string | null
    desc: string
    illus: IllusData | null
    solution: SolutionData | null
    answer: string | null
}

export class Lesson {

    title: string
    examples: Example[]

    constructor(data: LessonData) {
        this.title = data.title
        this.examples = Example.createList(data.examples)
    }

    static create(data: LessonData | null): Lesson | null {
        return data ? new Lesson(data) : null
    }
}

export class Example extends Problem {

    constructor(data: ExampleData) {
        super(data)
    }

    static createList(list: ExampleData[]): Example[] {
        return list.map(item => new Example(item))
    }
}