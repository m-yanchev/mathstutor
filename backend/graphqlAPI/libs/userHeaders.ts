import {User} from "./User";

export type SetUserToHeader = (name: string, value: string) => void
export type GetUserFromHeader = (name: string) => string

export const setUserToHeaders = (method: SetUserToHeader, user: User) => {
    if (user.id && user.token) {
        method("x-user-id", user.id)
        method("x-user-token", user.token)
    }
}

export const getUserFromHeaders = (method: GetUserFromHeader): User | null => {
    const user: User = {
        id: method("x-user-id"),
        token: method("x-user-token")
    }
    if (user.id && user.token) {
        return user
    } else return null
}