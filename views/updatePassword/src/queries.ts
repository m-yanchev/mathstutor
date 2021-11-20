import {gql} from "@apollo/client";

export const mutation = gql`
    mutation UpdatePassword($password: String!) {
        updatePassword(password: $password) {
            ok
        }
    } 
`