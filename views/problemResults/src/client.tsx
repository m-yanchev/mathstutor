import React from 'react';
import {render} from "../../common/appRender";
import AppProvider from "../../common/components/smarts/AppProvider";
import Page from "./Page";
import {getParam} from "../../common/paramsGetter";

const app = <App/>
render(app)

function App() {
    return (
        <AppProvider>
            <Page studentId={getParam("studentId")} testResultTimeStamp={getParam("testResultTimeStamp")}/>
        </AppProvider>
    )
}