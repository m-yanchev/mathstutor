import React, {useState} from "react";
import SignUpForm from "./SignUpForm";
import {ErrorSnackbar} from "../../common/components/views/ErrorSnackbar";
import {gql, useMutation} from "@apollo/client";
import VerifiedInfo from "./VerifiedInfo";
import {ThemeProvider} from "@material-ui/core/styles";
import getTheme from "../../common/theme";
import Progress from "../../common/components/views/Progress";

const SIGN_UP_FAILED_MESSAGE = "Произошла ошибка отправки регистрационных данных. Попробуйте повторить позже."

const SIGN_UP_QUERY = gql`
    mutation SignUp($name: String!, $email: String!, $password: String!) {
        signUp(name: $name, email: $email, password: $password) {
            ok
            error
        }
    }
`

function SignUp() {

    const [signUp, signUpState] = useMutation(SIGN_UP_QUERY)

    const [email, setEmail] = useState<string | null>(null)
    const [username, setUsername] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    const [emailExistPermission, setEmailExistPermission] = useState(false)
    const [requestError, setRequestError] = useState(false)

    const handleConfirm = async () => {
        signUp({variables: {email, name: username, password}}).catch(() => setRequestError(true))
        setEmailExistPermission(true)
    }

    const handleChange = formItem => {
        switch (formItem.name) {
            case "username":
                setUsername(formItem.value)
                break
            case "email":
                setEmail(formItem.value)
                setEmailExistPermission(false)
                break
            case "password":
                setPassword(formItem.value)
                break
        }
    }

    const signUpOk = signUpState.data && signUpState.data.signUp.ok
    const emailExist =
        emailExistPermission &&
        signUpState.data &&
        signUpState.data.signUp.error === "email_already_exists"
    const confirmDisabled =
        !(Boolean(username) && Boolean(email) && Boolean(password)) ||
        signUpState.loading || emailExist
    const isFailed =
        requestError || signUpState.error ||
        signUpState.data && signUpState.data.signUp.error &&
        signUpState.data.signUp.error !== "email_already_exists"

    return (
        <ThemeProvider theme={getTheme()}>
            {signUpState.loading &&
                <Progress/>}
            {signUpOk ?
                <VerifiedInfo/> :
                <SignUpForm emailExist={emailExist} confirmDisabled={confirmDisabled} onConfirm={handleConfirm}
                            onChange={handleChange}/>
            }
            <ErrorSnackbar message={isFailed ? SIGN_UP_FAILED_MESSAGE : null}/>
        </ThemeProvider>
    )
}

export default SignUp