type CourseParent = {
    lessonIdList: number[]
}
type Context = {
    dataSource: DataSource
}
export type DataSource = {
    get: (id: number) => Promise<Lesson>
}
export type Lesson = {
    id: number,
    title: string,
    finalTestId: number | null
}
type Args = {
    id: number
}

const lesson = (_, args: Args, context: Context): Promise<Lesson> => {
    const {dataSource} = context
    const {id} = args
    const {get} = dataSource
    return get(id)
}

const lessons = (parent: CourseParent, _, context: Context): Promise<Lesson[]> => {
    const {dataSource} = context
    const {lessonIdList} = parent
    const {get} = dataSource
    return Promise.all(lessonIdList.map(id => get(id)))
}

export const resolvers = {
    Query: {
        lesson
    },
    Course: {
        lessons
    }
}