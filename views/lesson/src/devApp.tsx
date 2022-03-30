import React from 'react';
import {render} from "../../common/appRender";
import AppDevProvider from "../../common/components/smarts/AppDevProvider";
import {query} from "./queries";
import Page from "./Page";
import {getIdParam, getParam} from "../../common/paramsGetter";
import {GraphQLError} from "graphql";

const mocks = [{
    request: {
        query: query,
        variables: {id: 1, studentId: null}
    },
    result: {
        data: {
            lesson: {
                id: 1,
                isExamples: true,
                title: "Градусная и радианная мера на числовой окружности.",
                finalTest: {
                    id: 100,
                    state: "NEW",
                    results: []
                }
            }
        }
    }
}, {
    request: {
        query: query,
        variables: {id: 2, studentId: null}
    },
    result: {
        data: {
            lesson: {
                id: 1,
                isExamples: false,
                title: "Градусная и радианная мера на числовой окружности.",
                finalTest: {
                    id: 100,
                    state: "NEW",
                    results: [{
                        msTimeStamp: "1633089600123",
                        percentage: 80,
                        finishedTimeStamp: 1633089700
                    }, {
                        msTimeStamp: "1633089700123",
                        percentage: 0,
                        finishedTimeStamp: 1633089800
                    }, {
                        msTimeStamp: "1633089800123",
                        percentage: 60,
                        finishedTimeStamp: 1633089900
                    }, {
                        msTimeStamp: "1633089900123",
                        percentage: 100,
                        finishedTimeStamp: 1633090000
                    }, {
                        msTimeStamp: "1633091000123",
                        percentage: 50,
                        finishedTimeStamp: 1633091100
                    }, {
                        msTimeStamp: "1633091100123",
                        percentage: 23,
                        finishedTimeStamp: 1633091200
                    }, {
                        msTimeStamp: "1633091200123",
                        percentage: 66,
                        finishedTimeStamp: 1633091300
                    }, ]
                }
            }
        }
    }
}, {
    request: {
        query: query,
        variables: {id: 2, studentId: "1"}
    },
    result: {
        data: {
            lesson: {
                id: 1,
                isExamples: false,
                title: "Градусная и радианная мера на числовой окружности.",
                finalTest: {
                    id: 100,
                    state: "NOT_FINISHED",
                    results: [{
                        msTimeStamp: "1633089600123",
                        percentage: 80,
                        finishedTimeStamp: 1633089700
                    }, {
                        msTimeStamp: "1633089700123",
                        percentage: 0,
                        finishedTimeStamp: 1633089800
                    }, {
                        msTimeStamp: "1633089800123",
                        percentage: 60,
                        finishedTimeStamp: 1633089900
                    }, {
                        msTimeStamp: "1633089900123",
                        percentage: 100,
                        finishedTimeStamp: 1633090000
                    }, {
                        msTimeStamp: "1633091000123",
                        percentage: 50,
                        finishedTimeStamp: 1633091100
                    }, {
                        msTimeStamp: "1633091100123",
                        percentage: 23,
                        finishedTimeStamp: 1633091200
                    }, {
                        msTimeStamp: "1633091200123",
                        percentage: 66,
                        finishedTimeStamp: null
                    }, ]
                }
            }
        }
    }
}, {
    request: {
        query: query,
        variables: {id: 3, studentId: null}
    },
    result: {
        data: {
            lesson: {
                id: 1,
                isExamples: false,
                title: "Градусная и радианная мера на числовой окружности.",
                finalTest: {
                    id: 100,
                    state: "NOT_CHECKED",
                    results: [{
                        msTimeStamp: "1633089600123",
                        percentage: 80,
                        finishedTimeStamp: 1633089700
                    }]
                }
            }
        }
    }
}, {
    request: {
        query: query,
        variables: {id: 4, studentId: null}
    },
    result: {
        data: {
            lesson: {
                id: 100,
                isExamples: true,
                title: "Определение множества значений по точкам на числовой окружности.",
                finalTest: null
            }
        }
    }
}, {
    request: {
        query: query,
        variables: {id: 5, studentId: null}
    },
    result: {
        errors: [new GraphQLError("Ошибка")]
    }
}, {
    request: {
        query: query,
        variables: {id: 6, studentId: null}
    },
    error: new Error("Ошибка")
}]

const app = <App/>
render(app)

function App() {

    const handleFail = error => console.error(error)

    return (
        <AppDevProvider mocks={mocks}>
            <Page studentId={getParam("studentId")} id={getIdParam()} onFail={handleFail}/>
        </AppDevProvider>
    )
}