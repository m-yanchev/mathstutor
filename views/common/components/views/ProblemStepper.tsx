import React from "react";
import MathProvider from "../smarts/MathProvider";
import {Grid, Step, StepLabel, Stepper, Typography} from "@mui/material";
import ProblemDesc from "./ProblemDesc";

type Props = {
    index: number,
    problems: Problem[]
}

type Problem = {
    id: number,
    commonDesc?: string,
    desc: string,
    image?: Image
}

type Image = {
    src: string,
    alt: string
}

export default function (props: Props) {
    const {index, problems} = props
    return (
        <MathProvider>
            <Stepper activeStep={index} sx={{margin: "2rem 0"}}>
                {problems.map((problem, i) => (
                    <Step key={problem.id} completed={i < index}>
                        <StepLabel>{""}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <ProblemView problem={problems[index]}/>
        </MathProvider>
    )
}

function ProblemView({problem}) {
    const image: Image | null = problem.image || null
    const commonDesc: string | null = problem.commonDesc || null
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