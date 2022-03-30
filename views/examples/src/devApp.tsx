import React from 'react';
import {render} from "../../common/appRender";
import AppDevProvider from "../../common/components/smarts/AppDevProvider";
import {query} from "./queries";
import Page from "./Page";
import {getParam} from "../../common/paramsGetter";
import {GraphQLError} from "graphql";

const mocks = [{
    request: {
        query: query,
        variables: {lessonId: 1}
    },
    result: {
        data: {
            lesson: {
                title: "Градусная и радианная мера на числовой окружности.",
                examples: [{
                    id: 1,
                    commonDesc: null,
                    desc: "<p>Высоты тупоугольного треугольника `ABC` с тупым углом `ABC` пересекаются в точке `H`. Угол `AHC` равен `60°`.</p><p>а) Докажите, что угол `ABC` равен `120°`.</p><p>б) Найдите `BH`, если `AB=6`, `BC=10`.</p>",
                    illus: null,
                    solution: {
                        desc: "<p>Решаем задачу.</p>",
                        illus: null
                    },
                    answer: "Какой-то ответ"
                }, {
                    id: 2,
                    commonDesc: "Переведите в градусную меру:",
                    desc: "`-(3pi)/2`",
                    illus: null,
                    solution: {
                        desc: "<p>Решаем задачу.</p>",
                        illus: null
                    },
                    answer: "Какой-то ответ"
                }, {
                    id: 3,
                    commonDesc: "Переведите в градусную меру:",
                    desc: "В треугольнике `ABC` `AD` - биссектриса, угол `C` равен `104°`, угол `CAD` равен `5°`. Найдите угол `B`. Ответ дайте в градусах.",
                    illus: {
                        alt: "Иллюстрация к заданию",
                        name: "illusName"
                    },
                    solution: {
                        desc: "<p>Решаем задачу.</p>",
                        illus: {
                            alt: "Иллюстрация к заданию",
                            name: "illusName"
                        }
                    },
                    answer: "Какой-то ответ"
                }, {
                    id: 5,
                    commonDesc: "Переведите в градусную меру:",
                    desc: "В треугольнике `ABC` `AD` - биссектриса, угол `C` равен `104°`, угол `CAD` равен `5°`. Найдите угол `B`. Ответ дайте в градусах.",
                    illus: {
                        alt: "Иллюстрация к заданию",
                        name: null
                    },
                    solution: {
                        desc: "<p>Решаем задачу.</p>",
                        illus: {
                            alt: "Иллюстрация к решению",
                            name: null
                        }
                    },
                    answer: "Какой-то ответ"
                }]
            }
        }
    }
}, {
    request: {
        query: query,
        variables: {lessonId: 2}
    },
    result: {
        errors: [new GraphQLError("Ошибка")]
    }
}, {
    request: {
        query: query,
        variables: {lessonId: 3}
    },
    error: new Error("Ошибка")
}]

const app = <App/>
render(app)

function App() {

    const handleFail = error => console.error(error)

    return (
        <AppDevProvider mocks={mocks}>
            <Page lessonId={Number(getParam("lessonId"))} onFail={handleFail}/>
        </AppDevProvider>
    )
}