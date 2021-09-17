import React from "react";
import {Button, Grid, makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
    }
})

const CONFIRM_TITLE = "Подтвердить"

type Props = {
    className?: string,
    onClick: () => void,
    children?: string,
    disabled?: boolean
}

export default function ConfirmButton(props: Props) {

    const {children, ...rest} = props
    const classes = useStyles()

    return (
        <Grid className={classes.root} container justifyContent={"center"}>
            <Button variant={"outlined"} color="primary" {...rest}>{children || CONFIRM_TITLE}</Button>
        </Grid>
    )
}