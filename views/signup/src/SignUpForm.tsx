import React from "react";
import {Container, Grid, makeStyles, Paper, ThemeProvider} from "@material-ui/core";
import UserNameInput from "../../../common/components/views/UserNameInput";
import EmailInput from "../../../common/components/views/EmailInput";
import NewPasswordInput from "../../../common/components/smarts/NewPasswordInput";
import ConfirmButton from "../../../common/components/views/ConfirmButton";
import FormHeader from "../../../common/components/views/FormHeader";
import getTheme from "../../../common/theme";

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
        <ThemeProvider theme={getTheme()}>
            <Grid container alignItems={"center"} style={{position: "absolute", height: "100%"}}>
                <Container fixed maxWidth={"xs"} disableGutters>
                    <Paper elevation={3} style={{padding: "32px"}}>
                        <FormHeader className={classes.formHeader}>{REGISTRATION_HEADER}</FormHeader>
                        <UserNameInput onConfirm={onConfirm}
                                       onChange={value => onChange({name: "username", value})}/>
                        <EmailInput onConfirm={onConfirm} emailExist={emailExist}
                                    onChange={value => onChange({name: "email", value})}/>
                        <NewPasswordInput onConfirm={onConfirm}
                                          onChange={value => onChange({name: "password", value})}/>
                        <ConfirmButton className={classes.confirmButton} disabled={confirmDisabled} onClick={onConfirm}>
                            {CONFIRM_BUTTON_TITLE}
                        </ConfirmButton>
                    </Paper>
                </Container>
            </Grid>
        </ThemeProvider>
    )
}