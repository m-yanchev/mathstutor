import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Box, Link, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table, {HeadCell} from "../../common/components/views/Table";
import Test from "../../common/rules/Test";

const RESULT_HEAD_CELLS: HeadCell[] = [
    {id: "date", label: "Дата выполнения", align: "center", width: 90},
    {id: "time", label: "Время выполнения", align: "center", width: 90},
    {id: "estimate", label: "Процент выполнения", align: "center", width: 60},
    {id: "status", label: "Статус", align: "center"}
]

type Props = {
    test: Test
}

export default function FinalTest(props: Props) {

    const {test} = props

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
        <Box sx={{marginTop: "1rem", width: "100%"}}>
            <Typography sx={{margin: "0 0 0.4rem 16px"}} variant={"h3"}>Итоговый тест:</Typography>
            <Link sx={{marginLeft: "16px", display: "block", padding: "12px 0"}}
                  href={`/form/test?id=${test.id}`}
                  variant={"body1"}>
                {"Выполнить"}
            </Link>
            {test.results.length > 0 &&
            <Accordion>
                <AccordionSummary sx={{height: "2rem"}} expandIcon={<ExpandMoreIcon/>}>
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