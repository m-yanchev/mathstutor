import {gql} from "@apollo/client";

export const query = gql`
    query Students {
        students {
            id
            email
            name
        }
    }
`