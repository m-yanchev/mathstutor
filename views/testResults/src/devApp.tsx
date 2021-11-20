import React from 'react';
import {render} from "../../common/appRender";
import AppDevProvider from "../../common/components/smarts/AppDevProvider";
import {query} from "./queries";
import Page from "./Page";

const mocks = [{
    request: {
        query: query,
        variables: {studentId: "1"}
    },
    result: {
        data: {
            testResults: [{
                msTimeStamp: "1636809725000",
                percentage: 100,
                test: {
                    title: "Задания 15. ЕГЭ профильного уровня."
                }
            }, {
                msTimeStamp: "1636909725000",
                percentage: 70,
                test: {
                    title: "Задания 12. ЕГЭ профильного уровня."
                }
            }, {
                msTimeStamp: "1646909725000",
                percentage: 0,
                test: {
                    title: "Решение квадратных уравнений."
                }
            },{
                msTimeStamp: "1636809726000",
                percentage: 100,
                test: {
                    title: "Задания 15. ЕГЭ профильного уровня."
                }
            }, {
                msTimeStamp: "1636909727000",
                percentage: 70,
                test: {
                    title: "Задания 12. ЕГЭ профильного уровня."
                }
            }, {
                msTimeStamp: "1646909728000",
                percentage: 0,
                test: {
                    title: "Решение квадратных уравнений."
                }
            },{
                msTimeStamp: "1636809729000",
                percentage: 100,
                test: {
                    title: "Задания 15. ЕГЭ профильного уровня."
                }
            }, {
                msTimeStamp: "1636909730000",
                percentage: 70,
                test: {
                    title: "Задания 12. ЕГЭ профильного уровня."
                }
            }, {
                msTimeStamp: "1646909731000",
                percentage: 0,
                test: {
                    title: "Решение квадратных уравнений."
                }
            },{
                msTimeStamp: "1636809735000",
                percentage: 100,
                test: {
                    title: "Задания 15. ЕГЭ профильного уровня."
                }
            }, {
                msTimeStamp: "1636909745000",
                percentage: 70,
                test: {
                    title: "Задания 12. ЕГЭ профильного уровня."
                }
            }, {
                msTimeStamp: "1646909755000",
                percentage: 0,
                test: {
                    title: "Решение квадратных уравнений."
                }
            }],
            profile: {
                email: "ivanov@yandex.ru",
                name: "Иван"
            }
        }
    }
}]

const app = <App/>
render(app)

function App() {
    return (
        <AppDevProvider mocks={mocks}>
            <Page studentId={"1"}/>
        </AppDevProvider>
    )
}