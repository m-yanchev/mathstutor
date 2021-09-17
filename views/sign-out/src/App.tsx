import React from 'react';
import SignOut from "./SignOut";
import {CssBaseline} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/core/styles";
import getTheme from "../../common/theme";

function App() {

    return (
        <>
            <CssBaseline/>
            <ThemeProvider theme={getTheme()}>
                <SignOut/>
            </ThemeProvider>
        </>
    )
}

export default App;
