import Appointment from "../Appointment";
import TimeDate from "../TimeDate";
import Course from "../Course";

const appointmentData = {
    startTimeStamp: 1630512000000, // 01 сентября 19:00
    weekDays: [
        {number: 2, hour: 18, minute: 0, duration: null},
        {number: 4, hour: 18, minute: 0, duration: 90}
    ],
    course: {
        title: "ЕГЭ профильного уровня. Задания с развернутым ответом. 11 класс.",
        lessons: [
            {title: "Задания 13"},
            {title: "Задания 14"},
            {title: "Задания 15"},
            {title: "Задания 16"}
        ]
    }
}

describe("create", () => {

    test("Создать назначение: на вторник с 18:00 один час и четверг с 18:00 90 минут, для курса ...", () => {

        const appointment = Appointment.create(appointmentData)

        expect(appointment._durations).toEqual([90, 60])
        expect(appointment._dates).toEqual([
            TimeDate.create(1630594800000), // 02 september
            TimeDate.create(1631026800000), // 07 september
            TimeDate.create(1631199600000), // 09 september
            TimeDate.create(1631631600000), // 14 september
        ])
        expect(appointment._course).toEqual(Course.create({
            title: "ЕГЭ профильного уровня. Задания с развернутым ответом. 11 класс.",
            lessons: [
                {title: "Задания 13"},
                {title: "Задания 14"},
                {title: "Задания 15"},
                {title: "Задания 16"}
            ]
        }))
    })

    test("Возвращает null", () => {
        const appointment = Appointment.create(null)
        expect(appointment).toBeNull()
    })
})

describe("prevLesson", () => {

    const appointment = Appointment.create(appointmentData)

    test("Текущее время раньше начала первого урока. Должен вернуть null", () => {
        const lesson = appointment.prevLesson(TimeDate.create(1630494736123)) // 01 september
        expect(lesson).toBe(null)
    })

    test("Текущее время во время первого урока. Должен вернуть null", () => {
        const lesson = appointment.prevLesson(TimeDate.create(1630595536123)) // 02 september 18:15
        expect(lesson).toBe(null)
    })

    test("Текущее время между вторым и третьим уроком. Должен вернуть второй урок", () => {
        const lesson = appointment.prevLesson(TimeDate.create(1631031136453)) // 07 september 19:15
        expect(lesson).toEqual({_title: "Задания 14"})
    })

    test("Текущее время во время четвертого урока. Должен вернуть третий урок", () => {
        const lesson = appointment.prevLesson(TimeDate.create(1631634736019)) // 14 september 18:52
        expect(lesson).toEqual({_title: "Задания 15"})
    })

    test("Текущее время после окончания четвертого урока. Должен вернуть четвертый урок", () => {
        const lesson = appointment.prevLesson(TimeDate.create(1631635936069)) // 14 september 19:12
        expect(lesson).toEqual({_title: "Задания 16"})
    })
})

describe("nowLesson", () => {

    const appointment = Appointment.create(appointmentData)

    test("Текущее время раньше начала первого урока. Должен вернуть null", () => {
        const lesson = appointment.nowLesson(TimeDate.create(1630494736123)) // 01 september
        expect(lesson).toBe(null)
    })

    test("Текущее время во время первого урока. Должен вернуть первый урок", () => {
        const lesson = appointment.nowLesson(TimeDate.create(1630595536123)) // 02 september 18:15
        expect(lesson).toEqual({_title: "Задания 13"})
    })

    test("Текущее время между вторым и третьим уроком. Должен вернуть null", () => {
        const lesson = appointment.nowLesson(TimeDate.create(1631031136453)) // 07 september 19:15
        expect(lesson).toBe(null)
    })

    test("Текущее время во время четвертого урока. Должен вернуть четвертый урок", () => {
        const lesson = appointment.nowLesson(TimeDate.create(1631634736019)) // 14 september 18:52
        expect(lesson).toEqual({_title: "Задания 16"})
    })

    test("Текущее время после окончания четвертого урока. Должен вернуть null", () => {
        const lesson = appointment.nowLesson(TimeDate.create(1631635936069)) // 14 september 19:12
        expect(lesson).toBe(null)
    })
})

describe("nextLesson", () => {

    const appointment = Appointment.create(appointmentData)

    test("Текущее время раньше начала первого урока. Должен вернуть первый урок", () => {
        const lesson = appointment.nextLesson(TimeDate.create(1630494736123)) // 01 september
        expect(lesson).toEqual({_title: "Задания 13"})
    })

    test("Текущее время во время первого урока. Должен вернуть второй урок", () => {
        const lesson = appointment.nextLesson(TimeDate.create(1630595536123)) // 02 september 18:15
        expect(lesson).toEqual({_title: "Задания 14"})
    })

    test("Текущее время между вторым и третьим уроком. Должен вернуть третий урок", () => {
        const lesson = appointment.nextLesson(TimeDate.create(1631031136453)) // 07 september 19:15
        expect(lesson).toEqual({_title: "Задания 15"})
    })

    test("Текущее время во время четвертого урока. Должен вернуть null", () => {
        const lesson = appointment.nextLesson(TimeDate.create(1631634736019)) // 14 september 18:52
        expect(lesson).toBe(null)
    })

    test("Текущее время после окончания четвертого урока. Должен вернуть null", () => {
        const lesson = appointment.nextLesson(TimeDate.create(1631635936069)) // 14 september 19:12
        expect(lesson).toBe(null)
    })
})

describe("nextLessonFormatTime", () => {

    const appointment = Appointment.create(appointmentData)

    test('Должен вернуть "02.09" и "18:00"', () => {
        // 01 september
        expect(appointment.nextLessonFormatTime(TimeDate.create(1630494736123), "day.month"))
            .toBe("02.09")
        expect(appointment.nextLessonFormatTime(TimeDate.create(1630494736123), "hour:minute"))
            .toBe("18:00")
    })

    test('Должен вернуть "07.09" и "18:00"', () => {
        // 02 september 18:15
        expect(appointment.nextLessonFormatTime(TimeDate.create(1630595536123), "day.month"))
            .toBe("07.09")
        expect(appointment.nextLessonFormatTime(TimeDate.create(1630595536123), "hour:minute"))
            .toBe("18:00")
    })

    test('Должен вернуть "09.09" и "18:00"', () => {
        // 07 september 19:15
        expect(appointment.nextLessonFormatTime(TimeDate.create(1631031136453), "day.month"))
            .toBe("09.09")
        expect(appointment.nextLessonFormatTime(TimeDate.create(1631031136453), "hour:minute"))
            .toBe("18:00")
    })
})