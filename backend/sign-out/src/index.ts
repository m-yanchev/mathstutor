const serverlessExpress = require('@vendia/serverless-express');
const {useSession} = require("../../graphqlAPI/libs/expressSessionsAPI");

const express = require('express')
const app = express()

function sendResult(res, message) {
    if (message === "OK") res.status(200).send(JSON.stringify({ok: true}))
    else res.status(400).send(JSON.stringify({ok: false, error: message}))
}

async function signOut(req, res) {
    req.session.destroy(error => {
        if (error) sendResult(res, "SIGN_OUT_FAILED")
        sendResult(res, "OK")
    })
}

useSession(app)
app.use(signOut)

exports.handler = serverlessExpress({ app })