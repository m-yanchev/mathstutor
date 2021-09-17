import {gql} from "apollo-server-lambda";

export const typeDefs = gql`
    extend type Profile @key(fields: "id"){
        id: ID! @external
        appointment: Appointment
    }    
    type Appointment @key(fields: "courseTitle"){
        id: ID!
        startTimeStamp: Int!
        weekDays: [WeekDay!]!
        courseTitle: String!
        vacations: [Vacations!]
    }    
    type WeekDay {
        number: Int!
        hour: Int!
        minute: Int!
        duration: Int
    }
    type Vacations {
        startTimeStamp: Int!
        finishTimeStamp: Int!
    }
`