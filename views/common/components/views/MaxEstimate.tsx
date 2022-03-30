import React from "react";
import {Typography} from "@mui/material";

type Props = {
    value: number
}

export default function (props: Props) {

    const {value} = props

    return (
        <Typography>
            <Typography color={'secondary'} component={"span"}>Максимальная оценка за это задание: </Typography>
            <Typography component={"span"}>{value}</Typography>
        </Typography>
    )
}