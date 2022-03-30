import React, {useState} from "react"
import FormTextField, {AutoComplete, Label, Type} from "../views/FormTextField";

type InputValidationProps = {
    id: string,
    type?: Type,
    required?: boolean,
    autoComplete?: AutoComplete,
    defaultValue?: string,
    error?: boolean,
    onConfirm: () => void,
    onChange: (arg0: string | null) => void,
    onFocus?: () => void,
    validate: (arg0: string) => boolean,
    errorMessage: string,
    autoFocus?: boolean,
    label: Label,
    min?: number
    max?: number
}

function InputValidation(props: InputValidationProps) {

    const {defaultValue, error, errorMessage, onConfirm, onChange, validate, ...rest} = props
    const [value, setValue] = useState<string>(defaultValue || "")
    const [valid, setValid] = useState<boolean>(true)
    const errorOrNotValid = error || !valid
    const helperText = (error || !valid) ? errorMessage : null

    return (
        <FormTextField value={value} error={errorOrNotValid} helperText={helperText}
                       onConfirm={handleConfirm} onBlur={handleBlur} onChange={handleChange} {...rest}/>
    )

    function handleConfirm(): void {
        if (validate(value)) {
            onConfirm()
        } else {
            setValid(false)
        }
    }

    function handleBlur(): void {
        if(!validate(value)) {
            setValid(false)
        }
    }

    function handleChange(value: string): void {
        setValid(true)
        setValue(value)
        if (validate(value)) {
            onChange(value);
        } else {
            onChange(null);
        }
    }
}

export default InputValidation