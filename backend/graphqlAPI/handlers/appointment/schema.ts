import {gql} from "apollo-server-lambda";

export const typeDefs = gql`
    extend type Profile @key(fields: "appointmentId"){
        appointmentId: ID @external
        appointment: Appointment
    }    
    type Appointment @key(fields: "courseId"){
        id: ID!
        startTimeStamp: Int!
        weekDays: [WeekDay!]!
        courseId: ID!
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