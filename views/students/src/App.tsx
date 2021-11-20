import React from 'react';
import AppProvider from "../../common/components/smarts/AppProvider";
import StudentsPage from "./StudentsPage";

export default function App() {
    return (
        <AppProvider>
            <StudentsPage/>
        </AppProvider>
    )
}