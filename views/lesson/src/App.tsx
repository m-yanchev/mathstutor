import React from 'react';
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";
import {CssBaseline} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/core/styles";
import getTheme from "../../common/theme";
import AppBar from "../../common/components/views/AppBar";
import LessonView from "./Lesson";

type Props = {
    id: number
}

const link = createHttpLink({
    uri: process.env.NODE_ENV === "production" ?
        'https://api.mathstutor.ru/gateway' :
        'https://dev.mathstutor.ru/gateway',
    credentials: 'include'
})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link
})

function App(props: Props) {

    const {id} = props

    return (
        <ApolloProvider client={client}>
            <CssBaseline/>
            <ThemeProvider theme={getTheme()}>
                <AppBar profile={true}/>
                <LessonView id={id}/>
            </ThemeProvider>
        </ApolloProvider>
    )
}

export default App;
