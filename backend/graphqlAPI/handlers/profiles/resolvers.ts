import {UserAPI} from "apolloSubgraphHandler";
import {Profile, UsersDataSource} from "User";
import type {PostTransport} from "PostTransport";

export type Context = {
    dataSource: DataSource,
    userAPI: UserAPI,
}

type ProfileArgs = {
    id?: string
}

type UpdatePasswordArgs = {
    password: string
}

type DataSource = {
    users: UsersDataSource
    postTransport: PostTransport
}

const sendLink = ({email, id, name}, postTransport: PostTransport) => {

    const subject = `Подтверждение адреса электроной почты на сайте https://mathstutor.ru`

    const html = `
        <p>Здравствуйте, ${name}!</p>
        <p>Этот адрес электронной почты был указан при регистрации на сайте https://mathstutor.ru.</p>
        <p>Для подтверждения того, что указанный адрес действительно Ваш перейдите по ` +
        `<a href="https://mathstutor.ru/form/sign-in?id=${id}">ссылке</a>.</p>
        <p>Если Вы не регистрировались на сайте https://mathstutor.ru проигнорируйте это письмо</p>
    `

    return postTransport.sendEmail({email, html, subject})
}

const profile = async (_, args: ProfileArgs, context: Context) => {
    const {id} = args
    const {userAPI, dataSource} = context
    const {users} = dataSource
    const {getProfile, getUser} = users
    const {user} = userAPI
    if (id) return getUser({id})
    else return user ? getProfile(user) : null
}

const students = async (_, __, context: Context): Promise<Profile[] | null> => {
    const {userAPI, dataSource} = context
    const {getAccess, getStudents} = dataSource.users
    if (await getAccess(userAPI.user) === "tutor") return getStudents()
    return null
}

const update = async (_, args, context: Context) => {
    const {name} = args
    const {userAPI, dataSource} = context
    const {user} = userAPI
    const {users} = dataSource
    const {update, getAccess} = users
    if (Boolean(await getAccess(user))) {
        if (!user) throw new Error("Ожидается что user существует")
        await update(user, {name})
    }
    else throw new Error("Access denied")
    return {ok: true}
}

const updatePassword = async (_, args: UpdatePasswordArgs, context: Context) => {
    const {password} = args
    const {userAPI, dataSource} = context
    const {user} = userAPI
    const {users} = dataSource
    const {updatePassword, getAccess} = users
    if (await getAccess(user)) {
        if (!user) throw new Error("Ожидается что user существует")
        await updatePassword(user, password)
    }
    else throw new Error("Access denied")
    return {ok: true}
}

const signUp = async (_, args, context: Context) => {
    const {name, email, password} = args
    const {dataSource} = context
    const {users, postTransport} = dataSource
    const {getUser, put, remove} = users
    const user = await getUser({email})
    if (user) return {ok: false, error: "email_already_exists"}
    const {id} = await put({name, email, password})
    try {
        await sendLink({email, id, name}, postTransport)
        return {ok: true}
    } catch (e) {
        await remove({id})
        throw e
    }
}

export const resolvers = {
    Query: {
        profile,
        students
    },
    Mutation: {
        updateProfile: update,
        updatePassword,
        signUp
    }
}