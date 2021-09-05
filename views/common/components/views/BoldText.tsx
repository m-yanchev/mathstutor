import React from "react";
import {Typography} from "@material-ui/core";

type Props = {
    children: string
}

export default function BoldText(props: Props) {

    const {children} = props

    return (
        <Typography variant={"inherit"} component={"b"} color={"inherit"}>{children}</Typography>
    )
}