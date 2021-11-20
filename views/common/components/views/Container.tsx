import React from "react";
import {Container as MaterialContainer, Grid, Paper} from "@mui/material";

type Props = {
    height?: number,
    children: any,
    maxWidth?: MaxWidth
}
export type MaxWidth = "sm"

export default function Container(props: Props) {

    const {children, height, maxWidth} = props

    return (
        <Grid sx={{position: "absolute", height: "100%", width: "100%"}} container
              alignItems={"center"} justifyContent={"center"}>
            <MaterialContainer sx={{marginTop: "64px"}} fixed maxWidth={maxWidth || "xs"} disableGutters>
                <Paper elevation={3}>
                    <Grid sx={{padding: "32px", minHeight: height}} container
                          alignItems={"stretch"} direction={"column"}>
                        {children}
                    </Grid>
                </Paper>
            </MaterialContainer>
        </Grid>
    )
}