import React, {useState} from "react";
import {Link} from "@mui/material";
import Table, {HeadCell} from "../views/Table";
import ToggleButtonGroup from "../views/ToggleButtonGroup";
import TimeDate from "../../rules/TimeDate";
import Appointment from "../../rules/Appointment";

type Props = {
    appointment: Appointment
    makeLink: (id: number) => string
}

const HEAD_CELLS: HeadCell[] = [
    {id: "date", label: "Дата занятия", align: "center", width: 90},
    {id: "time", label: "Время занятия", align: "center", width: 90},
    {id: "topic", label: "Тема урока", align: "left"}
]

export default function Program(props: Props) {

    const {appointment, makeLink} = props
    const [state, setState] = useState<"coming" | "past">("coming")
    const labels = ["Прошедшие занятия", "Предстоящие занятия"]

    const handleToggleButtonClick = idx => {
        setState(idx == 1 ? "coming" : "past")
    }

    const getRows = () => {
        const nowDate = TimeDate.now
        const lessonItems = state === "coming" ? appointment.comingLessons(nowDate) : appointment.pastLessons(nowDate)
        return lessonItems.map(item => ({
            id: String(item.lesson.id),
            cells: [
                item.date.format("day.month"),
                item.date.format("hour:minute"),
                state === "past" ?
                    <Link href={makeLink(item.lesson.id)}>{String(item.lesson.title)}</Link> :
                    item.lesson.title
            ]
        }))
    }

    return (
        <>
            <ToggleButtonGroup defaultLabelIdx={1} labels={labels} onClick={handleToggleButtonClick}/>
            <Table heads={HEAD_CELLS} rows={getRows()}/>
        </>
    )
}