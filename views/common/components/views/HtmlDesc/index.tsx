import React from "react"
import {Box} from "@mui/material";
import "./styles.css";

type Props = {
    children: string
}

export default function (props: Props) {

    const {children} = props

    return (
        <Box sx={{margin: "1rem 0"}} >
            <div className={"problem-desc"} dangerouslySetInnerHTML={{__html: children}}/>
        </Box>
    )
}