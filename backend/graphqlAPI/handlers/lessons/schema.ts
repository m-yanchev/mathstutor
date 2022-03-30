import {gql} from "apollo-server-lambda";

export const typeDefs = gql`    
    type Lesson @key(fields: "finalTestId") @key(fields: "exampleIdList") {
        id: ID!
        title: String!
        isExamples: Boolean!
        exampleIdList: [ID!]!
        finalTestId: ID
    }
    extend type Query {
        lesson(id: ID!): Lesson
    }
    extend type Course @key(fields: "lessonIdList") {
        lessonIdList: [ID!]! @external
        lessons: [Lesson!]!
    }
`