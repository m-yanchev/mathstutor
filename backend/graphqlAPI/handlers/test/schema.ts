import {gql} from "apollo-server-lambda";

export const typeDefs = gql`
    type Test @key(fields: "id"){
        id: ID!
    }
    extend type Lesson @key(fields: "finalTestId"){
        finalTestId: ID @external
        finalTest: Test
    }
`