import React from 'react';
import {spaPageFolder} from "../../common/constants";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card, CardActions,
    CardContent,
    CardHeader,
    Link,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Table, {HeadCell} from "../../common/components/views/Table";
import {Lesson, Test, TestResult, UserId} from "./model";

const RESULT_HEAD_CELLS: HeadCell[] = [
    {id: "date", label: "Дата вып-я", align: "center", width: 80},
    {id: "time", label: "Время вып-я", align: "center", width: 80},
    {id: "estimate", label: "Процент вып-я", align: "center", width: 60},
    {id: "status", label: "Статус", align: "center"},
    {id: "link", label: "Ссылка", align: "center"}
]

interface Props {
    lesson: Lesson
    studentId: UserId | void
}

interface ExamplesProps {
    lessonId: number
}

interface FinalTestProps {
    test: Test
}

interface SectionProps {
    title: string
    desc?: string
    action?: string
    href?: string
    children?: JSX.Element
}

interface ResultsProps {
    results: TestResult[]
    studentId: UserId | void
}

export default function (props: Props) {

    const {lesson, studentId} = props

    return (
        <>
            {lesson.isExamples &&
                <Examples lessonId={lesson.id}/>
            }
            {lesson.finalTest && <>
                    <FinalTest test={lesson.finalTest}/>
                    {lesson.finalTest.results.length > 0 &&
                        <Results results={lesson.finalTest.results} studentId={studentId}/>
                    }
                </>
            }
        </>
    )
}

function Examples(props: ExamplesProps) {

    const {lessonId} = props

    return (
        <Section title={"Примеры решений"}
                 href={`/${spaPageFolder}/examples?lessonId=${lessonId}`}
                 action={"посмотреть"}/>
    )
}

function FinalTest(props: FinalTestProps) {

    const {test} = props

    const desc = test.state === "NOT_CHECKED" ?
        'Тест ещё не проверен учителем' : null
    const action = test.state === "NEW" ? "выполнить" : test.state === "NOT_FINISHED" ? "закончить" : "посмотреть"

    return (
        <Section title={"Итоговый тест"} desc={desc} href={`/form/test?id=${test.id}`} action={action}/>
    )
}

function Results(props: ResultsProps) {

    const {results, studentId} = props

    const linkToView = (testResultTimeStamp: number) => {
        const params = {
            testResultTimeStamp: `testResultTimeStamp=${testResultTimeStamp}`,
            studentId: studentId ? `&studentId=${studentId}` : ""
        }
        const href = `/${spaPageFolder}/problem-results?${params.testResultTimeStamp}${params.studentId}`
        return (
            <Link href={href}>
                {"посмотреть"}
            </Link>
        )
    }

    const resultRows = results.map(result => {
        const timeStamp = result.date.timeStamp
        return {
            id: String(timeStamp),
            cells: [
                result.date.format("day.month"),
                result.date.format("hour:minute"),
                String(result.percent),
                String(result.status),
                result.finished ? linkToView(timeStamp) : ""
            ]
        }
    })

    return (
        <Section title={"Результаты:"}>
            <Accordion>
                <AccordionSummary sx={{height: "1rem"}} expandIcon={<ExpandMoreIcon/>}>
                    <Typography color={"primary"}>таблица:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Table heads={RESULT_HEAD_CELLS} rows={resultRows}/>
                </AccordionDetails>
            </Accordion>
        </Section>
    )
}

function Section(props: SectionProps) {

    const {title, desc, href, action, children} = props

    return (
        <Card sx={{margin: "1rem 0"}}>
            <CardHeader title={title} titleTypographyProps={{variant: "h3"}}/>
            {(desc || children) &&
                <CardContent>
                    {children ? children :
                        <Typography color={"secondary"}>{desc}</Typography>
                    }
                </CardContent>
            }
            {action && href &&
                <CardActions>
                    <Link href={href} variant={"body1"}>{action}</Link>
                </CardActions>
            }
        </Card>
    )
}