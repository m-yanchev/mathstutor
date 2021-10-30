import React, {useEffect, useRef} from "react"
import {Typography} from "@mui/material";

type Props = {
    children: string
}

export default function MathText(props: Props) {

    const {children} = props
    const el = useRef(null);
    useEffect(() => {
        // @ts-ignore
        window.MathJax.typeset()
    })

    return (
        <Typography ref={el} variant={"body1"} sx={{marginLeft: "14px"}}>{children}</Typography>
    )
}