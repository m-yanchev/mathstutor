import React from 'react';
import LessonView from "./Lesson";
import AppProvider from "../../common/components/smarts/AppProvider";

type Props = {
    id: number
}

function App(props: Props) {

    const {id} = props

    return (
        <AppProvider>
            <LessonView id={id}/>
        </AppProvider>
    )
}

export default App;
