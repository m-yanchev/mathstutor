import React from 'react';
import Page from "./Page";
import {mutation, query} from "./queries";
import {render} from "../../common/appRender";
import AppDevProvider from "../../common/components/smarts/AppDevProvider";
import {getIdParam} from "../../common/paramsGetter";
import {GraphQLError} from "graphql";

const mocks = [{
    request: {
        query: query,
        variables: {id: 1}
    },
    result: {
        data: {
            test: {
                id: 1,
                title: "Планиметрические задания",
                msNotFinishedResultTimeStamp: null,
                completedLength: 0,
                exercises: [{
                    problem: {
                        id: 1,
                        commonDesc: null,
                        desc: "<p>Высоты тупоугольного треугольника `ABC` с тупым углом `ABC` пересекаются в точке `H`. Угол `AHC` равен `60°`.</p><p>а) Докажите, что угол `ABC` равен `120°`.</p><p>б) Найдите `BH`, если `AB=6`, `BC=10`.</p>",
                        illus: null,
                    },
                    withDetailedAnswer: true
                }, {
                    problem: {
                        id: 2,
                        commonDesc: "Переведите в градусную меру:",
                        desc: "`-(3pi)/2`",
                        illus: null,
                    },
                    withDetailedAnswer: false
                }, {
                    problem: {
                        id: 3,
                        commonDesc: "Переведите в градусную меру:",
                        desc: "В треугольнике `ABC` `AD` - биссектриса, угол `C` равен `104°`, угол `CAD` равен `5°`. Найдите угол `B`. Ответ дайте в градусах.",
                        illus: {
                            alt: "Иллюстрация к заданию",
                            name: "illusName"
                        }
                    },
                    withDetailedAnswer: true
                }]
            }
        }
    }
}, {
    request: {
        query: query,
        variables: {id: 2}
    },
    result: {
        data: {
            test: {
                id: 2,
                title: "Планиметрические задания",
                msNotFinishedResultTimeStamp: null,
                completedLength: 2,
                exercises: [{
                    problem: {
                        id: 1,
                        commonDesc: null,
                        desc: "<p>Высоты тупоугольного треугольника `ABC` с тупым углом `ABC` пересекаются в точке `H`. Угол `AHC` равен `60°`.</p><p>а) Докажите, что угол `ABC` равен `120°`.</p><p>б) Найдите `BH`, если `AB=6`, `BC=10`.</p>",
                        illus: null,
                    },
                    withDetailedAnswer: true
                }, {
                    problem: {
                        id: 2,
                        commonDesc: "Переведите в градусную меру:",
                        desc: "`-(3pi)/2`",
                        illus: null,
                    },
                    withDetailedAnswer: false
                }, {
                    problem: {
                        id: 3,
                        commonDesc: "Переведите в градусную меру:",
                        desc: "В треугольнике `ABC` `AD` - биссектриса, угол `C` равен `104°`, угол `CAD` равен `5°`. Найдите угол `B`. Ответ дайте в градусах.",
                        illus: {
                            alt: "Иллюстрация к заданию",
                            name: "illusName"
                        }
                    },
                    withDetailedAnswer: true
                }]
            }
        }
    }
}, {
    request: {
        query: query,
        variables: {id: 3}
    },
    result: {
        errors: [new GraphQLError("Ошибка")]
    }
}, {
    request: {
        query: query,
        variables: {id: 4}
    },
    error: new Error("Ошибка")
}, {
    request: {
        query: mutation,
        variables: {
            testId: 1,
            msTestResultTimeStamp: undefined,
            answer: null,
            problemId: 1,
            exerciseIndex: 0
        }
    },
    result: {
        data: {
            writeResult: {
                testResult: {
                    msTimeStamp: "1"
                }
            }
        }
    }
}, {
    request: {
        query: mutation,
        variables: {
            testId: 1,
            msTestResultTimeStamp: "1",
            answer: "",
            problemId: 2,
            exerciseIndex: 1
        }
    },
    result: {
        data: {
            writeResult: {
                testResult: {
                    msTimeStamp: "1"
                }
            }
        }
    }
}, {
    request: {
        query: mutation,
        variables: {
            testId: 1,
            msTestResultTimeStamp: "1",
            answer: null,
            problemId: 3,
            exerciseIndex: 2
        }
    },
    result: {
        data: {
            writeResult: {
                testResult: {
                    msTimeStamp: "1"
                }
            }
        }
    }
}, {
    request: {
        query,
        variables: {id:  200}
    },
    result: {
        data: {
            test: {
                id: 200,
                title: "Треугольники. Продвинутый уровень",
                completedLength: 2,
                msNotFinishedResultTimeStamp: null,
                exercises: [{
                    problem: {
                        commonDesc: null,
                        desc: "Стороны треугольника `ABC` разделены точками `M,` `N,` `P` так, что `AM:MB=``BN:NC=``CP:PA=``1:4,` `Q,` `L,` `K` - точки пересечения прямых `AN` и `BP,` `BP` и `CM,` `AN` и `CM` соответственно. Найдите отношение площади треугольника `QLK` к площади треугольника `ABC.`",
                        id: 1002,
                        illus: null
                    },
                    withDetailedAnswer: true
                }, {
                    problem: {
                        commonDesc: null,
                        desc: "Медианы треугольника равны 5, 6, 7. Найдите площадь треугольника.",
                        id: 1001,
                        illus: null
                    },
                    withDetailedAnswer: true
                }]
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
            <Page id={getIdParam()} onFail={handleFail}/>
        </AppDevProvider>
    )
}
