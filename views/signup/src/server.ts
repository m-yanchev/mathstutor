import htmlTemplate from "../../../common/htmlTemplate";
import {DESC, PATH, TITLE} from "./constants"

const result = body => ({
    statusCode: 200,
    headers: {
        "Content-Type": "text/html; charset=UTF-8"
    },
    body,
    isBase64Encoded: false
})

export async function handler() {
    return result(htmlTemplate({
        title: TITLE,
        description: DESC,
        path: PATH
    }))
}