import React, {useState} from 'react';
import {useMutation, useQuery} from "@apollo/client";
import AppPage from "../../common/components/views/AppPage";
import Progress from "../../common/components/views/Progress";
import RootDesc from "../../common/components/views/RootDesc";
import {mutation, query} from "./queries";
import View from "./View";
import {TestResult, User} from "./model";
import {Person} from "../../common/rules/Profile";

const DATA_RETRIEVAL_ERROR_MESSAGE = 'Не получилось загрузить результаты. Попробуйте повторить позже.'

type Props = {
    studentId: string | void
    testResultTimeStamp: string
    onFail?: (error: Error) => void
}

type ExitEvent = "next" | "finish" | "back"

export default function (props: Props) {

    const {studentId, testResultTimeStamp, onFail} = props

    const dataState = useQuery(query, {variables: {studentId, testResultTimeStamp}})
    const [writeEstimate, mutationState] = useMutation(mutation)

    const [index, setIndex] = useState<number>(0)

    const student = Person.create(dataState.data?.student)
    const user = User.create(dataState.data?.profile)
    const testResult = TestResult.create(dataState.data?.testResult)

    const appTitle = student && testResult ?
        `ученика ${student.name} (${student.email}) по работе ${testResult.test.title}` :
        null

    if (onFail && (dataState.error || mutationState.error)) onFail(dataState.error)

    let estimate: number | null = 0

    const handleChange = (value: string | null) => {
        estimate = value === null ? null : Number(value)
    }

    const writeEstimateToServer = () => {
        if (testResult.exercises[index].withDetailedAnswer)
            writeEstimate({
                variables: {
                    studentId,
                    msProblemResultTimeStamp: testResult.problemResults[index].msTimeStamp,
                    estimate
                }
            }).catch(e => onFail(e))
    }

    const handleExit = (event: ExitEvent) => () => {
        const exercise = testResult.exercises[index]
        if (user.role === "tutor" && event !== "back" && exercise.withDetailedAnswer && exercise.validate(estimate)) {
            writeEstimateToServer()
        }
        if (!exercise.withDetailedAnswer || exercise.validate(estimate)) {
            if (event === "next") {
                setIndex(index => ++index)
            }
            if (event === "finish") {
                window.history.back()
            }
        }
        if (event === "back") {
            window.history.back()
        }
    }

    return (
        <AppPage header={"Результаты"}
                 title={appTitle}
                 containerProps={{maxWidth: "sm"}}
                 headerProps={{onBack: handleExit("back")}}
                 profile>
            {dataState.loading ?
                <Progress/> :
                testResult ?
                    testResult.problemResults.length ?
                        <View testResult={testResult}
                              index={index}
                              role={user.role}
                              onNext={handleExit("next")}
                              onFinish={handleExit("finish")}
                              onChange={handleChange}/> :
                        <RootDesc>Список результатов пуст</RootDesc> :
                    <RootDesc>{DATA_RETRIEVAL_ERROR_MESSAGE}</RootDesc>
            }
        </AppPage>
    )
}