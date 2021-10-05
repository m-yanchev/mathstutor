type Parent = {
    courseId: number
}
type Context = {
    dataSource: DataSource
}
export type DataSource = {
    get: (id: number) => Promise<Course>
}
export type Course = {
    id: number,
    title: string,
    lessonIdList: number[]
}

const course = (parent: Parent, args, context: Context) => {
    const {dataSource} = context
    const id = parent.courseId
    const {get} = dataSource
    return get(id)
}

export const resolvers = {
    Appointment: {
        course
    }
}