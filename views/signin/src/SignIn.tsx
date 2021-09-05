import React, {useEffect, useState} from "react";
import AppBar from "../../common/components/views/AppBar";
import Container from "../../common/components/views/Container";
import Progress from "../../common/components/views/Progress";
import SignInDialog from "./SignInDialog";

type Props = {
    id?: string
}

type SignInState = {
    loading: boolean,
    error: SignInError | null,
    signedIn: boolean
}

type SignInError = "EMAIL_ALREADY_CONFIRMED" | "FATAL_ERROR"

type Result = {
    ok: boolean,
    error?: string
}

const EMAIL_ALREADY_CONFIRMED_MESSAGE = "Электронный адрес был ранее уже подтвержден, поэтому в целях безопасности эта ссылка больше не принимается системой. Пожалуйста, воспользуйтесь формой входа на сайт."
const FATAL_ERROR_MESSAGE = "По неизвестной причине не получилось выполнить вход на сайте. Попробуйте повторить позже."
const SUCCESSFUL_MESSAGE = "Вход в систему успешно выполнен."

export default function SignIn(props: Props) {

    const {id} = props

    const signInState = useSignIn(id)


    const message = signInState.signedIn ? SUCCESSFUL_MESSAGE
        : signInState.error === "EMAIL_ALREADY_CONFIRMED" ? EMAIL_ALREADY_CONFIRMED_MESSAGE
            : signInState.error === "FATAL_ERROR" ? FATAL_ERROR_MESSAGE : null

    return (
        <>
            {signInState.loading && <Progress/>}
            <AppBar profile={signInState.signedIn}/>
            <Container height={256}>
                <SignInDialog>{message}</SignInDialog>
            </Container>
        </>
    )
}

function useSignIn(id: string): SignInState {
    const [loading, setLoading] = useState<boolean>(Boolean(id))
    const [error, setError] = useState<SignInError | null>(null)
    const [signedIn, setSignedIn] = useState<boolean>(false)

    useEffect(() => {
        if (id) signIn(id).then(() => {
            setLoading(false)
            setSignedIn(true)
            setError(null)
        }).catch(error => {
            setLoading(false)
            setSignedIn(false)
            setError(error)
        })
    }, [id])

    return {loading, error, signedIn}
}

async function signIn(id: string): Promise<void> {
    try {
        const response = await fetch("/api/sign-in", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        })
        resultHandler(await response.json())
    } catch (error) {
        throw error === "EMAIL_ALREADY_CONFIRMED" ? "EMAIL_ALREADY_CONFIRMED" : "FATAL_ERROR"
    }
}

function resultHandler(result: Result): void {
    if (result.ok) return
    throw result.error
}

