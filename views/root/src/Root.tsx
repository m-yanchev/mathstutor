import React from "react";
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

const PROFILE_ERROR = "Ошибка обращения к серверу. Не могу получить ваш профиль. Попробуйте позже обновить страницу."

const QUERY = gql`
    query Appointment {
        profile {
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
                    lessonTitles 
                }
            }
        }
    }
`

export default function Root() {

    const profileState = useQuery(QUERY)

    const profile = profileState.data ? Profile.create(profileState.data.profile) : null
    const failedMessage = profileState.error ? PROFILE_ERROR : null
    const notSignedItems = [
        {id: "sign-in", href: "form/sign-in", label: "Вход"},
        {id: "sign-up", href: "form/sign-up", label: "Регистрация"},
        {id: "replace-password", href: "form/replace-password", label: "Восстановление пароля"},
        {id: "about", href: "about", label: "О проекте"}
    ]
    const signedItems = [
        {id: "program", href: "program", label: "Программа курса"}
    ]

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
                                {profile.appointment && <LinkList items={signedItems}/>}
                            </> :
                            <LinkList items={notSignedItems}/>
                        }
                    </>
                }
            </Container>
            <ErrorSnackbar message={failedMessage}/>
        </ThemeProvider>
    )
}