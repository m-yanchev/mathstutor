import {gql} from "@apollo/client";

export const query = gql`
    query ProblemResults($studentId: ID!, $testResultTimeStamp: String!) {
        problemResults(studentId: $studentId, msTestResultTimeStamp: $testResultTimeStamp) {
            problem {
                id
                commonDesc
                desc
                imageAlt
                answer
            }
            answer
        }
        profile(id: $studentId) {
            name
            email
        }
        testResult(studentId: $studentId, msTestResultTimeStamp: $testResultTimeStamp) {
            test {
                title
            }
        }
    }
`