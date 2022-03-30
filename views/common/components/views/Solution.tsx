import {Box, Typography} from "@mui/material";
import HtmlDesc from "./HtmlDesc";
import React from "react";
import {Illus} from "../../rules/Illus";

type SolutionProps = {
    desc: string
    illus: Illus | null
}

export default function (props: SolutionProps) {

    const {desc, illus} = props

    return (
        <Box sx={{margin: "1rem 0", overflow: "hidden"}}>
            <Typography variant={"h6"} color={"secondary"}>Решение:</Typography>
            {illus &&
                <img style={{float: "right", margin: "0 0 0.5rem 0.5rem"}}
                     src={illus.src} alt={illus.alt}/>
            }
            <HtmlDesc>{desc}</HtmlDesc>
        </Box>
    )
}