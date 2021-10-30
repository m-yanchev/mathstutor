import React from 'react';
import {gql, useQuery} from "@apollo/client";
import RootDesc from "../../common/components/views/RootDesc";
import Lesson from "../../common/rules/Lesson";
import Progress from "../../common/components/views/Progress";
import LessonView from "./LessonView";
import AppPage from "../../common/components/views/AppPage";

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
                    msTimeStamp
                    percentage
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
        <AppPage height={256} header={"Урок:"} title={lesson?.title}>
            {dataState.loading && <Progress/>}
            {lesson && <LessonView lesson={lesson}/>}
            {dataState.error && <RootDesc>{DATA_RETRIEVAL_ERROR}</RootDesc>}
        </AppPage>
    )
}