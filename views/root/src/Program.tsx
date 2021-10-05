import React, {useState} from "react";
import Appointment from "../../common/rules/Appointment";
import FullScreenDialog from "../../common/components/views/FullScreenDialog";
import ToggleButtonGroup from "../../common/components/views/ToggleButtonGroup";
import TimeDate from "../../common/rules/TimeDate";
import Table, {HeadCell} from "../../common/components/views/Table";
import {Link} from "@material-ui/core";

type Props = {
    open: boolean,
    appointment: Appointment,
    onClose: () => void
}

const HEAD_CELLS: HeadCell[] = [
    {id: "date", label: "Дата занятия", align: "center", width: 90},
    {id: "time", label: "Время занятия", align: "center", width: 90},
    {id: "topic", label: "Тема урока", align: "left"}
]

export default function Program(props: Props) {

    const {open, appointment, onClose} = props
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
                    <Link href={`/form/lesson?id=${item.lesson.id}`}>{String(item.lesson.title)}</Link> :
                    item.lesson.title
            ]
        }))
    }

    return (
        <FullScreenDialog open={open} onClose={onClose} title={"Программа назначенного курса"}>
            <ToggleButtonGroup defaultLabelIdx={1} labels={labels} onClick={handleToggleButtonClick}/>
            <Table heads={HEAD_CELLS} rows={getRows()}/>
        </FullScreenDialog>
    )
}