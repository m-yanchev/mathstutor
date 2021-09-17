import React from "react";
import {Container as MaterialContainer, Grid, makeStyles, Paper} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        position: "absolute",
        height: "100%",
        width: "100%"
    },
    container: {
        marginTop: 40
    },
    paper: {
        padding: 32
    }
})

type Props = {
    height?: number,
    children: any
}

export default function Container({children, height}: Props) {

    const classes = useStyles()

    return (
        <Grid className={classes.root} container alignItems={"center"} justifyContent={"center"}>
            <MaterialContainer className={classes.container} fixed maxWidth={"xs"} disableGutters>
                <Paper elevation={3}>
                    <Grid className={classes.paper} container alignItems={"stretch"}
                          style={{minHeight: height}}>
                        {children}
                    </Grid>
                </Paper>
            </MaterialContainer>
        </Grid>
    )
}