import React from "react";
import ReactDOMServer from "react-dom/server";
import LandingPage from "./LandingPage";
import htmlTemplate from "../../../common/htmlTemplate";
import {PATH} from "./constants"

const TITLE = "Репетитор по математике"
const DESC = "Обо мне. Об уроках. Отзывы. Контакты."

const result = body => ({
    statusCode: 200,
    headers: {
        "Content-Type": "text/html; charset=UTF-8"
    },
    body,
    isBase64Encoded: false
})

export async function handler() {
    const layout = ReactDOMServer.renderToString(<LandingPage path={PATH}/>)
    return result(htmlTemplate({
        layout,
        title: TITLE,
        description: DESC,
        path: PATH
    }))
}