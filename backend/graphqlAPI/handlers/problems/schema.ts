import {gql} from "apollo-server-lambda";

export const typeDefs = gql`    
    type Problem {
        id: ID!
        commonDesc: String
        desc: String!
        illus: Illus
        solution: Solution
        answer: String
    }
    type Solution {
        desc: String!
        illus: Illus
    }
    type Illus {
        name: String
    }
    extend type Exercise @key(fields: "problemId") {
        problemId: ID! @external
        problem: Problem!
    }
    extend type ProblemResult @key(fields: "problemId") {
        problemId: ID! @external
        problem: Problem!
    }
    extend type Lesson @key(fields: "exampleIdList") {
        exampleIdList: [ID!]! @external
        examples: [Problem!]!
    }
`