import React from 'react';
import {render} from "../../common/appRender";
import AppDevProvider from "../../common/components/smarts/AppDevProvider";
import {mutation} from "./queries";
import Page from "./Page";

const mocks = [{
    request: {
        query: mutation,
        variables: {
            password: "1234567q"
        }
    },
    result: {
        data: {
            updatePassword: {
                ok: true
            }
        }
    }
}, {
    request: {
        query: mutation,
        variables:  {
            password: "1234567w"
        }
    },
    result: {
        data: {
            updatePassword: {
                ok: false
            }
        }
    }
}, {
    request: {
        query: mutation,
        variables:  {
            password: "1234567e"
        }
    },
    result: {
        error: "Ошибка",
        data: {
            updatePassword: {
                ok: false
            }
        }
    }
}]

const app = <App/>
render(app)

function App() {

    const handleFail = error => console.error(error)

    return (
        <AppDevProvider mocks={mocks}>
            <Page onFail={handleFail}/>
        </AppDevProvider>
    )
}