import {gql} from "apollo-server-lambda";

export const typeDefs = gql`
    type Test @key(fields: "id") {
        id: ID!
        msNotFinishedResultTimeStamp: String
        title: String!
        completedLength: Int!
        state: TestState!
        exercises: [Exercise!]!
    }
    type Exercise @key(fields: "problemId") {
        problemId: ID!
        withDetailedAnswer: Boolean
        maxEstimate: Int!
    }
    enum TestState {
        NEW
        NOT_FINISHED
        NOT_CHECKED
    }
    extend type Lesson @key(fields: "finalTestId") {
        finalTestId: ID @external
        finalTest: Test
    }
    extend type Query {
        test(id: ID!): Test
    }
    extend type TestResult @key(fields: "testId msTimeStamp userId") {
        testId: ID! @external
        msTimeStamp: String! @external
        userId: ID! @external
        test: Test
    }
`