import {gql} from "@apollo/client";

export const query = gql`
    query TestResults($studentId: ID!) {
        testResults(studentId: $studentId) {
            test {
                title
            }
            finishedTimeStamp
            msTimeStamp
            percentage
        }
        student(id: $studentId) {
            name
            email
        }
    }
`