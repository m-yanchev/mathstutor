import React from 'react';
import {render} from "../../common/appRender";
import AppProvider from "../../common/components/smarts/AppProvider";
import Page from "./Page";
import {getIdParam} from "../../common/paramsGetter";

const app = <App/>
render(app)

function App() {
    return (
        <AppProvider>
            <Page id={getIdParam()}/>
        </AppProvider>
    )
}