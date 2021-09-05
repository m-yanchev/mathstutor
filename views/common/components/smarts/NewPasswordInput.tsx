import React, {useState} from "react";
import FormTextField from "../views/FormTextField";

const NEW_PASS_MESSAGE = 'Пароль не может быть меньше 8 символов. В пароле должна присутствовать хотя бы одна цифра и ' +
    'буква.'
const VER_PASS_MESSAGE = 'Последовательность отличается от пароля'

type Props = {
    label?: "Новый пароль",
    autoFocus?: boolean,
    onChange: (value: string | null) => void,
    onConfirm: () => void
}

export default function NewPasswordInput(props: Props) {

    const {autoFocus, label, onChange, onConfirm} = props

    const [newPassValue, setNewPassValues] = useState<string>("")
    const [verPassValue, setVerPassValues] = useState<string>("")
    const [newPassMessage, setNewPassMessage] = useState<string | null>(null)
    const [verPassMessage, setVerPassMessage] = useState<string | null>(null)

    const newPassValidate = (value) => {
        return value.length >= 8 && value.match(/\d/) && value.match(/\w/)
    }

    const verPassValidate = (verValue, newValue) => {
        return verValue === newValue
    }

    const newPassSetError = () => {
        setNewPassMessage(NEW_PASS_MESSAGE)
    }

    const verPassSetError = () => {
        setVerPassMessage(VER_PASS_MESSAGE)
    }

    const newPassResetError = () => {
        setNewPassMessage(null)
    }

    const verPassResetError = () => {
        setVerPassMessage(null)
    }

    const newPassHandleChange = (value) => {
        setNewPassValues(value)
        if (verPassValidate(verPassValue, value)) verPassResetError()
        if (newPassValidate(value)) {
            newPassResetError()
            if (verPassValidate(verPassValue, value)) {
                onChange(value)
                verPassResetError()
            } else {
                onChange(null)
            }
        } else {
            onChange(null)
        }
    }

    const verPassHandleChange = (value) => {
        setVerPassValues(value)
        if (verPassValidate(value, newPassValue)) {
            verPassResetError()
            if (newPassValidate(newPassValue)) onChange(newPassValue)
        } else {
            onChange(null)
        }
    }

    const newPassUpdateError = () => {
        if (newPassValidate(newPassValue)) {
            newPassResetError()
            return true
        } else {
            newPassSetError()
            return false
        }
    }

    const verPassUpdateError = () => {
        if (verPassValidate(verPassValue, newPassValue)) {
            verPassResetError()
            return true
        } else {
            verPassSetError()
            return false
        }
    }

    const handleConfirm = () => {
        if (newPassUpdateError() && verPassUpdateError()) onConfirm()
    }

    const newPassHandleFocusOut = () => {
        newPassUpdateError()
        verPassUpdateError()
    }

    const verPassHandleFocusOut = () => {
        verPassUpdateError()
    }

    const verPassHandleFocusIn = () => {
        verPassResetError()
    }

    return (
        <>
            <FormTextField
                autoFocus={autoFocus}
                autoComplete="new-password"
                id="new-password"
                type="password"
                value={newPassValue}
                label={label || 'Пароль'}
                error={Boolean(newPassMessage)}
                helperText={newPassMessage}
                onChange={newPassHandleChange}
                onConfirm={handleConfirm}
                onBlur={newPassHandleFocusOut}
                required/>
            <FormTextField
                autoComplete="off"
                id="ver-password"
                type="password"
                value={verPassValue}
                label="Подтвердите пароль"
                error={Boolean(verPassMessage)}
                helperText={verPassMessage}
                onChange={verPassHandleChange}
                onConfirm={handleConfirm}
                onBlur={verPassHandleFocusOut}
                onFocus={verPassHandleFocusIn}
                required/>
        </>
    )

}