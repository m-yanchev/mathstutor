import React from "react";
import {Button, Grid} from "@material-ui/core";

const CONFIRM_TITLE = "Подтвердить"

type Props = {
    className?: string,
    onClick: () => void,
    children?: string,
    disabled: boolean
}

export default function ConfirmButton(props: Props) {

    const {children, ...rest} = props

    return (
        <Grid container justifyContent={"center"}>
            <Button variant={"contained"} color="primary" {...rest}>{children || CONFIRM_TITLE}</Button>
        </Grid>
    )
}