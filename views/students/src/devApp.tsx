import React from 'react';
import {render} from "../../common/appRender";
import StudentsPage from "./StudentsPage";
import AppDevProvider from "../../common/components/smarts/AppDevProvider";
import {query} from "./queries";

const mocks = [{
    request: {
        query: query,
        variables: {}
    },
    result: {
        data: {
            students: [{
                id: "1",
                email: "ivanov@yandex.ru",
                name: "Иван"
            }, {
                id: "2",
                email: "petrov@gmail.com",
                name: "Пётр"
            }]
        }
    }
}]

const app = <App/>
render(app)

function App() {
    return (
        <AppDevProvider mocks={mocks}>
            <StudentsPage/>
        </AppDevProvider>
    )
}