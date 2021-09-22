import React from "react";
import {Typography} from "@material-ui/core";

type Props = {
    className?: string,
    children: string,
}

export default function Header(props: Props) {

    const {children, ...rest} = props

    return (
        <Typography align={"center"} noWrap component={"h2"} variant={"h2"} {...rest}>
            {children}
        </Typography>
    )
}