import React from 'react';
import LandingPage from "./LandingPage";
import getTheme from "../../common/theme";
import {ThemeProvider, CssBaseline} from "@mui/material";

function App() {

    return (
        <>
            <CssBaseline/>
            <ThemeProvider theme={getTheme()}>
                <LandingPage/>
            </ThemeProvider>
        </>
    )
}

export default App;
