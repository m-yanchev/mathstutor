import {gql} from "apollo-server-lambda";

export const typeDefs = gql`
    type Problem {
        id: ID!
        desc: String!
        answer: String
    }
    extend type Exercise @key(fields: "problemId") {
        problemId: ID! @external
        problem: Problem!
    }
`