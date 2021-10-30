import {gql} from "apollo-server-lambda";

export const typeDefs = gql`
    type TestResult {
        msTimeStamp: String!
        userId: String!        
        percentage: Int!
        testId: Int!
        finishedTimeStamp: Int
    }
    type ProblemResult {
        msTimeStamp: String!
        userId: String!
        percentage: Int!
        msTestResultTimeStamp: String!
    }
    type WriteResultResponse {
        testResult: TestResult,
        problemResult: ProblemResult
    }
    extend type Test @key(fields: "id") {
        id: ID! @external
        results: [TestResult!]!
    }
    extend type Mutation {
        writeResult(testId: ID!, msTestResultTimeStamp: String, answer: String!, problemId: String!): WriteResultResponse!
    }
`