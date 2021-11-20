import React, {useState} from 'react';
import AppPage from "../../common/components/views/AppPage";
import Progress from "../../common/components/views/Progress";
import RootDesc from "../../common/components/views/RootDesc";
import View from "./View";
import {useMutation} from "@apollo/client";
import {mutation} from "./queries";

const FAIL_MESSAGE = 'Не получилось обновить пароль. Попробуйте повторить позже.'
const SUCCESS_MESSAGE = 'Пароль успешно обновлён'

type Props = {
    onFail?: (error: Error) => void
}

export default function (props: Props) {

    const {onFail} = props
    const [password, setPassword] = useState<string | null>(null)
    const [state, setState] = useState<"input" | "write" | "final">("input")
    const [write, mutationState] = useMutation(mutation)
    const message = mutationState.data?.updatePassword?.ok ? SUCCESS_MESSAGE : FAIL_MESSAGE

    const handleChange = password => {
        setPassword(password)
    }

    const handleConfirm = () => {
        if (password) {
            setState("write")
            write({variables: {password}}).catch(e => onFail(e)).finally(() => setState("final"))
        }
    }

    return (
        <AppPage header={"Обновление пароля"} profile={true}>
            {mutationState.loading && <Progress/>}
            {state === "final" ?
                <RootDesc>{message}</RootDesc> :
                <View onChange={handleChange} onConfirm={handleConfirm} disable={state === "write"}/>
            }
        </AppPage>
    )
}