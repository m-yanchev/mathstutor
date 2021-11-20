import {CssBaseline, ThemeProvider} from "@mui/material";
import getTheme from "../../theme";
import React, {ReactNode} from "react";

type Props = {
    children: ReactNode | ReactNode[]
}

export default function StyledProvider(props: Props) {

    const {children} = props

    return (
        <>
            <CssBaseline/>
            <ThemeProvider theme={getTheme()}>
                {children}
            </ThemeProvider>
        </>
    )
}