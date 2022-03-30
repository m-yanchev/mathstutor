import React from 'react';
import Stepper from "../../common/components/views/Stepper";
import MainButton from "../../common/components/views/MainButton";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import EstimateInput from "../../common/components/views/EstimateInput";
import {Role, TestResult} from "./model";
import Answer from "../../common/components/views/Answer";
import MathProvider from "../../common/components/smarts/MathProvider";
import Solution from "../../common/components/views/Solution";
import MaxEstimate from "../../common/components/views/MaxEstimate";
import ProblemView from "../../common/components/views/ProblemView";

type Props = {
    role: Role
    index: number
    testResult: TestResult
    onChange: (value: string | null) => void
    onNext: () => void
    onFinish: () => void
}

type ReceivedAnswerProps = {
    value: string
    role: Role
    success: boolean
}

type EstimateProps = {
    value: number
}

export default function (props: Props) {

    const {role, testResult, index, onChange, onNext, onFinish} = props
    const exercises = testResult.exercises
    const problemResults = testResult.problemResults
    const problems = testResult.problems
    const isLastResult = testResult.isLastResult(index)

    const handleConfirm = () => {
        if (isLastResult) onFinish()
        else onNext()
    }

    return (
        <MathProvider>
            <Stepper index={index} length={problems.length} completedLength={0}/>
            <ProblemView commonDesc={problems[index].commonDesc} desc={problems[index].desc}
                         image={problems[index].illus}/>
            {problems[index].solution && problemResults[index].received &&
                <Accordion sx={{width: "100%"}}>
                    <AccordionSummary>
                        <Typography color={"secondary"}>Смотреть решение</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Solution desc={problems[index].solution.desc} illus={problems[index].solution.illus}/>
                    </AccordionDetails>
                </Accordion>
            }
            {problems[index].answer && problemResults[index].received &&
                <Answer answer={problems[index].answer}/>
            }
            {!exercises[index].withDetailedAnswer &&
                <ReceivedAnswer value={problemResults[index].answer}
                                role={role}
                                success={testResult.getSuccess(index)}/>
            }
            {exercises[index].withDetailedAnswer &&
                <MaxEstimate value={exercises[index].maxEstimate}/>
            }
            {exercises[index].withDetailedAnswer && role === "student" && problemResults[index].received &&
                <Estimate value={problemResults[index].estimate}/>
            }
            {exercises[index].withDetailedAnswer && role === "student" && !problemResults[index].received &&
                <NotReceivedMessage/>
            }
            {exercises[index].withDetailedAnswer && role === "tutor" &&
                <EstimateInput key={index}
                               max={exercises[index].maxEstimate}
                               onChange={onChange}
                               onConfirm={handleConfirm}/>
            }
            {!isLastResult ?
                <MainButton onClick={onNext}>Следующее задание</MainButton> :
                <MainButton onClick={onFinish}>Завершить</MainButton>
            }
        </MathProvider>
    )
}

function Estimate(props: EstimateProps) {

    const {value} = props

    return (
        <Typography>
            <Typography color={'secondary'} component={"span"}>Текущая оценка: </Typography>
            <Typography component={"span"}>{value}</Typography>
        </Typography>
    )
}

function ReceivedAnswer(props: ReceivedAnswerProps) {

    const {success, role, value} = props

    return (
        <Typography color={success ? "green" : "red"}>
            {`${role === 'tutor' ? 'Ответ ученика' : 'Ваш ответ'}: ${value}`}
        </Typography>
    )
}

function NotReceivedMessage() {
    return (
        <Typography color={"secondary"}>
            {"Задание не проверено учителем"}
        </Typography>
    )
}