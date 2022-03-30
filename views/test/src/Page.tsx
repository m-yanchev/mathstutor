import React, {useState} from 'react';
import AppPage from "../../common/components/views/AppPage";
import {useMutation, useQuery} from "@apollo/client";
import View from "./View";
import Progress from "../../common/components/views/Progress";
import RootDesc from "../../common/components/views/RootDesc";
import {mutation, query} from "./queries";
import {MutationResponse, Test} from "./model";
import {EventName} from "../../../backend/graphqlAPI/handlers/results/results";

const DATA_RETRIEVAL_ERROR_MESSAGE = 'Не получилось загрузить контрольную работу. Попробуйте повторить позже.'
const DATA_SENDING_ERROR_MESSAGE = 'Не получилось отправить результаты на сервер. Попробуйте повторить позже.'

interface Props {
    id: number
    onFail?: (error: Error) => void
}

interface State {
    handleBack: () => void
    loading: boolean
    test: Test
    index: number
    completedLength: number
    handleConfirmAnswer: (value: string) => void
    handleClick: (event: EventName) => void
    message: string | null
}

export default function Page(props: Props) {

    const {
        handleBack,
        loading,
        test,
        index,
        completedLength,
        handleConfirmAnswer,
        handleClick,
        message
    } = usePageState(props)
    console.log("index = %o", index)
    return (
        <AppPage header={"Контрольная работа"}
                 height={256}
                 containerProps={{maxWidth: "sm"}}
                 headerProps={{onBack: handleBack}}
                 profile>
            {loading && <Progress/>}
            {test ?
                <View length={test.exercises.length}
                      index={index}
                      completedLength={completedLength}
                      exercise={test.getExercise(index)}
                      onConfirmAnswer={handleConfirmAnswer} onClick={handleClick}/> :
                <RootDesc>{message}</RootDesc>
            }
        </AppPage>
    )
}

function usePageState(props: Props): State {

    const {id, onFail} = props

    const [problemIndex, setProblemIndex] = useState<number>(0)
    const [completedLength, setCompletedLength] = useState<number | null>(null)
    const [finished, setFinished] = useState<boolean>(false)

    const dataState = useQuery(query, {variables: {id}})
    const [writeResult, mutationState] = useMutation(mutation)

    const handleBack = () => {
        window.history.back()
    }

    if (finished && !mutationState.loading) handleBack()
    if (onFail && (dataState.error || mutationState.error)) onFail(dataState.error)

    const test = Test.create(dataState.data?.test)
    if (completedLength === null && test) {
        setCompletedLength(test.completedLength)
        setProblemIndex(test.completedLength)
    }
    const response = MutationResponse.create(mutationState.data?.writeResult)

    const getMessage = () => {
        if (dataState.error) return DATA_RETRIEVAL_ERROR_MESSAGE
        else if (mutationState.error) return DATA_SENDING_ERROR_MESSAGE
        else return null
    }

    const handleConfirmAnswer = value => {
        writeResult({
            variables: {
                testId: test.id,
                msTestResultTimeStamp: test.msNotFinishedResultTimeStamp || response?.testResult.msTimeStamp,
                answer: value,
                problemId: test.exercises[problemIndex].problem.id,
                exerciseIndex: problemIndex
            }
        }).catch(e => console.error(e))
        setCompletedLength(completedLength => ++completedLength)
    }

    const handleClick = (event: EventName) => {
        switch (event) {
            case "NEXT":
                if (problemIndex === test.exercises.length - 1 && onFail) onFail(new RangeError("Индекс равен длине"))
                setProblemIndex(problemIndex => ++problemIndex)
                break
            case "PREV":
                if (problemIndex === 0 && onFail) onFail(new RangeError("Индекс меньше нуля"))
                setProblemIndex(problemIndex => --problemIndex)
                break
            case "CONFIRM":
                setFinished(true)
        }
    }

    return {
        handleBack,
        loading: dataState.loading || mutationState.loading,
        test,
        index: problemIndex,
        completedLength,
        handleConfirmAnswer,
        handleClick,
        message: getMessage()
    }
}