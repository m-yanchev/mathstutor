import React from "react"
import MathText from "./MathText";
import {Box} from "@mui/material";

type Props = {
    children: string
}

export default function ProblemDesc(props: Props) {

    const {children} = props

    return (
        <Box sx={{margin: "2rem 0"}}>
            <MathText>{children}</MathText>
        </Box>
    )
}