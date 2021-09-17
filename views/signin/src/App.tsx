import React from 'react';
import SignIn from "./SignIn";
import {CssBaseline} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/core/styles";
import getTheme from "../../common/theme";

function App({id}) {

    return (
        <>
            <CssBaseline/>
            <ThemeProvider theme={getTheme()}>
                <SignIn id={id}/>
            </ThemeProvider>
        </>
    )
}

export default App;
