import {gql} from "@apollo/client";

export const query = gql`
    query Student($id: ID!) {
        student(id: $id) {
            id
            name
            email
            appointment {
                startTimeStamp
                weekDays {
                    number
                    hour
                    minute
                    duration
                }
                vacations {
                    startTimeStamp
                    finishTimeStamp
                }
                course {
                    title
                    lessons {
                        id
                        title
                    }
                }
            }
        }
    }
`