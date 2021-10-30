import React from "react";
import ReactDOMServer from "react-dom/server";
import htmlTemplate from "../../../common/htmlTemplate";
import App from "./App";
import {ServerStyleSheets} from "@mui/styles";

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
    const sheets = new ServerStyleSheets()
    const layout = ReactDOMServer.renderToString(sheets.collect(<App/>))
    return result(htmlTemplate({
        layout,
        title: TITLE,
        description: DESC,
        path: "/about/",
        cssString: sheets.toString(),
        ver: 2
    }))
}