import Test, {TestData} from "./Test";

export type LessonData = {
    id: number,
    title: string,
    finalTest: TestData | null
}

export default class Lesson {

    _id: number
    _title: string
    _finalTest: Test | null

    constructor(data: LessonData) {
        this._id = data.id
        this._title = data.title
        this._finalTest = Test.create(data.finalTest)
    }

    static create(data: LessonData): Lesson {
        return new Lesson(data)
    }

    get id(): number {
        return this._id
    }

    get title(): string {
        return this._title
    }

    get finalTest(): Test | null {
        return this._finalTest
    }
}