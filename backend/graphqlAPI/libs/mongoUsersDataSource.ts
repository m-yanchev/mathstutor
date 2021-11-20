import {find, findOne, insertOne, deleteOne, updateOne} from "./mongoDBDataSource";
import {UsersDataSource} from "./User";
import {getHash, getSecret} from "./userToken";

const getAccess = async user => {
    if (!user) return null
    const profile = await findOne("users", user)
    return profile ? profile.access : null
}

const getStudents = async () => {
    return await find("users", {access: "student", appointmentId: {$exists: true}})
}

const getUser = filter => {
    return findOne("users", filter)
}

const getProfile = async user => {
    const {id, token} = user
    const filter = token ? {id, token} : {id}
    return await findOne("users", filter) || null
}

const put = async data => {
    const {name, email, password} = data
    const secret = await getSecret()
    const token = await getHash(password, secret)
    return {
        id: await insertOne("users", {name, email, secret, token})
    }
}

const remove = async filter => {
    await deleteOne("users", filter)
}

const update = async (user, data) => {
    await updateOne("users", user, data)
}

const updatePassword = async (user, password) => {
    const secret = await getSecret()
    const token = await getHash(password, secret)
    await updateOne("users", user, {secret, token})
}

export const usersDataSource: UsersDataSource = {
    getAccess, getStudents, getUser, getProfile, put, remove, update, updatePassword
}