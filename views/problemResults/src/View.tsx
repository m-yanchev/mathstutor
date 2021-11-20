import React from 'react';
import ProblemStepper from "../../common/components/views/ProblemStepper";
import MainButton from "../../common/components/views/MainButton";
import {Typography} from "@mui/material";
import {ProblemResults} from "./model";

type Props = {
    index: number,
    problemResults: ProblemResults,
    onNext: () => void,
    onFinish: () => void
}

export default function (props: Props) {
    const {problemResults, index, onNext, onFinish} = props
    return (
        <>
            <ProblemStepper index={index} problems={problemResults.problems}/>
            <Typography>{`Правильный ответ: ${problemResults.problems[index].answer}`}</Typography>
            <Typography color={problemResults.results[index].success ? "green" : "red"}>
                {`Ответ ученика: ${problemResults.results[index].answer}`}
            </Typography>
            {problemResults.length - 1 > index ?
                <MainButton onClick={onNext}>Следующее задание</MainButton> :
                <MainButton onClick={onFinish}>Завершить проверку</MainButton>
            }
        </>
    )
}