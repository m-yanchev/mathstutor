import React, {useState} from 'react';
import AppPage from "../../common/components/views/AppPage";
import {gql, useMutation, useQuery} from "@apollo/client";
import TestView from "./TestView";
import Test from "../../common/rules/Test";
import Progress from "../../common/components/views/Progress";
import RootDesc from "../../common/components/views/RootDesc";

const FINISHED_MESSAGE = 'Вы закончили выполнение контрольной работы'
const DATA_RETRIEVAL_ERROR_MESSAGE = 'Не получилось загрузить контрольную работу. Попробуйте повторить позже.'
const DATA_SENDING_ERROR_MESSAGE = 'Не получилось отправить результаты на сервер. Попробуйте повторить позже.'

type Props = {
    id: number
}

const query = gql`
    query Test($id: ID!) {
        test(id: $id) {
            id
            exercises {
                problem {
                    id
                    desc
                    answer
                }
            }
        }
    }
`

const mutation = gql`
    mutation WriteResult($testId: ID!, $msTestResultTimeStamp: String, $answer: String!, $problemId: String!) {
        writeResult(
            testId: $testId, 
            msTestResultTimeStamp: $msTestResultTimeStamp, 
            answer: $answer, 
            problemId: $problemId) {
            testResult {
                msTimeStamp
            }
        }
    }
`

export default function TestPage(props: Props) {

    const {id} = props
    const [problemIndex, setProblemIndex] = useState<number>(0)
    const dataState = useQuery(query, {variables: {id}})
    const [writeResult, resultMutationState] = useMutation(mutation)
    const test = dataState.data ? Test.create(dataState.data.test) : null
    const finish = test && problemIndex === test.exercises.length
    const msTestResultTimeStamp = resultMutationState.data ? resultMutationState.data.writeResult.testResult.msTimeStamp : null
    const testShowed = test && !finish
    const getMessage = () => {
        if (finish) return FINISHED_MESSAGE
        else if (dataState.error) return DATA_RETRIEVAL_ERROR_MESSAGE
        else if (resultMutationState.error) return DATA_SENDING_ERROR_MESSAGE
        else return null
    }

    const handleConfirmAnswer = value => {
        writeResult({
            variables: {
                testId: test.id,
                msTestResultTimeStamp,
                answer: value,
                problemId: test.exercises[problemIndex].problem.id
            }
        }).catch(e => console.error(e))
        setProblemIndex(problemIndex => ++problemIndex)
    }

    return (
        <AppPage header={"Контрольная работа"} height={256}>
            {dataState.loading || resultMutationState.loading ?
                <Progress/> : testShowed ?
                    <TestView test={test} problemIndex={problemIndex} onConfirmAnswer={handleConfirmAnswer}/> :
                    <RootDesc>{getMessage()}</RootDesc>}
        </AppPage>
    )
}