import React from 'react';
import {Box, Button, ButtonGroup, Grid, PropTypes, Typography} from "@mui/material";
import AnswerInput from "../../common/components/views/AnswerInput";
import MathProvider from "../../common/components/smarts/MathProvider";
import ProblemView from "../../common/components/views/ProblemView";
import {Exercise} from "./model";
import Stepper from "../../common/components/views/Stepper";
import {EventName} from "../../../backend/graphqlAPI/handlers/results/results";
import Color = PropTypes.Color;

interface Props {
    length: number
    completedLength: number
    index: number
    exercise: Exercise | null
    onConfirmAnswer: (value: string | null) => void
    onClick: (event: EventName) => void
}

interface MessageProps {
    children: string
}

interface NavButtonsProps {
    onClick: (event: EventName) => void
    status: NavButtonsStatus
}

type NavButtonsStatus = "FIRST" | "LAST" | "MIDDLE"

export default function (props: Props) {

    const {length, index, completedLength, exercise, onConfirmAnswer, onClick} = props
    let answer = ""

    const handleConfirmExercise = () => {
        onConfirmAnswer(!exercise?.withDetailedAnswer ? answer : null)
    }
    const handleAnswerChange = value => {
        answer = value
    }

    const handleClick = (event: EventName) => {
        if (index === completedLength) onConfirmAnswer(!exercise?.withDetailedAnswer ? answer : null)
        onClick(event)
    }
    const navButtonsStatus: NavButtonsStatus = index === 0 ? "FIRST" : index >= length - 1 ? "LAST" : "MIDDLE"

    return (
        <MathProvider>
            <Box sx={{width: "100%"}}>
                <Stepper index={index} length={length} completedLength={completedLength}/>
                <Box>
                    {/*<ProblemView commonDesc={exercise.problem.commonDesc}
                                 desc={exercise.problem.desc}
                                 image={exercise.problem.illus} numb={index + 1}/>
                    {!exercise.withDetailedAnswer && index >= completedLength &&
                        <AnswerInput key={exercise.problem.id}
                                     onConfirm={handleConfirmExercise}
                                     onChange={handleAnswerChange}/>
                    }*/}
                    {/*{exercise.withDetailedAnswer &&
                        <DetailedAnswerMessage/>
                    }
                    {!exercise.withDetailedAnswer && index < completedLength &&
                        <CompletedMessage/>
                    }*/}
                    <NavButtons onClick={handleClick} status={navButtonsStatus}/>
                </Box>
            </Box>
        </MathProvider>
    )
}

function DetailedAnswerMessage() {
    return (
        <Message>Это задание с развёрнутым ответом. Сфотографируйте решение и ответ и отправьте учителю</Message>
    )
}

function CompletedMessage() {
    return (
        <Message>Ответ принят системой</Message>
    )
}

function Message(props: MessageProps) {
    return (
        <Typography sx={{padding: "16px"}} color={"secondary"}>
            {props.children}
        </Typography>
    )
}

function NavButtons(props: NavButtonsProps) {

    const {onClick, status} = props

    const confirmColor: Color = status === "LAST" ? "primary" : "secondary"

    const handleClick = (event: EventName) => () => {
        onClick(event)
    }
    
    return (<Grid container justifyContent={"space-between"}>
        <ButtonGroup>
            <Button onClick={handleClick("PREV")} disabled={status === "FIRST"} color={"secondary"}>
                {"Предыдущее"}
            </Button>
            <Button onClick={handleClick("NEXT")} disabled={status === "LAST"}>Следующее</Button>
        </ButtonGroup>
        <Button onClick={handleClick("CONFIRM")} variant={"outlined"} color={confirmColor}>Закончить</Button>
    </Grid>)
}