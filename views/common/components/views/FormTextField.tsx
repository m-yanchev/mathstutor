import React from "react";
import {Box, TextField} from "@material-ui/core";

export type AutoComplete = "email" | "new-password" | "current-password" | "username" | "off"
export type Type = "email" | "password"
export type Label = "Имя" | "Эл. адрес" | "Пароль" | "Новый пароль" | "Подтвердите пароль"

type Props = {
    id: string,
    label: Label,
    type?: Type,
    required?: boolean,
    autoComplete?: AutoComplete,
    autoFocus?: boolean,
    error?: boolean,
    value: string,
    helperText: string | null
    onConfirm: () => void,
    onChange: (arg0: string) => void,
    onBlur: () => void,
    onFocus?: () => void
}

export default function FormTextField(props: Props) {

    const {onConfirm, onChange, ...rest} = props

    return (
        <Box style={{minHeight: "110px"}}>
            <TextField onChange={handleChange} onKeyUp={handleKeyUp} variant={'outlined'} fullWidth margin="normal"
                       {...rest}/>
        </Box>
    )

    function handleKeyUp(event) {
        if (event.key === "Enter") {
            onConfirm();
        }
    }

    function handleChange(event) {
        onChange(event.target.value);
    }
}