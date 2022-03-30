import {gql} from "@apollo/client";

export const query = gql`
    query Lesson($id: ID!, $studentId: ID) {
        lesson(id: $id) {
            id
            title
            isExamples
            finalTest {
                id
                state
                results(studentId: $studentId) {
                    msTimeStamp
                    finishedTimeStamp
                    percentage
                }
            }
        }
    }
`