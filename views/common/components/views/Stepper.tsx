import React from "react";
import {Step, StepLabel, Stepper} from "@mui/material";

interface Props {
    index: number
    length: number
    completedLength: number
}

export default function (props: Props) {

    const {index, length, completedLength} = props

    const steps = []
    for (let i = 0; i < length; i++) {
        steps.push(
            <Step key={i} completed={i < completedLength}>
                <StepLabel>{}</StepLabel>
            </Step>
        )
    }

    return (
        <Stepper activeStep={index} sx={{margin: "2rem 0"}}>
            {steps}
        </Stepper>
    )
}