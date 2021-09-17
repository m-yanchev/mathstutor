import React from "react"
import {Typography, makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        padding: "1rem 0"
    }
})

type Props = {
    className?: string,
    children: string
}

export default function RootDesc(props: Props) {

    const {children, className} = props
    const classes = useStyles()

    return (
        <Typography className={classes.root + className ? " " + className : ""} align={"center"}>
            {children}
        </Typography>
    )
}