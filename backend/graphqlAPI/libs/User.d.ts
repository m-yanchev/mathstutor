export type User = {
    id: string,
    token: string
}

export interface UsersDataSource {
    getAccess: GetAccess,
    getStudents: GetUsers,
    getProfile: GetProfile,
    update: Update,
    updatePassword: UpdatePassword,
    put: Put
    remove: Remove
}

type GetAccess = (user: User | null) => Promise<Access | null>
type GetUsers = () => Promise<Profile[]>
type GetProfile = (filter: GetProfileFilter) => Promise<Profile | null>
type Update = (user: User, data: UpdateData) => Promise<void>
type UpdatePassword = (user: User, password: string) => Promise<void>
type Put = (data: PutData) => Promise<PutResult>
type Remove = (filter: RemoveFilter) => Promise<void>
type Profile = {
    id: string,
    name: string
    email: string
    secret: string
    token: string
    emailConfirmed: boolean
    appointmentId?: string
    access: Access
}
type UpdateData = {
    name: string
}
type GetProfileFilter = {
    id?: string
    email?: string
}
type RemoveFilter = {
    id: string
}
type PutResult = {
    id: string
}
type PutData = {
    name: string
    email: string
    password: string
}

export type Access = "student" | "tutor"