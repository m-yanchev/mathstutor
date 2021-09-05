export type LessonData = {
    title: string
}

export default class Lesson {

    _title: string

    constructor(data: LessonData) {
        this._title = data.title
    }

    static create(data: LessonData): Lesson {
        return new Lesson(data)
    }

    get title(): string {
        return this._title
    }
}