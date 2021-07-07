import React from "react";
import ReactDOMServer from 'react-dom/server';

export async function handler() {
    const elem = <div>Hello World!</div>
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "text/html; charset=UTF-8"
        },
        body: ReactDOMServer.renderToString(elem),
        isBase64Encoded: false
    }
}