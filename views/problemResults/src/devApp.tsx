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
        variables: {studentId: "1", testResultTimeStamp: "1636809725000"}
    },
    result: {
        data: {
            profile: {
                access: "tutor"
            },
            student: {
                name: "Николай",
                email: "nicholas@gmail.com"
            },
            testResult: {
                msTimeStamp: "1636809725000",
                test: {
                    title: "Арифметика",
                    exercises: [{
                        maxEstimate: 3,
                        withDetailedAnswer: true,
                        problem: {
                            id: 7,
                            commonDesc: null,
                            desc: "<p>Высоты тупоугольного треугольника `ABC` с тупым углом `ABC` пересекаются в точке `H`. Угол `AHC` равен `60°`.</p><p>а) Докажите, что угол `ABC` равен `120°`.</p><p>б) Найдите `BH`, если `AB=6`, `BC=10`.</p>",
                            answer: "б) `(14sqrt3)/3`",
                            solution: {
                                desc: "<p>a) Пусть `CK` и `AL` высоты треугольника `ABC`, тогда углы `HKB` и `HLB` прямые. Рассмотрим четырёхугольник `HKBL`.  Угол `KHL=60°` по условию, углы  `HKB` и `HLB` равны по `90°`, как углы образованные высотами треугольника. Сумма углов четырехугольника равна `360°`, поэтому четвертый угол `KBL` четырёхугольника `HKBL` равен `120°`.  Углы `ABC` и `KBL` равны, как вертикальные, следовательно:</p> <p/>`ABC=KBL=120°`</p><p>б) Угол `LBC` смежный с углом `ABC`, следовательно: <p>`/_LBC=180^@-/_ABC=60^@`</p><p>В прямоугольном треугольнике `BLC` угол `LBC` равен `60^@`, угол `BLC` прямой, следовательно второй острый угол `BCL` равен `30^@`. В прямоугольном треугольнике напротив угла в `30^@` лежит катет равный половине гипотенузы, поэтому: <p>`BL=1/2*BC=5`</p><p>`AL=AB+BL=11`</p><p>Углы `KBA` и `LBC` равны, как вертикальные, следовательно `/_KBA=60^@`. В прямоугольном треугольнике `BKA` угол `KBA` равен `60^@`, угол `BKA` прямой, следовательно второй острый угол `BAK` равен `30^@`. В прямоугольном треугольнике `HLA` угол `HAL` равен `30^@`, угол `HLA` прямой и катет `AL` равен `11`, следовательно:</p><p>`HL=AL*tg/_HAL=11*tg30^@=(11sqrt3)/3`</p><p>По теореме Пифагора:</p><p>`HB^2=HL^2+BL^2=(11^2)/3+5^2=(14^2)/3`</p><p>`HB=(14sqrt3)/3`</p>",
                                illus: {
                                    name: null
                                }
                            },
                            illus: null
                        }
                    }, {
                        maxEstimate: 3,
                        withDetailedAnswer: false,
                        problem: {
                            id: 2,
                            commonDesc: "Вычислить",
                            desc: "`5+6`",
                            answer: 11,
                            solution: null,
                            illus: null
                        }
                    }]
                },
                problemResults: [{
                    msTimeStamp: "1636809725000",
                    answer: null,
                    estimate: 0
                }, {
                    msTimeStamp: "1636810725000",
                    estimate: 3,
                    answer: 11
                }]
            }
        }
    }
}, {
    request: {
        query: query,
        variables: {studentId: "2", testResultTimeStamp: "1636809725000"}
    },
    result: {
        data: {
            profile: {
                access: "student"
            },
            student: {
                name: "Николай",
                email: "nicholas@gmail.com"
            },
            testResult: {
                msTimeStamp: "1636809725000",
                test: {
                    title: "Арифметика",
                    exercises: [{
                        maxEstimate: 3,
                        withDetailedAnswer: true,
                        problem: {
                            id: 7,
                            commonDesc: null,
                            desc: "<p>Высоты тупоугольного треугольника `ABC` с тупым углом `ABC` пересекаются в точке `H`. Угол `AHC` равен `60°`.</p><p>а) Докажите, что угол `ABC` равен `120°`.</p><p>б) Найдите `BH`, если `AB=6`, `BC=10`.</p>",
                            answer: "б) `(14sqrt3)/3`",
                            solution: {
                                desc: "<p>a) Пусть `CK` и `AL` высоты треугольника `ABC`, тогда углы `HKB` и `HLB` прямые. Рассмотрим четырёхугольник `HKBL`.  Угол `KHL=60°` по условию, углы  `HKB` и `HLB` равны по `90°`, как углы образованные высотами треугольника. Сумма углов четырехугольника равна `360°`, поэтому четвертый угол `KBL` четырёхугольника `HKBL` равен `120°`.  Углы `ABC` и `KBL` равны, как вертикальные, следовательно:</p> <p/>`ABC=KBL=120°`</p><p>б) Угол `LBC` смежный с углом `ABC`, следовательно: <p>`/_LBC=180^@-/_ABC=60^@`</p><p>В прямоугольном треугольнике `BLC` угол `LBC` равен `60^@`, угол `BLC` прямой, следовательно второй острый угол `BCL` равен `30^@`. В прямоугольном треугольнике напротив угла в `30^@` лежит катет равный половине гипотенузы, поэтому: <p>`BL=1/2*BC=5`</p><p>`AL=AB+BL=11`</p><p>Углы `KBA` и `LBC` равны, как вертикальные, следовательно `/_KBA=60^@`. В прямоугольном треугольнике `BKA` угол `KBA` равен `60^@`, угол `BKA` прямой, следовательно второй острый угол `BAK` равен `30^@`. В прямоугольном треугольнике `HLA` угол `HAL` равен `30^@`, угол `HLA` прямой и катет `AL` равен `11`, следовательно:</p><p>`HL=AL*tg/_HAL=11*tg30^@=(11sqrt3)/3`</p><p>По теореме Пифагора:</p><p>`HB^2=HL^2+BL^2=(11^2)/3+5^2=(14^2)/3`</p><p>`HB=(14sqrt3)/3`</p>",
                                illus: {
                                    name: null
                                }
                            },
                            illus: null
                        }
                    }, {
                        maxEstimate: 3,
                        withDetailedAnswer: false,
                        problem: {
                            id: 2,
                            commonDesc: "Вычислить",
                            desc: "`5+6`",
                            answer: 11,
                            solution: null,
                            illus: null
                        }
                    }, {
                        maxEstimate: 3,
                        withDetailedAnswer: false,
                        problem: {
                            id: 3,
                            commonDesc: "Вычислить",
                            desc: "`6+6`",
                            answer: 12,
                            solution: null,
                            illus: null
                        }
                    }, {
                        maxEstimate: 3,
                        withDetailedAnswer: true,
                        problem: {
                            id: 7,
                            commonDesc: null,
                            desc: "<p>Высоты тупоугольного треугольника `ABC` с тупым углом `ABC` пересекаются в точке `H`. Угол `AHC` равен `60°`.</p><p>а) Докажите, что угол `ABC` равен `120°`.</p><p>б) Найдите `BH`, если `AB=6`, `BC=10`.</p>",
                            answer: "б) `(14sqrt3)/3`",
                            solution: {
                                desc: "<p>a) Пусть `CK` и `AL` высоты треугольника `ABC`, тогда углы `HKB` и `HLB` прямые. Рассмотрим четырёхугольник `HKBL`.  Угол `KHL=60°` по условию, углы  `HKB` и `HLB` равны по `90°`, как углы образованные высотами треугольника. Сумма углов четырехугольника равна `360°`, поэтому четвертый угол `KBL` четырёхугольника `HKBL` равен `120°`.  Углы `ABC` и `KBL` равны, как вертикальные, следовательно:</p> <p/>`ABC=KBL=120°`</p><p>б) Угол `LBC` смежный с углом `ABC`, следовательно: <p>`/_LBC=180^@-/_ABC=60^@`</p><p>В прямоугольном треугольнике `BLC` угол `LBC` равен `60^@`, угол `BLC` прямой, следовательно второй острый угол `BCL` равен `30^@`. В прямоугольном треугольнике напротив угла в `30^@` лежит катет равный половине гипотенузы, поэтому: <p>`BL=1/2*BC=5`</p><p>`AL=AB+BL=11`</p><p>Углы `KBA` и `LBC` равны, как вертикальные, следовательно `/_KBA=60^@`. В прямоугольном треугольнике `BKA` угол `KBA` равен `60^@`, угол `BKA` прямой, следовательно второй острый угол `BAK` равен `30^@`. В прямоугольном треугольнике `HLA` угол `HAL` равен `30^@`, угол `HLA` прямой и катет `AL` равен `11`, следовательно:</p><p>`HL=AL*tg/_HAL=11*tg30^@=(11sqrt3)/3`</p><p>По теореме Пифагора:</p><p>`HB^2=HL^2+BL^2=(11^2)/3+5^2=(14^2)/3`</p><p>`HB=(14sqrt3)/3`</p>",
                                illus: {
                                    name: null
                                }
                            },
                            illus: null
                        }
                    },]
                },
                problemResults: [{
                    msTimeStamp: "1636809725000",
                    estimate: 2,
                    answer: null
                }, {
                    msTimeStamp: "1636810725000",
                    estimate: 3,
                    answer: 11
                }, {
                    msTimeStamp: "1636811725000",
                    estimate: 0,
                    answer: 11
                }, {
                    msTimeStamp: "1636811725000",
                    estimate: null,
                    answer: null
                }]
            }
        }
    }
}, {
    request: {
        query: query,
        variables: {studentId: "3", testResultTimeStamp: "1636809725000"}
    },
    result: {
        data: {
            profile: {
                access: null
            },
            student: {
                name: "Николай",
                email: "nicholas@gmail.com"
            },
            testResult: {
                msTimeStamp: "1636809725000",
                test: {
                    title: "Арифметика",
                    exercises: [{
                        maxEstimate: 3,
                        withDetailedAnswer: true,
                        problem: {
                            id: 7,
                            commonDesc: null,
                            desc: "<p>Высоты тупоугольного треугольника `ABC` с тупым углом `ABC` пересекаются в точке `H`. Угол `AHC` равен `60°`.</p><p>а) Докажите, что угол `ABC` равен `120°`.</p><p>б) Найдите `BH`, если `AB=6`, `BC=10`.</p>",
                            answer: "б) `(14sqrt3)/3`",
                            solution: {
                                desc: "<p>a) Пусть `CK` и `AL` высоты треугольника `ABC`, тогда углы `HKB` и `HLB` прямые. Рассмотрим четырёхугольник `HKBL`.  Угол `KHL=60°` по условию, углы  `HKB` и `HLB` равны по `90°`, как углы образованные высотами треугольника. Сумма углов четырехугольника равна `360°`, поэтому четвертый угол `KBL` четырёхугольника `HKBL` равен `120°`.  Углы `ABC` и `KBL` равны, как вертикальные, следовательно:</p> <p/>`ABC=KBL=120°`</p><p>б) Угол `LBC` смежный с углом `ABC`, следовательно: <p>`/_LBC=180^@-/_ABC=60^@`</p><p>В прямоугольном треугольнике `BLC` угол `LBC` равен `60^@`, угол `BLC` прямой, следовательно второй острый угол `BCL` равен `30^@`. В прямоугольном треугольнике напротив угла в `30^@` лежит катет равный половине гипотенузы, поэтому: <p>`BL=1/2*BC=5`</p><p>`AL=AB+BL=11`</p><p>Углы `KBA` и `LBC` равны, как вертикальные, следовательно `/_KBA=60^@`. В прямоугольном треугольнике `BKA` угол `KBA` равен `60^@`, угол `BKA` прямой, следовательно второй острый угол `BAK` равен `30^@`. В прямоугольном треугольнике `HLA` угол `HAL` равен `30^@`, угол `HLA` прямой и катет `AL` равен `11`, следовательно:</p><p>`HL=AL*tg/_HAL=11*tg30^@=(11sqrt3)/3`</p><p>По теореме Пифагора:</p><p>`HB^2=HL^2+BL^2=(11^2)/3+5^2=(14^2)/3`</p><p>`HB=(14sqrt3)/3`</p>",
                                illus: {
                                    name: null
                                }
                            },
                            illus: null
                        }
                    }, {
                        maxEstimate: 3,
                        withDetailedAnswer: false,
                        problem: {
                            id: 2,
                            commonDesc: "Вычислить",
                            desc: "`5+6`",
                            answer: 11,
                            solution: null,
                            illus: null
                        }
                    }]
                },
                problemResults: [{
                    msTimeStamp: "1636809725000",
                    estimate: 1,
                    answer: null
                }, {
                    msTimeStamp: "1636810725000",
                    estimate: 3,
                    answer: 11
                }]
            }
        }
    }
}, {
    request: {
        query: query,
        variables: {studentId: "4", testResultTimeStamp: "1636809725001"}
    },
    result: {
        data: {
            profile: {
                access: null
            },
            student: {
                name: "Николай",
                email: "nicholas@gmail.com"
            },
            testResult: {
                msTimeStamp: "1636809725001",
                test: {
                    title: "Арифметика",
                    exercises: []
                },
                problemResults: [],
            }
        }
    }
}, {
    request: {
        query: query,
        variables: {studentId: "5", testResultTimeStamp: "1636809725002"}
    },
    result: {
        errors: [new GraphQLError("Ошибка")]
    }
}, {
    request: {
        query: query,
        variables: {studentId: "6", testResultTimeStamp: "1636809725003"}
    },
    error: new Error("Ошибка")
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