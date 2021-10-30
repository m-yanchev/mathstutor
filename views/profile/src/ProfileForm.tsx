import React from "react";
import {makeStyles, Typography, Box} from "@material-ui/core";
import UserNameInput from "../../common/components/views/UserNameInput";
import ConfirmButton from "../../common/components/views/ConfirmButton";
import Header from "../../common/components/views/Header";

const useStyles = makeStyles({
    confirmButton: {
        marginTop: 20,
        marginBottom: 20
    },
    emailBox: {
        paddingLeft: 14,
        minHeight: 80
    }
})

const HEADER = "Профиль пользователя"
const CONFIRM_BUTTON_TITLE = "Изменить"

type Props = {
    userName: string,
    email: string,
    onConfirm: () => void,
    onChange: (formItem: FormItem) => void,
    confirmDisabled: boolean
}

type FormItem = {
    name: FormItemName,
    value: string
}
type FormItemName = "username"

export default function ProfileForm(props: Props) {

    const {userName, email, onConfirm, onChange, confirmDisabled} = props
    const classes = useStyles()

    return (
        <>
            <Header sx={{marginTop: "20px", marginBottom: "35px"}}>{HEADER}</Header>
            <UserNameInput defaultValue={userName} onConfirm={onConfirm}
                           onChange={value => onChange({name: "username", value})}/>
            <Box className={classes.emailBox}>
                <Typography color={"textSecondary"} variant={"subtitle1"}>{'Эл. адрес:'}</Typography>
                <Typography variant={"body1"}>{email}</Typography>
            </Box>
            <ConfirmButton className={classes.confirmButton} disabled={confirmDisabled} onClick={onConfirm}>
                {CONFIRM_BUTTON_TITLE}
            </ConfirmButton>
        </>
    )
}