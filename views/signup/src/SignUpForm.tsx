import React from "react";
import {makeStyles} from "@material-ui/core";
import UserNameInput from "../../common/components/views/UserNameInput";
import EmailInput from "../../common/components/views/EmailInput";
import NewPasswordInput from "../../common/components/smarts/NewPasswordInput";
import ConfirmButton from "../../common/components/views/ConfirmButton";
import Header from "../../common/components/views/Header";
import Container from "../../common/components/views/Container";
import AppBar from "../../common/components/views/AppBar";

const useStyles = makeStyles({
    confirmButton: {
        marginTop: 20,
        marginBottom: 20
    }
})

const REGISTRATION_HEADER = "Форма регистрации"
const CONFIRM_BUTTON_TITLE = "Зарегистрироваться"

type Props = {
    emailExist: boolean,
    confirmDisabled: boolean,
    onConfirm: () => void,
    onChange: (formItem: FormItem) => void
}

type FormItem = {
    name: FormItemName,
    value: string
}
type FormItemName = "username" | "email" | "password"

export default function SignUpForm(props: Props) {

    const {emailExist, confirmDisabled, onChange, onConfirm} = props
    const classes = useStyles()

    return (
        <>
            <AppBar/>
            <Container>
                <Header sx={{marginTop: "20px", marginBottom: "35 px"}}>{REGISTRATION_HEADER}</Header>
                <UserNameInput onConfirm={onConfirm}
                               onChange={value => onChange({name: "username", value})}/>
                <EmailInput onConfirm={onConfirm} emailExist={emailExist}
                            onChange={value => onChange({name: "email", value})}/>
                <NewPasswordInput onConfirm={onConfirm}
                                  onChange={value => onChange({name: "password", value})}/>
                <ConfirmButton className={classes.confirmButton} disabled={confirmDisabled} onClick={onConfirm}>
                    {CONFIRM_BUTTON_TITLE}
                </ConfirmButton>
            </Container>
        </>
    )
}