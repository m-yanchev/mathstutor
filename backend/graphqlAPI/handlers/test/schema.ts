import {gql} from "apollo-server-lambda";

export const typeDefs = gql`
    type Test @key(fields: "id") {
        id: ID!
        exercises: [Exercise!]!
    }
    type Exercise @key(fields: "problemId") {
        problemId: ID!
        withDetailedAnswer: Boolean
    }
    extend type Lesson @key(fields: "finalTestId"){
        finalTestId: ID @external
        finalTest: Test
    }
    extend type Query {
        test(id: ID!): Test
    }
`