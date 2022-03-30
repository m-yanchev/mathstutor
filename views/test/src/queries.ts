import {gql} from "@apollo/client";

export const query = gql`
    query Test($id: ID!) {
        test(id: $id) {
            id
            title
            msNotFinishedResultTimeStamp
            completedLength
            exercises {
                problem {
                    id
                    commonDesc
                    desc
                    illus {
                        name
                    }
                }
                withDetailedAnswer
            }
        }
    }
`

export const mutation = gql`
    mutation WriteResult(
        $testId: ID!, $msTestResultTimeStamp: String, $answer: String, $problemId: ID!, $exerciseIndex: Int!
    ) {
        writeResult(
            testId: $testId,
            msTestResultTimeStamp: $msTestResultTimeStamp,
            answer: $answer,
            problemId: $problemId,
            exerciseIndex: $exerciseIndex
        ) {
            testResult {
                msTimeStamp
            }
        }
    }
`