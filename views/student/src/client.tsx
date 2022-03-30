import React from 'react';
import {getIdStringParam} from "../../common/paramsGetter";
import {render} from "../../common/appRender";
import AppProvider from "../../common/components/smarts/AppProvider";
import Page from "./Page";

const app = <App/>
render(app)

function App() {
    return (
        <AppProvider>
            <Page id={getIdStringParam()}/>
        </AppProvider>
    )
}