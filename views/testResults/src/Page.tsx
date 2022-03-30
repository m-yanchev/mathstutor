import React from 'react';
import {useQuery} from "@apollo/client";
import AppPage from "../../common/components/views/AppPage";
import Progress from "../../common/components/views/Progress";
import RootDesc from "../../common/components/views/RootDesc";
import {query} from "./queries";
import {TestResult, Student} from "./model";
import View from "./View";

const DATA_RETRIEVAL_ERROR_MESSAGE = 'Не получилось загрузить результаты. Попробуйте повторить позже.'

type Props = {
    studentId: string
}

export default function (props: Props) {

    const {studentId} = props

    const dataState = useQuery(query, {variables: {studentId}})
    const testResults = TestResult.createList(dataState.data?.testResults)
    const profile = Student.create(dataState.data?.student)
    if (dataState.error) console.error(dataState.error)

    return (
        <AppPage header={"Результаты ученика:"} title={profile && `${profile.name} (${profile.email})`}
                 containerProps={{maxWidth: "sm"}} profile>
            {dataState.loading ?
                <Progress/> :
                testResults ?
                    <View testResults={testResults} studentId={studentId}/> :
                    <RootDesc>{DATA_RETRIEVAL_ERROR_MESSAGE}</RootDesc>
            }
        </AppPage>
    )
}