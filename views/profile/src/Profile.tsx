import React, {useState} from "react";
import Container from "../../common/components/views/Container";
import AppBar from "../../common/components/views/AppBar";
import ProfileForm from "./ProfileForm";
import {gql, useQuery, useMutation} from "@apollo/client";
import Progress from "../../common/components/views/Progress";
import {ErrorSnackbar} from "../../common/components/views/ErrorSnackbar";
import {ThemeProvider} from "@material-ui/core/styles";
import getTheme from "../../common/theme";
import {getFirstErrorType} from "../../common/apolloResponseHandlers";

const EMAIL_ALREADY_CONFIRMED_MESSAGE = 'Адрес электронной почты уже был ранее подтверждён. Ссылка по которой Вы ' +
    'перешли на эту страницу устарела.'
const PROFILE_LOADING_FAILED_MESSAGE = 'Не удалось загрузить Ваш профиль. Попробуйте повторить позже.'
const UPDATING_FAILED_MESSAGE = 'Не удалось сохранить изменения Вашего профиля. Попробуйте повторить позже.'

const QUERY = gql`
    query Profile {
        profile {
            name
            email
        }
    }
`

const MUTATION = gql`
    mutation UpdateProfile($name: String!) {
        updateProfile(name: $name) {
            ok
        }
    }
`

export default function Profile() {

    const profileState = useQuery(QUERY)
    const [update, updatingState] = useMutation(MUTATION)
    const [username, setUsername] = useState<string | null>(null)

    const handleChange = formItem => {
        switch (formItem.name) {
            case "username":
                setUsername(formItem.value)
                break
        }
    }

    const handleConfirm = async () => {
        await update({variables: {name: username}})
    }

    const confirmDisabled = updatingState.loading || !Boolean(username)
    const isEmailAlreadyConfirmedError = getFirstErrorType(updatingState) === "EMAIL_ALREADY_CONFIRMED"
    const isProfileLoadingError = profileState.error
    const isUpdatingError = updatingState.error || (updatingState.data && !updatingState.data.ok)
    const failedMessage =
        isEmailAlreadyConfirmedError ? EMAIL_ALREADY_CONFIRMED_MESSAGE :
            isProfileLoadingError ? PROFILE_LOADING_FAILED_MESSAGE :
                isUpdatingError ? UPDATING_FAILED_MESSAGE : null

    return (
        <ThemeProvider theme={getTheme()}>
            <AppBar profile/>
            <Container height={408}>
                {profileState.loading ?
                    <Progress/> :
                    <>
                        {profileState.data &&
                        <ProfileForm email={profileState.data.profile.email}
                                     userName={profileState.data.profile.name}
                                     confirmDisabled={confirmDisabled} onConfirm={handleConfirm}
                                     onChange={handleChange}/>
                        }
                    </>
                }
            </Container>
            <ErrorSnackbar message={failedMessage}/>
        </ThemeProvider>
    )
}