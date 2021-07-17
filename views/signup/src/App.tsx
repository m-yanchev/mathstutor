import React from 'react';
import SignUp from "./SignUp";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://mathstutor.ru',
    cache: new InMemoryCache()
});

function App() {
    return (
        <ApolloProvider client={client}>
            <SignUp/>
        </ApolloProvider>
    )
}

export default App;
