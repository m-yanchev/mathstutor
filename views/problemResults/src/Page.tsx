import React, {useState} from 'react';
import {useQuery} from "@apollo/client";
import AppPage from "../../common/components/views/AppPage";
import Progress from "../../common/components/views/Progress";
import RootDesc from "../../common/components/views/RootDesc";
import {query} from "./queries";
import View from "./View";
import {ProblemResults, TestResult} from "./model";
import {Person} from "../../common/rules/Profile";

const DATA_RETRIEVAL_ERROR_MESSAGE = 'Не получилось загрузить результаты. Попробуйте повторить позже.'

type Props = {
    studentId: string
    testResultTimeStamp: string
    onFail?: (error: Error) => void
}

export default function (props: Props) {

    const {studentId, testResultTimeStamp, onFail} = props
    const dataState = useQuery(query, {variables: {studentId, testResultTimeStamp}})
    const [index, setIndex] = useState<number>(0)
    const problemResults = ProblemResults.create(dataState.data?.problemResults)
    const person = Person.create(dataState.data?.profile)
    const testResult = TestResult.create(dataState.data?.testResult)
    const appTitle = person && testResult ?
        `ученика ${person.name} (${person.email}) по работе ${testResult.test.title}` :
        null
    if (dataState.error) onFail(dataState.error)

    const onNext = () => {
        setIndex(index => ++index)
    }

    const onFinish = () => {
        location.assign(`/form/test-results?studentId=${studentId}`)
    }

    return (
        <AppPage header={"Результаты"} title={appTitle} containerProps={{maxWidth: "sm"}} profile>
            {dataState.loading ?
                <Progress/> :
                problemResults ?
                    problemResults.length ?
                        <View problemResults={problemResults} index={index} onNext={onNext} onFinish={onFinish}/> :
                        <RootDesc>Список результатов пуст</RootDesc> :
                    <RootDesc>{DATA_RETRIEVAL_ERROR_MESSAGE}</RootDesc>
            }
        </AppPage>
    )
}