import React, {ReactNode} from 'react';
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";

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

type Props = {
    children: ReactNode | ReactNode[]
}

export default function APIProvider(props: Props) {

    const {children} = props

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}