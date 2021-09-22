import Course from "./Course";
import type {CourseData} from "./Course";
import TimeDate, {FormatType} from "./TimeDate";
import Lesson from "./Lesson";

export type AppointmentData = {
    startTimeStamp: number,
    weekDays: WeekDay[],
    vacations: Vacation[] | null,
    course: CourseData
}

type WeekDay = {
    number: number,
    hour: number,
    minute: number,
    duration: number | null
}

type Vacation = {
    startTimeStamp: number,
    finishTimeStamp: number
}

type LessonItem = {
    title: string,
    date: TimeDate
}

export default class Appointment {

    _durations: Array<number>
    _dates: Array<TimeDate>
    _course: Course

    constructor(data: AppointmentData) {
        const weekDays = data.weekDays.slice()
        const sortedWeekDays = weekDays.sort((a, b) =>
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
        let startWeekDayIndex = firstWeekDates.findIndex(date => !date.earlierThan(startDate))
        if (startWeekDayIndex === -1) startWeekDayIndex = firstWeekDates.length
        this._course = Course.create(data.course)
        const getIncompleteWeekLessonCount = lessonCount => lessonCount % sortedWeekDays.length
        const getWeekDayIndex = lessonIndex => getIncompleteWeekLessonCount(startWeekDayIndex + lessonIndex)
        const getCompleteWeekCount = lessonCount => Math.floor(lessonCount / sortedWeekDays.length)

        const vacations = (data.vacations || []).slice()
        const preparedVacations = vacations.sort((a, b) =>
            a.startTimeStamp < b.startTimeStamp ? -1 : 1
        ).map(vacation => {
            const startDate = TimeDate.createBySec(vacation.startTimeStamp)
            const dayCount = startDate.dayCountTo(TimeDate.createBySec(vacation.finishTimeStamp))
            const incompleteWeekDayCount = dayCount % 7
            const startWeekDayNumber = startDate.weekDay
            const weekRestLessonCount = sortedWeekDays.reduce((count, {number}) =>
                count + ((number < startWeekDayNumber + incompleteWeekDayCount - 7) ? 1 : 0) +
                ((number >= startWeekDayNumber && number < startWeekDayNumber + incompleteWeekDayCount) ? 1 : 0)
                , 0)
            return {
                startDate,
                lessonCount: Math.floor(dayCount / 7) * sortedWeekDays.length + weekRestLessonCount
            }
        })

        const getLessonDate = lessonIndex => {
            const weekIndex: number = getCompleteWeekCount(startWeekDayIndex + lessonIndex)
            return firstWeekDates[getWeekDayIndex(lessonIndex)].offset({week: weekIndex})
        }
        this._dates = Array(this._course.lessons.length)
        for (let i = 0; i < this._dates.length; i++) {
            this._dates[i] = preparedVacations.reduce(
                (lesson, vacation) => {
                    if (vacation.startDate.earlierThan(lesson.date)) {
                        const count = lesson.count + vacation.lessonCount
                        return {date: getLessonDate(count), count}
                    } else {
                        return lesson
                    }
                },
                {date: getLessonDate(i), count: i}
            ).date
        }

        this._durations = Array(7)
        for (let i = 0; i < sortedWeekDays.length; i++) {
            this._durations[sortedWeekDays[getWeekDayIndex(i)].number] = sortedWeekDays[getWeekDayIndex(i)].duration
        }
    }

    static create(data: AppointmentData | null): Appointment | null {
        return data ? new Appointment(data) : null
    }

    comingLessons(nowDate: TimeDate): LessonItem[] {
        const startIndex = this.nextLessonIndex(nowDate)
        const dates = this._dates.slice(startIndex)
        return startIndex !== -1 ? this._course.lessons.slice(startIndex).map((lesson, i) => (
            {title: lesson.title, date: dates[i]}
        )) : []
    }

    pastLessons(nowDate: TimeDate): LessonItem[] {
        const finishedIndex = this.finishedLessonIndex(nowDate)
        return this._course.lessons.slice(0, finishedIndex + 1).map((lesson, i) => (
            {title: lesson.title, date: this._dates[i]}
        ))
    }

    lessonDuration(lessonIndex: number): number {
        return this._durations[this._dates[lessonIndex].weekDay] || 60
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