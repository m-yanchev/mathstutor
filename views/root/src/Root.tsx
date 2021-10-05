import React, {useState} from "react";
import Container from "../../common/components/views/Container";
import AppBar from "../../common/components/views/AppBar";
import {gql, useQuery} from "@apollo/client";
import Progress from "../../common/components/views/Progress";
import {ErrorSnackbar} from "../../common/components/views/ErrorSnackbar";
import {ThemeProvider} from "@material-ui/core/styles";
import getTheme from "../../common/theme";
import Profile from "../../common/rules/Profile";
import CourseStateBox from "./CourseStateBox";
import LinkList from "../../common/components/views/LinkList";
import MainButton from "../../common/components/views/MainButton";
import Program from "./Program";

const PROFILE_ERROR_MESSAGE = "Ошибка обращения к серверу. Не могу получить ваш профиль. Попробуйте обновить страницу позже."
const EMAIL_NOT_CONFIRMED_MESSAGE = "Пожалуйста, выполните подтверждение Вашего электронного адреса. После регистрации на указанный электронный адрес было отправлено письмо. Для завершения регистрации откройте письмо и кликните по ссылке."

const QUERY = gql`
    query Appointment {
        profile {
            emailConfirmed
            appointment {
                startTimeStamp
                weekDays {
                    number
                    hour
                    minute
                    duration
                }
                vacations {
                    startTimeStamp
                    finishTimeStamp
                }
                course {
                    title
                    lessons {
                        id
                        title
                    }
                }
            }
        }
    }
`

export default function Root() {

    const profileState = useQuery(QUERY)
    const [programView, setProgramView] = useState<boolean>(false)
    const profile = profileState.data ? Profile.create(profileState.data.profile) : null
    const getSnackbarMessage = () => {
        if (profileState.error) return PROFILE_ERROR_MESSAGE
        if (profileState.data && profileState.data.profile && !profileState.data.profile.emailConfirmed)
            return EMAIL_NOT_CONFIRMED_MESSAGE
        return null
    }
    const notSignedItems = [
        {id: "sign-in", href: "form/sign-in", label: "Вход"},
        {id: "sign-up", href: "form/sign-up", label: "Регистрация"},
        {id: "replace-password", href: "form/replace-password", label: "Восстановление пароля"},
        {id: "about", href: "about", label: "О проекте"}
    ]
    const handleProgramButtonClick = () => {
        setProgramView(true)
    }
    const handleProgramClose = () => {
        setProgramView(false)
    }

    return (
        <ThemeProvider theme={getTheme()}>
            <AppBar profile={Boolean(profile)}/>
            <Container height={256}>
                {profileState.loading ?
                    <Progress/> :
                    <>
                        {profile ?
                            <>
                                <CourseStateBox appointment={profile.appointment}/>
                                {profile.appointment &&
                                <MainButton onClick={handleProgramButtonClick}>Программа курса</MainButton>}
                            </> :
                            <LinkList items={notSignedItems}/>
                        }
                    </>
                }
            </Container>
            {profile?.appointment &&
            <Program open={programView} appointment={profile.appointment} onClose={handleProgramClose}/>}
            <ErrorSnackbar message={getSnackbarMessage()}/>
        </ThemeProvider>
    )
}