import {setUser} from "../../graphqlAPI/libs/expressSessionsAPI";
import {getHash} from "../../graphqlAPI/libs/userToken";

const serverlessExpress = require('@vendia/serverless-express');
const {useSession} = require("../../graphqlAPI/libs/expressSessionsAPI");
const {findOne, updateOne} = require("../../graphqlAPI/libs/mongoDBDataSource");

const express = require('express')
const app = express()

function sendResult(res, message) {
    if (message === "OK") res.status(200).send(JSON.stringify({ok: true}))
    else res.status(400).send(JSON.stringify({ok: false, error: message}))
}

async function confirmedById(id) {
    const user = await findOne("users", {id})
    if (user.emailConfirmed) return null
    await updateOne("users", {id: user.id}, {emailConfirmed: true})
    return user
}

async function getUser({email, password}) {
    const user = await findOne("users", {email})
    if (user) {
        const hash = await getHash(password, user.secret)
        if (user.token === hash) return user
    }
    return null
}

async function signIn(req, res) {
    const {body} = req
    const {id, email, password} = body
    let user
    if (id) {
        user = await confirmedById(id)
        if (!user) {
            sendResult(res, "EMAIL_ALREADY_CONFIRMED")
            return
        }
    } else {
        user = await getUser({email, password})
        if (!user) {
            sendResult(res, "LOGIN_OR_PASSWORD_INCORRECT")
            return
        }
        if (!user.emailConfirmed) sendResult(res,"EMAIL_NOT_CONFIRMED")
    }
    setUser(req.session, {id: user.id, token: user.token})
    sendResult(res, "OK")
}

useSession(app)
app.use(express.json())
app.use(signIn)

exports.handler = serverlessExpress({app})