import React from "react"
import {Backdrop, CircularProgress} from "@mui/material";

export default function Progress() {

    return (
        <Backdrop sx={{zIndex: 2000, color: '#fff'}} open={true}>
            <CircularProgress color={"inherit"}/>
        </Backdrop>
    )
}