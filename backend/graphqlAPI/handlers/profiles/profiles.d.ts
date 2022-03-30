import {UsersDataSource} from "../../libs/User";
import {PostTransport} from "../../libs/PostTransport";
import {UserAPI} from "../../libs/apolloSubgraphHandler";

export interface Profile {
    id: string,
    name: string
    email: string
    emailConfirmed?: boolean
    appointmentId?: string
    access?: Access
}

export interface ProfileResponse {
    id?: string | null
    name?: string | null
    email?: string | null
    emailConfirmed?: boolean | null
    appointmentId?: string | null
    access?: Access | null
}

type Access = "tutor" | "student"

export interface Context {
    dataSource: DataSource,
    userAPI: UserAPI,
}

export interface DataSource {
    users: UsersDataSource
    postTransport: PostTransport
}

export interface ProfileArgs {
    id?: string
}

export type UpdatePasswordArgs = {
    password: string
}