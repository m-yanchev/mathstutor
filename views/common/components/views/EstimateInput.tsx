import React from "react";
import InputValidation from "../smarts/InputValidation";
import {Typography} from "@mui/material";
import MaxEstimate from "./MaxEstimate";

const NO_VALUE_MESSAGE = 'Оценка выходит за границы допустимого значения!'

type Props = {
    max: number
    onConfirm: () => void,
    onChange: (value: string | null) => void
}

export default function (props: Props) {

    const {max, ...rest} = props
    return (
        <InputValidation id="estimate" type="number" label="Оценка" autoComplete={"off"} required
                         errorMessage={NO_VALUE_MESSAGE} validate={validate} max={max} {...rest}/>
    )

    function validate(value) {
        return Boolean(value) && Number(value) <= max && Number(value) >= 0
    }
}