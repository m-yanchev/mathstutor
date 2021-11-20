import {gql} from "@apollo/client";

export const query = gql`
    query TestResults($studentId: ID!) {
        testResults(studentId: $studentId) {
            test {
                title
            }
            msTimeStamp
            percentage
        }
        profile(id: $studentId) {
            name
            email
        }
    }
`