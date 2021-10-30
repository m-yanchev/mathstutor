import React from 'react';
import Test from "../../common/rules/Test";
import {Box, Step, StepLabel, Stepper} from "@mui/material";
import AnswerInput from "../../common/components/views/AnswerInput";
import MainButton from "../../common/components/views/MainButton";
import ProblemDesc from "../../common/components/views/ProblemDesc";

type Props = {
    test: Test
    problemIndex: number
    onConfirmAnswer: (value: string) => void
}

export default function TestView(props: Props) {

    const {test, problemIndex, onConfirmAnswer} = props
    let answer = ""
    const exercises = test.exercises
    const problem = exercises[problemIndex].problem

    const handleConfirmExercise = () => {
        onConfirmAnswer(answer)
    }
    const handleAnswerChange = value => {
        answer = value
    }

    return (
        <Box sx={{width: "100%"}}>
            <Stepper activeStep={problemIndex} sx={{margin: "2rem 0"}}>
                {exercises.map((exercise, index) => {
                    const problem = exercise.problem
                    return (
                        <Step key={problem.id} completed={index < problemIndex}>
                            <StepLabel>{""}</StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            <Box>
                <ProblemDesc>{problem.desc}</ProblemDesc>
                <AnswerInput key={problem.id} onConfirm={handleConfirmExercise} onChange={handleAnswerChange}/>
                <MainButton onClick={handleConfirmExercise}>Подтвердить</MainButton>
            </Box>
        </Box>
    )
}