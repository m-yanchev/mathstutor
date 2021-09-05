import Course from "./Course";
import type {CourseData} from "./Course";
import TimeDate, {FormatType} from "./TimeDate";
import Lesson from "./Lesson";

export type AppointmentData = {
    startTimeStamp: number,
    weekDays: Array<WeekDay>,
    course: CourseData
}

type WeekDay = {
    number: number,
    hour: number,
    minute: number,
    duration: number | null
}

export default class Appointment {

    _durations: Array<number>
    _dates: Array<TimeDate>
    _course: Course

    constructor(data: AppointmentData) {
        const sortedWeekDays = data.weekDays.sort((a, b) =>
            (a.number < b.number ||
                a.number === b.number && (a.hour < b.hour || a.hour === b.hour && a.minute < b.minute)) ? -1 : 1
        )
        const startDate = TimeDate.createBySec(data.startTimeStamp)
        const firstWeekDates: Array<TimeDate> = sortedWeekDays.map(weekDay =>
            startDate.offsetFromBeginning(
                "week",
                {day: weekDay.number, hour: weekDay.hour, minute: weekDay.minute}
            )
        )
        const startWeekDayIndex = firstWeekDates.findIndex(date => !date.earlierThan(startDate))
        this._course = Course.create(data.course)
        const getWeekDayIndex = lessonIndex => (startWeekDayIndex + lessonIndex) % sortedWeekDays.length
        this._dates = Array(this._course.lessons.length)
        for (let i = 0; i < this._dates.length; i++) {
            const weekIndex: number = Math.floor((startWeekDayIndex + i) / sortedWeekDays.length)
            const weekDayIndex: number = getWeekDayIndex(i)
            this._dates[i] = firstWeekDates[weekDayIndex].offset({week: weekIndex})
        }
        this._durations = Array(sortedWeekDays.length)
        for (let i = 0; i < sortedWeekDays.length; i++) {
            this._durations[i] = sortedWeekDays[getWeekDayIndex(i)].duration || 60
        }
    }

    static create(data: AppointmentData | null): Appointment | null {
        return data ? new Appointment(data) : null
    }

    lessonDuration(index: number): number {
        return this._durations[index % this._durations.length]
    }

    endLessonDate(index: number): TimeDate {
        return this._dates[index].offset({minute: this.lessonDuration(index)})
    }

    finishedLesson(nowDate: TimeDate, index: number): boolean {
        return !nowDate.earlierThan(this.endLessonDate(index))
    }

    nextLessonIndex(nowDate: TimeDate): number {
        return this._dates.findIndex(date => !date.earlierThan(nowDate))
    }

    startedLessonIndex(nowDate: TimeDate): number {
        const nextIndex = this.nextLessonIndex(nowDate)
        return nextIndex === -1 ? this._course.lessons.length - 1 : nextIndex - 1
    }

    finishedLessonIndex(nowDate: TimeDate): number {
        const nextIndex = this._dates.findIndex((date, i) =>
            !date.offset({minute: this.lessonDuration(i)}).earlierThan(nowDate)
        )
        return nextIndex === -1 ? this._course.lessons.length - 1 : nextIndex - 1
    }

    prevLesson(nowDate: TimeDate): Lesson | null {
        const index = this.finishedLessonIndex(nowDate)
        return index > -1 ? this._course.lessons[index] : null
    }

    nowLesson(nowDate: TimeDate): Lesson | null {
        const index = this.startedLessonIndex(nowDate)
        return (index > -1 && !this.finishedLesson(nowDate, index)) ? this._course.lessons[index] : null
    }

    nextLesson(nowDate: TimeDate): Lesson | null {
        const nextIndex = this.nextLessonIndex(nowDate)
        return nextIndex === -1 ? null : this._course.lessons[nextIndex]
    }

    nextLessonFormatTime(nowDate: TimeDate, formatType: FormatType): string {
        return this._dates[this.nextLessonIndex(nowDate)].format(formatType)
    }
}