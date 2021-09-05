import {sendEmail} from "postTransportAPI";
import {getHash, getSecret} from "userToken";

const sendLink = ({email, id, name}) => {

    const subject = `Подтверждение адреса электроной почты на сайте https://mathstutor.ru`

    const html = `
        <p>Здравствуйте, ${name}!</p>
        <p>Этот адрес электронной почты был указан при регистрации на сайте https://mathstutor.ru.</p>
        <p>Для подтверждения того, что указанный адрес действительно Ваш перейдите по ` +
        `<a href="https://mathstutor.ru/form/sign-in?id=${id}">ссылке</a>.</p>
        <p>Если Вы не регистрировались на сайте https://mathstutor.ru проигнорируйте это письмо</p>
    `

    return sendEmail({email, html, subject})
}

const profile = async (parent, args, context) => {
    const {mongoAPI, userAPI} = context
    const {findOne} = mongoAPI
    if (userAPI.user) return await findOne("users", userAPI.user)
    return null
}

const update = async (parent, args, context) => {
    const {name} = args
    const {userAPI, mongoAPI} = context
    const {user} = userAPI
    const {updateOne} = mongoAPI
    if (user) await updateOne("users", user, {name})
    else throw new Error("Access denied")
    return {ok: true}
}

const signUp = async (parent, args, context) => {
    const {name, email, password} = args
    const {findOne, insertOne, deleteOne} = context.mongoAPI
    const user = await findOne("users", {email})
    if (user) return {ok: false, error: "email_already_exists"}
    const secret = await getSecret()
    const token = await getHash(password, secret)
    const id = await insertOne("users", {name, email, secret, token})
    try {
        await sendLink({email, id, name})
        return {ok: true}
    } catch (e) {
        await deleteOne("users", {id})
        throw e
    }
}

export const resolvers = {
    Query: {
        profile
    },
    Mutation: {
        updateProfile: update,
        signUp
    }
}