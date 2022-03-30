import {ThemeProvider} from "@mui/material/styles";
import getTheme from "../../theme";
import React, {ReactNode} from "react";
import {CssBaseline} from "@mui/material";

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