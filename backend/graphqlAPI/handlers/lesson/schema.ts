import {gql} from "apollo-server-lambda";

export const typeDefs = gql`
    type Lesson @key(fields: "finalTestId") {
        id: ID!
        title: String!
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