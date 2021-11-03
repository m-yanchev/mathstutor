import React from "react";
import {Box, TextField} from "@mui/material";

export type AutoComplete = "email" | "new-password" | "current-password" | "username" | "off"
export type Type = "email" | "password" | "text"
export type Label = "Имя" | "Эл. адрес" | "Пароль" | "Новый пароль" | "Подтвердите пароль" | "Ответ"

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
        <Box sx={{minHeight: "100px"}}>
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