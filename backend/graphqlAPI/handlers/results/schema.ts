import {gql} from "apollo-server-lambda";

export const typeDefs = gql`
    type TestResult @key(fields: "testId") {
        msTimeStamp: String!
        userId: String!        
        percentage: Int!
        testId: ID!
        finishedTimeStamp: Int
    }
    type ProblemResult @key(fields: "problemId") {
        msTimeStamp: String!
        problemId: ID!
        userId: String!
        percentage: Int!
        msTestResultTimeStamp: String!
        answer: String!
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
    extend type Query {
        testResults(studentId: ID!): [TestResult!]!
        problemResults(studentId: ID!, msTestResultTimeStamp: String!): [ProblemResult!]!
        testResult(studentId: ID!, msTestResultTimeStamp: String!): TestResult!
    }
`