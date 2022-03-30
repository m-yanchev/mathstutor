import React from 'react';
import {useQuery} from "@apollo/client";
import RootDesc from "../../common/components/views/RootDesc";
import {Lesson} from "./model";
import Progress from "../../common/components/views/Progress";
import View from "./View";
import AppPage from "../../common/components/views/AppPage";
import {query} from "./queries";

const DATA_RETRIEVAL_ERROR = 'Не получилось получить примеры. Попробуйте повторить позже.'

type Props = {
    lessonId: number
    onFail?: (error: Error) => void
}

export default function (props: Props) {

    const {lessonId, onFail} = props
    const dataState = useQuery(query, {variables: {lessonId}})
    const lesson = Lesson.create(dataState.data?.lesson)
    if (dataState.error) onFail(dataState.error)

    const handleBack = () => {
        window.history.back()
    }

    return (
        <AppPage height={256}
                 header={"Примеры к уроку:"}
                 title={lesson?.title}
                 containerProps={{maxWidth: "md"}}
                 headerProps={{onBack: handleBack}}
                 profile>
            {dataState.loading && <Progress/>}
            {lesson && <View examples={lesson.examples}/>}
            {dataState.error && <RootDesc>{DATA_RETRIEVAL_ERROR}</RootDesc>}
        </AppPage>
    )
}