import {ApolloServer, gql} from "apollo-server-lambda";

/*const typeDefs = gql`
    type Mutation {
        signUp(userName: String!, email: String!, password: String!): SignUpResult!
    }
    type SignUpResult {
        result: Result!
    }
    type Result {
        error: Error!
    }
    type Error {
        name: String!
    }
`*/

const typeDefs = gql`
    type Query {
        signUp: Boolean!
    }
`

const resolvers = {
    /* Mutation: {
         signUp
     }*/
    Query: {
        signUp: () => true
    }
}

/*const result = {
    statusCode: 200
}*/

const server = new ApolloServer({typeDefs, resolvers})
export const handler = server.createHandler()

/*
function signUp(_, vars) {
    const {userName, email, password} = vars
    return /!*{result: {error: {name: "foot"}}}*!/ true
}*/
