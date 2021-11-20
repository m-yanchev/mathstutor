import {gql} from "apollo-server-lambda";

export const typeDefs = gql`
    type Problem {
        id: ID!
        commonDesc: String
        desc: String!
        imageAlt: String
        answer: String
    }
    extend type Exercise @key(fields: "problemId") {
        problemId: ID! @external
        problem: Problem!
    }
    extend type ProblemResult @key(fields: "problemId") {
        problemId: ID! @external
        problem: Problem!
    }
`