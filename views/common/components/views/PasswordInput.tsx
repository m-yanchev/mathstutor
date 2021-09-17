import React from "react";
import InputValidation from "../smarts/InputValidation";

type Props = {
    onConfirm: () => void,
    onChange: (arg0: string | null) => void
}

const ERROR_MESSAGE = "Пожалуйста, введите пароль!"
const LABEL = "Пароль"

export default function PasswordInput(props: Props) {

    const validate = value => {
        return value.length > 0
    }

    return <InputValidation id="password" type="password" label={LABEL} autoComplete={"current-password"} required
                            errorMessage={ERROR_MESSAGE} validate={validate} {...props}/>
}