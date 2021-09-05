import React from "react";
import InputValidation from "../smarts/InputValidation";

const ERROR_MESSAGE = "Пожалуйста, введите Ваше имя!"
const LABEL = "Имя"

type Props = {
    defaultValue?: string,
    autoFocus?: boolean,
    onConfirm: () => void,
    onChange: (arg0: string | null) => void
}

export default function UserNameInput(props: Props) {

    const {...rest} = props

    const validate = value => {
        return value.length > 0
    }

    return (
        <InputValidation id={"user-name"} validate={validate} errorMessage={ERROR_MESSAGE} label={LABEL} {...rest}/>
    )
}