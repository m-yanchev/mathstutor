import {gql} from "apollo-server-lambda";

export const typeDefs = gql`
    type Course @key(fields: "lessonIdList") {
        id: ID!
        lessonIdList: [ID!]!
        title: String!
    }    
    extend type Appointment @key(fields: "courseId") {
        courseId: ID! @external
        course: Course!
    }
`