import React from "react";
import InputValidation from "../smarts/InputValidation";

const NO_ANSWER_MESSAGE = ''

type Props = {
    onConfirm: () => void,
    onChange: (value: string | null) => void
}

export default function AnswerInput(props: Props) {

    const {...rest} = props
    return <InputValidation id="answer" type="text" label="Ответ" autoComplete={"off"} required
                            errorMessage={NO_ANSWER_MESSAGE} validate={validate} {...rest}/>

    function validate(value) {
        return Boolean(value)
    }
}