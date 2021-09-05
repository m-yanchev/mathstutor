import htmlTemplate from "../../../common/htmlTemplate";
import {templateData} from "./config"

const result = body => ({
    statusCode: 200,
    headers: {
        "Content-Type": "text/html; charset=UTF-8"
    },
    body,
    isBase64Encoded: false
})

export async function handler(event) {
    return result(htmlTemplate(templateData[event.params.model || "root"]))
}