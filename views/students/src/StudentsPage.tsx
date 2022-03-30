import React from 'react';
import {useQuery} from "@apollo/client";
import AppPage from "../../common/components/views/AppPage";
import Progress from "../../common/components/views/Progress";
import Profile from "../../common/rules/Profile";
import StudentsView from "./StudentsView";
import RootDesc from "../../common/components/views/RootDesc";
import {query} from "./queries";

const DATA_RETRIEVAL_ERROR_MESSAGE = 'Не получилось загрузить список учеников. Попробуйте повторить позже.'

export default function StudentsPage() {

    const dataState = useQuery(query)
    const profiles = dataState.data ? dataState.data.students.map(profile => Profile.create(profile)) : null

    return (
        <AppPage header={"Ученики"} profile>
            {dataState.loading ?
                <Progress/> :
                    profiles ?
                        <StudentsView profiles={profiles}/> :
                        <RootDesc>{DATA_RETRIEVAL_ERROR_MESSAGE}</RootDesc>
            }
        </AppPage>
    )
}