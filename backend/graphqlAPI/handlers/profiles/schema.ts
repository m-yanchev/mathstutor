import {gql} from "apollo-server-lambda";

export const typeDefs = gql`
    type Query {
        student(id: ID): Profile!
        profile: Profile
        students: [Profile!]!
    }
    type Profile @key(fields: "appointmentId") {
        id: ID!
        appointmentId: ID
        name: String!
        email: String!
        emailConfirmed: Boolean
        access: Access
    }
    enum Access {
        student
        tutor
    }
    type Mutation {
        updateProfile(name: String!): ProfileResult!
        updatePassword(password: String!): ProfileResult!
        signUp(name: String!, email: String!, password: String!): ProfileResult!
    }
    type ProfileResult {
        ok: Boolean!
        error: ProfileError
    }
    enum ProfileError {
        email_already_exists
    }
`