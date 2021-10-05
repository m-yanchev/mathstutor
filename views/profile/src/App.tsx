import React from 'react';
import Profile from "./Profile";
import {CssBaseline} from "@material-ui/core";
import APIProvider from "../../common/components/smarts/APIProvider";

function App() {

    return (
        <APIProvider>
            <CssBaseline/>
            <Profile/>
        </APIProvider>
    )
}

export default App;
