import {gql} from "apollo-server-lambda";

export const typeDefs = gql`
    type TestResult @key(fields: "testId msTimeStamp userId"){
        msTimeStamp: String!
        userId: ID!        
        percentage: Int!
        testId: ID!
        finishedTimeStamp: Int
        problemResults: [ProblemResult!]!
    }
    type ProblemResult @key(fields: "problemId") {
        msTimeStamp: String!
        problemId: ID!
        exerciseIndex: Int!
        userId: ID!
        estimate: Int
        msTestResultTimeStamp: String!
        answer: String
    }
    type WriteResponse {
        testResult: TestResult,
        problemResult: ProblemResult
    }
    type UpdateResponse {
        success: Boolean!
    }
    extend type Test @key(fields: "id") {
        id: ID! @external
        results(studentId: ID): [TestResult!]
    }
    extend type Query {
        testResults(studentId: ID!): [TestResult!]!
        problemResults(studentId: ID, msTestResultTimeStamp: String!): [ProblemResult!]!
        testResult(studentId: ID, msTimeStamp: String!): TestResult!
    }
    extend type Mutation {
        writeResult(
            testId: ID!, msTestResultTimeStamp: String, answer: String, problemId: ID!, exerciseIndex: Int!
        ): WriteResponse!
        updateResult(studentId: ID!, msProblemResultTimeStamp: String!, estimate: Int!): UpdateResponse!
    }
`