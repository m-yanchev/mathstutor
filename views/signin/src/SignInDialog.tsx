import React from "react";
import MainForm from "../../common/components/views/MainForm";
import EmailInput from "../../common/components/views/EmailInput";
import PasswordInput from "../../common/components/views/PasswordInput";

type Props = {
    onConfirm: () => void,
    onChange: (formItem: FormItem) => void,
    confirmDisabled: boolean
}
type FormItem = {
    name: FormItemName,
    value: string
}
type FormItemName = "email" | "password"

const FORM_HEADER = "Вход"
const CONFIRM_BUTTON_TITLE = "Войти"

export default function SignInDialog(props: Props) {

    const {onConfirm, onChange, confirmDisabled} = props

    return (
            <MainForm header={FORM_HEADER} confirmButtonTitle={CONFIRM_BUTTON_TITLE} onConfirm={onConfirm}
                      confirmDisabled={confirmDisabled}>
                <EmailInput onConfirm={onConfirm} onChange={value => onChange({name: "email", value})}/>
                <PasswordInput onConfirm={onConfirm} onChange={value => onChange({name: "password", value})}/>
            </MainForm>
    )
}