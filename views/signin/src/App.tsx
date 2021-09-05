import React from 'react';
import SignIn from "./SignIn";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {CssBaseline} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/core/styles";
import getTheme from "../../common/theme";

const client = new ApolloClient({
    uri: 'https://api.mathstutor.ru/gateway',
    cache: new InMemoryCache()
});

function App({id}) {

    return (
        <ApolloProvider client={client}>
            <CssBaseline/>
            <ThemeProvider theme={getTheme()}>
                <SignIn id={id}/>
            </ThemeProvider>
        </ApolloProvider>
    )
}

export default App;
