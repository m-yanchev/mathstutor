import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Box, Link, makeStyles, Typography} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table, {HeadCell} from "../../common/components/views/Table";
import Test from "../../common/rules/Test";

const RESULT_HEAD_CELLS: HeadCell[] = [
    {id: "date", label: "Дата выполнения", align: "center", width: 90},
    {id: "time", label: "Время выполнения", align: "center", width: 90},
    {id: "estimate", label: "Процент выполнения", align: "center", width: 60},
    {id: "status", label: "Статус", align: "center"}
]

const useStyles = makeStyles({
    root: {
        marginTop: "1rem",
        width: "100%"
    },
    header: {
        margin: "0 0 0.4rem 16px"
    },
    runLink: {
        marginLeft: "16px",
        display: "block",
        padding: "12px 0"
    },
    results: {
        height: "2rem"
    }
})

type Props = {
    test: Test
}

export default function FinalTest(props: Props) {

    const {test} = props
    const classes = useStyles()

    const resultRows = test.results.map(result => ({
        id: String(result.date.timeStamp),
        cells: [
            result.date.format("day.month"),
            result.date.format("hour:minute"),
            String(result.percent),
            String(result.status)
        ]
    }))

    return (
        <Box className={classes.root}>
            <Typography className={classes.header} variant={"h3"}>Итоговый тест:</Typography>
            <Link className={classes.runLink} href={`/test-execution?id=${test.id}`} variant={"body1"}>Выполнить</Link>
            {test.results.length > 0 &&
            <Accordion>
                <AccordionSummary className={classes.results} expandIcon={<ExpandMoreIcon/>}>
                    <Typography>Результаты:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Table heads={RESULT_HEAD_CELLS} rows={resultRows}/>
                </AccordionDetails>
            </Accordion>
            }
        </Box>
    )
}