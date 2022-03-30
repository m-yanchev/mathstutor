import React from 'react';
import {useQuery} from "@apollo/client";
import AppPage from "../../common/components/views/AppPage";
import Progress from "../../common/components/views/Progress";
import RootDesc from "../../common/components/views/RootDesc";
import {query} from "./queries";
import View from "./View";
import {Student} from "./model";

const DATA_RETRIEVAL_ERROR_MESSAGE = 'Не получилось загрузить Назначение ученика. Попробуйте повторить позже.'

type Props = {
    id: string
    onFail?: (error: Error) => void
}

export default function (props: Props) {

    const {id, onFail} = props
    const dataState = useQuery(query, {variables: {id}})
    const student = Student.create(dataState.data?.student)
    if (dataState.error && onFail) onFail(dataState.error)

    const handleBack = () => {
        window.history.back()
    }

    return (
        <AppPage header={"Назначение для ученика"}
                 title={student && `${student.name} (${student.email})`}
                 containerProps={{maxWidth: "sm"}}
                 headerProps={{onBack: handleBack}}
                 profile>
            {dataState.loading ?
                <Progress/> :
                student ?
                    <View profile={student}/> :
                    <RootDesc>{DATA_RETRIEVAL_ERROR_MESSAGE}</RootDesc>
            }
        </AppPage>
    )
}