import React from 'react';
import SignUp from "./SignUp";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {CssBaseline} from "@material-ui/core";

const client = new ApolloClient({
    uri: 'https://api.mathstutor.ru/gateway',
    cache: new InMemoryCache()
});

function App() {
    return (
        <ApolloProvider client={client}>
            <CssBaseline/>
            <SignUp/>
        </ApolloProvider>
    )
}

export default App;
