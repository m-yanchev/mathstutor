import Lesson from "./Lesson";

export type CourseData = {
    title: string,
    lessonTitles: Array<string>
}

export default class Course {

    _title: string
    _lessons: Array<Lesson>

    constructor(data: CourseData) {
        this._title = data.title
        this._lessons = data.lessonTitles.map(title => Lesson.create({title}))
    }

    static create(data: CourseData): Course {
        return new Course(data)
    }

    get lessons(): Array<Lesson> {
        return this._lessons
    }
}