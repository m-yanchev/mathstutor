import {gql} from "apollo-server-lambda";

export const typeDefs = gql`
    type Lesson {
        title: String!
    }
    extend type Course @key(fields: "lessonIDList"){
        lessonIDList: [String!]! @external
        lessons: [Lesson!]!
    }
`