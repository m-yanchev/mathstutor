import React from "react";
import {Typography} from "@material-ui/core";

type Props = {
    className?: string,
    children: string,
    title?: string
}

export default function Header(props: Props) {

    const {children, title, ...rest} = props

    return (
        <>
            {title ?
                <>
                    <Typography component={"h2"} variant={"h2"} color={"textSecondary"} {...rest}>
                        {children + " "}
                        <Typography component={"span"} variant={"inherit"} color={"textPrimary"}>
                            {title}
                        </Typography>
                    </Typography>
                </> :
                <Typography align={"center"} noWrap component={"h2"} variant={"h2"} {...rest}>
                    {children}
                </Typography>
            }
        </>
    )
}