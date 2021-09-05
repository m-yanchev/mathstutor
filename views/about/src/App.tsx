import React from 'react';
import LandingPage from "./LandingPage";
import {ThemeProvider} from "@material-ui/core/styles";
import getTheme from "../../common/theme";
import {CssBaseline} from "@material-ui/core";

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
