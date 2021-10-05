import {gql} from "apollo-server-lambda";

export const typeDefs = gql`
    type TestResult {
        timeStamp: Int!
        percent: Int!
    }
    extend type Test @key(fields: "id") {
        id: ID! @external
        results: [TestResult!]!
    }
`