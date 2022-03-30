import React, {Fragment} from 'react';
import {Box, Divider, Typography} from "@mui/material";
import MathProvider from "../../common/components/smarts/MathProvider";
import ProblemView from "../../common/components/views/ProblemView";
import type {Example} from "./model"
import Solution from "../../common/components/views/Solution";
import Answer from "../../common/components/views/Answer";

type Props = {
    examples: Example[]
}

type ExampleProps = {
    example: Example
    index: number
}

type HeaderProps = {
    index: number
}

export default function (props: Props) {

    const {examples} = props

    return (
        <MathProvider>
            {examples.map((example, i) => (
                <Fragment key={example.id}>
                    <Divider/>
                    <ExampleBox example={example} index={i}/>
                </Fragment>
            ))}
        </MathProvider>
    )
}

function ExampleBox(props: ExampleProps) {

    const {example, index} = props

    return (
        <Box sx={{margin: "2rem 0 0 0"}}>
            <Header index={index}/>
            <ProblemView desc={example.desc}
                         commonDesc={example.commonDesc}
                         image={example.illus}
                         withoutPadding/>
            {example.solution && <Solution desc={example.solution.desc} illus={example.solution.illus}/>}
            {example.answer && <Answer answer={example.answer}/>}
        </Box>
    )
}

function Header(props: HeaderProps) {

    const {index} = props

    return (
        <Typography sx={{marginBottom: 1}} variant={"h3"}>{`Пример №${index + 1}`}</Typography>
    )
}