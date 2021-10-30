import React from "react"
import type {ReactNode} from "react";
import {makeStyles} from "@material-ui/core";
import Header from "./Header";
import ConfirmButton from "./ConfirmButton";

const useStyles = makeStyles({
    confirmButton: {
        marginTop: 20,
        marginBottom: 20
    },
    formHeader: {
        marginTop: 20,
        marginBottom: 35
    }
})

type Props = {
    header: string,
    children: ReactNode | Array<ReactNode>,
    confirmDisabled?: boolean,
    onConfirm: () => void,
    confirmButtonTitle?: string
}

export default function MainForm(props: Props) {

    const {header, confirmDisabled, children, onConfirm, confirmButtonTitle} = props
    const classes = useStyles()

    return (
        <>
            <Header sx={{marginTop: "20px", marginBottom: "35px"}}>{header}</Header>
            {children}
            <ConfirmButton className={classes.confirmButton} disabled={confirmDisabled} onClick={onConfirm}>
                {confirmButtonTitle}
            </ConfirmButton>
        </>
    )
}