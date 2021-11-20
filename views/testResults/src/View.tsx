import React from 'react';
import Table, {HeadCell} from "../../common/components/views/Table";
import {TestResult} from "./model";
import {Link, Typography} from "@mui/material";

const HEADS: HeadCell[] = [{
    id: "date",
    label: "Дата",
    align: "center"
}, {
    id: "time",
    label: "Время",
    align: "center"
}, {
    id: "title",
    label: "Наименование теста",
    align: "left"
}, {
    id: "percent",
    label: "Процент выполнения",
    align: "center"
}]

type Props = {
    testResults: TestResult[],
    studentId: string
}

export default function (props: Props) {

    const {testResults, studentId} = props

    const TitleCell = ({id, title}) => (
        <>
            <Typography>{title}</Typography>
            <Link href={`/form/problem-results?studentId=${studentId}&testResultTimeStamp=${id}`}>
                {"Поработать над ошибками"}
            </Link>
        </>
    )

    const rows = testResults.map(result => {
        return {
            id: result.id,
            cells: [result.date, result.time, <TitleCell title={result.test.title} id={result.id}/>, result.percent]
        }
    })

    return (
        <Table heads={HEADS} rows={rows}/>
    )
}