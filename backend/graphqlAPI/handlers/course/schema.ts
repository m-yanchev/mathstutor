import {gql} from "apollo-server-lambda";

export const typeDefs = gql`
    type Course {
        lessonTitles: [String!]!
        title: String!
    }    
    extend type Appointment @key(fields: "courseTitle") {
        courseTitle: String! @external
        course: Course!
    }
`