import React from "react"
import {Backdrop, CircularProgress, makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    backdrop: {
        zIndex: 2000,
        color: '#fff'
    }
})

export default function Progress() {

    const classes = useStyles()

    return (
        <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color={"inherit"}/>
        </Backdrop>
    )
}