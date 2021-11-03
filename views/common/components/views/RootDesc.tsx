import React from "react"
import {Typography} from "@mui/material";

type Props = {
    sx?: any,
    children: string
}

export default function RootDesc(props: Props) {

    const {children} = props
    const sx = {padding: "1rem 0", ...props.sx}

    return (
        <Typography sx={sx} align={"center"}>
            {children}
        </Typography>
    )
}