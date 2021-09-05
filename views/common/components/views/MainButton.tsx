import React from "react";
import {Button, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    button: {
        height: "2rem"
    }
}))

type Props = {
    children: string | Element
    onClick: () => void
}

export default function MainButton(props: Props) {

    const classes = useStyles()

    const {children, onClick} = props

    return (
        <Button className={classes.button} fullWidth onClick={onClick}>{children}</Button>
    )
}