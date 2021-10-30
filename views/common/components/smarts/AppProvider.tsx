import React, {ReactNode} from 'react';
import APIProvider from "./APIProvider";
import getTheme from "../../theme";
import {ThemeProvider, CssBaseline} from "@mui/material";

type Props = {
    children: ReactNode | ReactNode[]
}

export default function AppProvider(props: Props) {

    const {children} = props

    return (
        <APIProvider>
            <CssBaseline/>
            <ThemeProvider theme={getTheme()}>
                {children}
            </ThemeProvider>
        </APIProvider>
    )
}