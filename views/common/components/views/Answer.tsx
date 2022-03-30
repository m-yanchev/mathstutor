import {Box, Typography} from "@mui/material";
import HtmlDesc from "./HtmlDesc";
import React from "react";

type AnswerProps = {
    answer: string
}

export default function (props: AnswerProps) {

    const {answer} = props

    return (
        <Box sx={{margin: "2rem 0 0 0"}}>
            <Typography variant={"h6"} color={"secondary"}>Ответ:</Typography>
            <HtmlDesc>{answer}</HtmlDesc>
        </Box>
    )
}