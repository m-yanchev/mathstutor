type ExerciseParent = {
    problemId: number
}
type Context = {
    dataSource: DataSource
}
export type DataSource = {
    get: (id: number) => Promise<Problem>
}
export type Problem = {
    id: number,
    commonDesc: string | null,
    desc: string,
    imageAlt: string | null,
    answer: string | null
}

const problem = (parent: ExerciseParent, _, context: Context): Promise<Problem> => {
    const {dataSource} = context
    const {problemId} = parent
    const {get} = dataSource
    return get(problemId)
}

export const resolvers = {
    Exercise: {
        problem
    }
}