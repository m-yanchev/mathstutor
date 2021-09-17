import React from 'react';
import DevPage from "./DevPage";
import {CssBaseline} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/core/styles";
import getTheme from "../../common/theme";

function App() {

    return (
        <>
            <CssBaseline/>
            <ThemeProvider theme={getTheme()}>
                <DevPage/>
            </ThemeProvider>
        </>
    )
}

export default App;
