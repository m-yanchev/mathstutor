import {gql} from "@apollo/client";

export const query = gql`
    query Examples($lessonId: ID!) {
        lesson(id: $lessonId) {
            examples {
                id
                commonDesc
                desc
                illus {
                    name
                }
                solution {
                    desc
                    illus {
                        name
                    }
                }
                answer
            }            
        }
    }
`