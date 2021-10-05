import React from 'react';
import {gql, useQuery} from "@apollo/client";
import Container from "../../common/components/views/Container";
import RootDesc from "../../common/components/views/RootDesc";
import Lesson from "../../common/rules/Lesson";
import Progress from "../../common/components/views/Progress";
import LessonView from "./LessonView";

const DATA_RETRIEVAL_ERROR = 'Не получилось получить данные об уроке. Попробуйте повторить позже.'

type Props = {
    id: number
}

const query = gql`
    query Lesson($id: ID!) {
        lesson(id: $id) {
            title
            finalTest {
                id
                results {
                    timeStamp
                    percent
                }
            }            
        }
    }
`

export default function LessonPage(props: Props) {

    const {id} = props
    const dataState = useQuery(query, {variables: {id}})
    const lesson = dataState.data ? Lesson.create(dataState.data.lesson) : null

    return (
        <Container height={256}>
            {dataState.loading && <Progress/>}
            {lesson && <LessonView lesson={lesson}/>}
            {dataState.error && <RootDesc>{DATA_RETRIEVAL_ERROR}</RootDesc>}
        </Container>
    )
}