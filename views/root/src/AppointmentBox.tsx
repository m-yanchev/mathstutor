import React from "react";
import {Box, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {
    },
    messageBox: {
        marginBottom: "1rem"
    }
}))

export default function AppointmentBox({messages}) {

    const classes = useStyles()

    const MessageBox = ({children}) =>
        <Box className={classes.messageBox}>
            <Typography>{children}</Typography>
        </Box>

    return (
        <Box className={classes.root}>
            {messages.map((Message, i) => Message && <MessageBox key={i}><Message/></MessageBox>)}
        </Box>
    )
}