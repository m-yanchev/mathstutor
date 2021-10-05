import type {UserAPI} from "apolloSubgraphHandler";

type Context = {
    dataSource: DataSource,
    userAPI: UserAPI
}
export type DataSource = {
    get: Get
}
export type Get = (filter: Filter) => Promise<TestResult[]>
type Filter = {
    userId: string,
    testId: number
}
type Parent = {
    id: number
}
export type TestResult = {
    timeStamp: number,
    percent: number
}

const results = (parent: Parent, _, context: Context) => {
    const {dataSource, userAPI} = context
    const {user} = userAPI
    const {get} = dataSource
    return user ? get({userId: user.id, testId: parent.id}) : []
}

export const resolvers = {
    Test: {
        results
    }
}