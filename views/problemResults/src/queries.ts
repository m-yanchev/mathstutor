import {gql} from "@apollo/client";

export const query = gql`
    query ProblemResults($studentId: ID, $testResultTimeStamp: String!) {
        profile {
            access
        }
        student(id: $studentId) {
            name
            email
        }
        testResult(studentId: $studentId, msTimeStamp: $testResultTimeStamp) {
            msTimeStamp
            test {
                title
                exercises {
                    maxEstimate
                    withDetailedAnswer
                    problem {
                        id
                        commonDesc
                        desc
                        solution {
                            desc
                            illus {
                                name
                            }
                        }
                        illus {
                            name
                        }
                        answer
                    }
                }
            }
            problemResults {
                msTimeStamp
                estimate
                answer
            }
        }
    }
`

export const mutation = gql`
    mutation UpdateResult($studentId: ID!, $msProblemResultTimeStamp: ID!, $estimate: Int!) {
        updateResult(studentId: $studentId, msProblemResultTimeStamp: $msProblemResultTimeStamp, estimate: $estimate) {
            success
        }
    }   
`