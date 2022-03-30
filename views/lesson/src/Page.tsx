import React from 'react';
import {useQuery} from "@apollo/client";
import RootDesc from "../../common/components/views/RootDesc";
import {Lesson} from "./model";
import Progress from "../../common/components/views/Progress";
import View from "./View";
import AppPage from "../../common/components/views/AppPage";
import {query} from "./queries";

const DATA_RETRIEVAL_ERROR = 'Не получилось получить данные об уроке. Попробуйте повторить позже.'

type Props = {
    id: number
    studentId: string | void
    onFail?: (error: Error) => void
}

export default function (props: Props) {

    const {id, studentId, onFail} = props
    const dataState = useQuery(query, {variables: {id, studentId}})
    const lesson = dataState.data ? Lesson.create(dataState.data.lesson) : null
    if (onFail && dataState.error) onFail(dataState.error)

    const handleBack = () => {
        window.history.back()
    }

    return (
        <AppPage height={256}
                 header={"Урок:"}
                 title={lesson?.title}
                 containerProps={{maxWidth: "sm"}}
                 headerProps={{onBack: handleBack}}
                 profile>
            {dataState.loading && <Progress/>}
            {lesson && <View lesson={lesson} studentId={studentId}/>}
            {dataState.error && <RootDesc>{DATA_RETRIEVAL_ERROR}</RootDesc>}
        </AppPage>
    )
}