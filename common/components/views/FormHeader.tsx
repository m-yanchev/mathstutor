import React from "react";
import {Typography} from "@material-ui/core";

type Props = {
    className?: string,
    children: string,
}

export default function FormHeader(props: Props) {

    const {children, ...rest} = props

    return (
        <Typography align={"center"} noWrap component={"h1"} variant={"h1"} {...rest}>
            {children}
        </Typography>
    )
}