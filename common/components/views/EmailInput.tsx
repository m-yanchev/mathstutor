import React from "react";
import InputValidation from "../smarts/InputValidation";

const EMAIL_EXIST_MESSAGE = "Пользователь с таким адресом электронной почты уже зарегистрирован в системе"
const EMAIL_FORMAT_MESSAGE = 'Неверный формат адреса электронной почты'

type Props = {
    emailExist: boolean,
    onConfirm: () => void,
    onChange: (arg0: string | null) => void
}

export default function EmailInput(props: Props) {

    const {emailExist, ...rest} = props
    const errorMessage = emailExist ? EMAIL_EXIST_MESSAGE : EMAIL_FORMAT_MESSAGE

    return <InputValidation id="email" type="email" label="Эл. адрес" autoComplete={"email"} required
                            errorMessage={errorMessage} validate={validate} {...rest}/>

    function validate(value) {
        return Boolean(value.match(/\S+@\S+\.\S+/))
    }
}