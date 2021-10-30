import React from "react"
import {Snackbar} from "@mui/material";

type ErrorInformerProps = {
    message: string | null
}

export function ErrorSnackbar(props: ErrorInformerProps) {

    const {message} = props
    const open = Boolean(message)

    return (
        <Snackbar open={open} message={message}/>
    )
}