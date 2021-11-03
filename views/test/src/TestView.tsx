import React from 'react';
import Test from "../../common/rules/Test";
import {Grid, Box, Step, StepLabel, Stepper, Typography} from "@mui/material";
import AnswerInput from "../../common/components/views/AnswerInput";
import MainButton from "../../common/components/views/MainButton";
import Problem, {Image} from "../../common/rules/Problem";
import MathProvider from "../../common/components/smarts/MathProvider";
import ProblemDesc from "../../common/components/views/ProblemDesc";

type Props = {
    test: Test
    problemIndex: number
    onConfirmAnswer: (value: string) => void
}

type ProblemProps = {
    problem: Problem
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
        <MathProvider>
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
                    <ProblemView problem={problem}/>
                    <AnswerInput key={problem.id} onConfirm={handleConfirmExercise} onChange={handleAnswerChange}/>
                    <MainButton onClick={handleConfirmExercise}>Подтвердить</MainButton>
                </Box>
            </Box>
        </MathProvider>
    )
}

function ProblemView(props: ProblemProps) {

    const {problem} = props
    const image: Image | null = problem.image
    const commonDesc: string | null = problem.commonDesc
    return (
        <Grid container>
            <Grid item xs={12} sm={image ? 7 : 12} sx={{paddingLeft: "16px"}}>
                {commonDesc && <Typography>{commonDesc}</Typography>}
                <ProblemDesc>{problem.desc}</ProblemDesc>
            </Grid>
            {image &&
            <Grid sx={{padding: "0 1rem"}} container item xs={12} sm={5} alignItems={"center"}
                  justifyContent={"center"}>
                <img style={{maxWidth: "100%"}}
                     src={image.src} alt={image.alt}/>
            </Grid>}
        </Grid>
    )
}