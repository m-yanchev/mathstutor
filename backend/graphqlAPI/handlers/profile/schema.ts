import {gql} from "apollo-server-lambda";

export const typeDefs = gql`
    type Query {
        profile: Profile
    }
    type Profile @key(fields: "appointmentId"){
        appointmentId: ID
        name: String!
        email: String!
        emailConfirmed: Boolean
    }
    type Mutation {
        updateProfile(name: String!): ProfileResult!
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