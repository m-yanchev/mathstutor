import {gql} from "apollo-server-lambda";

export const typeDefs = gql`
    type Course @key(fields: "lessonIDList"){
        lessonIDList: [String!]!
        title: String!
    }    
    extend type Appointment @key(fields: "id") {
        id: ID! @external
        course: Course!
    }
`