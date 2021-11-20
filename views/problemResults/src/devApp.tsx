import React from 'react';
import {render} from "../../common/appRender";
import AppDevProvider from "../../common/components/smarts/AppDevProvider";
import {query} from "./queries";
import Page from "./Page";
import {getParam} from "../../common/paramsGetter";

const mocks = [{
    request: {
        query: query,
        variables: {studentId: "1", testResultTimeStamp: "1636809725000"}
    },
    result: {
        data: {
            problemResults: [{
                problem: {
                    id: 1,
                    commonDesc: "Вычислить",
                    desc: "`5+5`",
                    answer: 10,
                    imageAlt: null
                },
                answer: 9
            }, {
                problem: {
                    id: 2,
                    commonDesc: "Вычислить",
                    desc: "`5+6`",
                    answer: 11,
                    imageAlt: null
                },
                answer: 11
            }],
            profile: {
                name: "Николай",
                email: "nicholas@gmail.com"
            },
            testResult: {
                test: {
                    title: "Арифметика"
                }
            }
        }
    }
}, {
    request: {
        query: query,
        variables: {studentId: "1", testResultTimeStamp: "1636809725001"}
    },
    result: {
        data: {
            problemResults: [],
            profile: {
                name: "Николай",
                email: "nicholas@gmail.com"
            },
            testResult: {
                test: {
                    title: "Арифметика"
                }
            }
        }
    }
}, {
    request: {
        query: query,
        variables: {studentId: "1", testResultTimeStamp: "1636809725002"}
    },
    result: {
        data: {
            problemResults: null,
            profile: null,
            testResult: null,
        },
        error: "Ошибка"
    }
}]

const app = <App/>
render(app)

function App() {

    const handleFail = error => console.error(error)

    return (
        <AppDevProvider mocks={mocks}>
            <Page studentId={getParam("studentId")} testResultTimeStamp={getParam("testResultTimeStamp")}
                  onFail={handleFail}/>
        </AppDevProvider>
    )
}