import React, {useEffect, useState} from "react";
import AppBar from "../../common/components/views/AppBar";
import Container from "../../common/components/views/Container";
import Progress from "../../common/components/views/Progress";
import SignInDialog from "./SignInDialog";
import MainBox from "../../common/components/views/MainBox";
import RootDesc from "../../common/components/views/RootDesc";
import {ErrorSnackbar} from "../../common/components/views/ErrorSnackbar";

type Props = {
    id?: string
}
type UseSignInResult = [SignInState, HandleChange, HandleChange, () => void]
type HandleChange = (arg0: string | null) => void
type SignInState = {
    loading: boolean,
    error: SignInError | null,
    signedIn: boolean
}
type SignInProps = {
    email: string,
    password: string
}
type SignInError = "EMAIL_ALREADY_CONFIRMED" | "FATAL_ERROR" | "INPUT_ERROR" | "LOGIN_OR_PASSWORD_INCORRECT" | "EMAIL_NOT_CONFIRMED"

type Result = {
    ok: boolean,
    error?: string
}

const EMAIL_ALREADY_CONFIRMED_MESSAGE = "Электронный адрес был ранее уже подтвержден, поэтому в целях безопасности эта ссылка больше не принимается системой. Пожалуйста, воспользуйтесь формой входа на сайт."
const LOGIN_OR_PASSWORD_INCORRECT_MESSAGE = "Электронный адрес или пароль введен неверно."
const EMAIL_NOT_CONFIRMED_MESSAGE = "Пожалуйста, выполните подтверждение Вашего электронного адреса. На указанный при регистрации электронный адрес отправлено письмо. Для завершения регистрации откройте письмо и кликните по ссылке."
const FATAL_ERROR_MESSAGE = "По неизвестной причине не получилось выполнить вход на сайте. Попробуйте повторить позже."
const SUCCESSFUL_MESSAGE = "Вход в систему успешно выполнен."
const LINK_ITEMS = [{id: "root", href: "/", label: "Главная страница"}]

export default function SignIn(props: Props) {

    const {id} = props

    const [signInState, setEmail, setPassword, submit] = useSignIn(id)

    const getMessage = () => {
        if (signInState.signedIn) return SUCCESSFUL_MESSAGE
        switch (signInState.error) {
            case "EMAIL_ALREADY_CONFIRMED":
                return EMAIL_ALREADY_CONFIRMED_MESSAGE
            case "FATAL_ERROR":
                return FATAL_ERROR_MESSAGE
        }
        return null
    }

    const getSnackbarMessage = () => {
        if (Boolean(id)) return null
        switch (signInState.error) {
            case "LOGIN_OR_PASSWORD_INCORRECT":
                return LOGIN_OR_PASSWORD_INCORRECT_MESSAGE
            case "EMAIL_NOT_CONFIRMED":
                return EMAIL_NOT_CONFIRMED_MESSAGE
            case "FATAL_ERROR":
                return FATAL_ERROR_MESSAGE
        }
        return null
    }

    const message = getMessage()
    const confirmDisabled = signInState.error === "INPUT_ERROR" || signInState.loading
    const openForm = !signInState.signedIn && !Boolean(id)

    const handleChange = formItem => {
        switch (formItem.name) {
            case "email":
                setEmail(formItem.value)
                break
            case "password":
                setPassword(formItem.value)
                break
        }
    }

    return (
        <>
            {signInState.loading && <Progress/>}
            <AppBar profile={signInState.signedIn}/>
            <Container height={256}>
                <MainBox linkItems={LINK_ITEMS}>
                    {message &&
                    <RootDesc>{message}</RootDesc>
                    }
                    {openForm &&
                    <SignInDialog confirmDisabled={confirmDisabled} onConfirm={submit} onChange={handleChange}/>
                    }
                </MainBox>
            </Container>
            <ErrorSnackbar message={getSnackbarMessage()}/>
        </>
    )
}

function useSignIn(id: string): UseSignInResult {
    const [loading, setLoading] = useState<boolean>(Boolean(id))
    const [error, setError] = useState<SignInError | null>(null)
    const [signedIn, setSignedIn] = useState<boolean>(false)
    const [email, setEmail] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)

    const inputError = !Boolean(email && password) ? "INPUT_ERROR" : null

    const submit = () => {
        setLoading(true)
        signIn({email, password}).then(() => {
            setSignedIn(true)
            setError(null)
            setLoading(false)
        }).catch(error => {
            setSignedIn(false)
            setError(error)
            setLoading(false)
        })
    }

    useEffect(() => {
        if (id)
            signInById(id).then(() => {
                setLoading(false)
                setSignedIn(true)
                setError(null)
            }).catch(error => {
                setLoading(false)
                setSignedIn(false)
                setError(error)
            })
    }, [id])

    return [{loading, error: error || inputError, signedIn}, setEmail, setPassword, submit]

}

async function signIn(props: SignInProps): Promise<void> {
    try {
        const {email, password} = props
        const response = await fetch("https://mathstutor.ru/api/sign-in", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        resultHandler(await response.json())
    } catch (error) {
        throw (error === "LOGIN_OR_PASSWORD_INCORRECT" || error === "EMAIL_NOT_CONFIRMED") ? error : "FATAL_ERROR"
    }
}

async function signInById(id: string): Promise<void> {
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

