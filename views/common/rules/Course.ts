import Lesson from "./Lesson";
import type {LessonData} from "./Lesson";

export type CourseData = {
    title: string,
    lessons: Array<LessonData>
}

export default class Course {

    _title: string
    _lessons: Array<Lesson>

    constructor(data: CourseData) {
        this._title = data.title
        this._lessons = data.lessons.map(lesson => Lesson.create(lesson))
    }

    static create(data: CourseData): Course {
        return new Course(data)
    }

    get lessons(): Array<Lesson> {
        return this._lessons
    }
}