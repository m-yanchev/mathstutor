import React from "react";
import Appointment from "../../common/rules/Appointment";
import Lesson from "../../common/rules/Lesson";
import TimeDate from "../../common/rules/TimeDate";
import BoldText from "../../common/components/views/BoldText";
import AppointmentBox from "./AppointmentBox";

type Props = {
    appointment: Appointment
}

export default function CourseStateBox(props: Props) {

    const {appointment} = props

    if (appointment) {
        return <AppointmentStateBox appointment={appointment}/>
    } else {
        return <NotAppointmentStateBox/>
    }
}

function AppointmentStateBox({appointment}) {

    const nowDate = TimeDate.now
    const prevLesson: Lesson | null = appointment.prevLesson(nowDate)
    const nowLesson: Lesson | null = appointment.nowLesson(nowDate)
    const nextLesson: Lesson | null = appointment.nextLesson(nowDate)
    const nextOrFirst = (Boolean(prevLesson) || Boolean(nowLesson)) ? "Следующее" : "Первое"

    const PrevLesson = prevLesson ?
        () => <>На прошлом занятии мы разбирали тему: <BoldText>{`"${prevLesson.title}"`}</BoldText></>
        : null

    const NowLesson = nowLesson ?
        () => <>Сейчас идёт занятие на тему: <BoldText>{`"${nowLesson.title}"`}</BoldText></>
        : null

    const NextLesson = nextLesson ? () =>
            <>
                {`${nextOrFirst} занятие на тему: "`}
                <BoldText>{nextLesson.title}</BoldText>
                {`" состоится `}
                <BoldText>{appointment.nextLessonFormatTime(nowDate, "day.month")}</BoldText>
                {" в "}
                <BoldText>{appointment.nextLessonFormatTime(nowDate, "hour:minute")}</BoldText>
            </>
        : null

    return <AppointmentBox messages={[PrevLesson, NowLesson, NextLesson]}/>
}

function NotAppointmentStateBox() {
    const NotAppointment = () => <>Репетитор ещё не назначил курс.</>
    return <AppointmentBox messages={[NotAppointment]}/>
}