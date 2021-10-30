import React from 'react';
import AppProvider from "../../common/components/smarts/AppProvider";
import TestPage from "./TestPage";

type Props = {
    id: number
}

function App(props: Props) {

    const {id} = props

    return (
        <AppProvider>
            <TestPage id={id}/>
        </AppProvider>
    )
}

export default App;
