import React, {useState} from "react";
import SignUpForm from "./SignUpForm";
import {ErrorSnackbar} from "../../../common/components/views/ErrorSnackbar";
import {gql, useMutation} from "@apollo/client";

const SIGN_UP_FAILED_MESSAGE = "Произошла ошибка отправки регистрационных данных. Попробуйте повторить позже."

const MUTATION = gql`
    mutation SignUp($userName: String!, $email: String!, $password: String) {
        signUp(userName: $userName, email: $email, password: $password) {
            result {
                error {
                    name
                }
            }
        }
    }
`

function SignUp() {

    const [signUp, {loading, error}] = useMutation(MUTATION)

    const [email, setEmail] = useState<string | null>(null)
    const [username, setUsername] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    const [emailExist, setEmailExist] = useState(false)
    const [isFailed, setIsFailed] = useState(false)
    const confirmDisabled = !(Boolean(username) && Boolean(email) && Boolean(password))

    const handleConfirm = async () => {
        try {
            const result = (await signUp()).data
            if (result.error) {
                if (result.error.name === "email-exists") {
                    setEmailExist(true)
                } else {
                    setIsFailed(true)
                }
            }
        } catch (error) {
            setIsFailed(true)
        }
    }

    const handleChange = formItem => {
        switch (formItem.name) {
            case "username":
                setUsername(formItem.value)
                break
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
            <SignUpForm emailExist={emailExist} confirmDisabled={confirmDisabled} onConfirm={handleConfirm}
                        onChange={handleChange}/>
            <ErrorSnackbar message={isFailed ? SIGN_UP_FAILED_MESSAGE : null}/>
        </>
    )
}

export default SignUp