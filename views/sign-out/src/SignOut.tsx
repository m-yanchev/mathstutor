import React, {useState} from "react";
import AppBar from "../../common/components/views/AppBar";
import Container from "../../common/components/views/Container";
import SignOutDialog from "./SignOutDialog"
import ResultMessage from "./ResultMessage";

type State = "confirm" | "success" | "failed"

const SUCCESS_MESSAGE = "Вы вышли из системы"
const FAILED_MESSAGE = "Не получилось выйти из системы. Попробуйте" +
    " повторить позже."

export default function SignOut() {

    const [state, setState] = useState<State>("confirm")

    const handleConfirm = () => {
        fetch("/api/sign-out").then(() => setState("success")).catch(() => setState("failed"))
    }

    const message = state === "success" ? SUCCESS_MESSAGE : FAILED_MESSAGE

    return (
        <>
            <AppBar profile={true}/>
            <Container height={256}>
                {state === "confirm" ?
                <SignOutDialog onConfirm={handleConfirm}/> :
                    <ResultMessage>{message}</ResultMessage>
                }
            </Container>
        </>
    )
}

