type Parent = {
    courseTitle: string
}
type Context = {
    dataSource: DataSource
}
export type DataSource = {
    get: (title: string) => Promise<Course>
}
export type Course = {
    title: string,
    lessonTitles: Array<string>
}

const course = (parent: Parent, args, context: Context) => {
    const {dataSource} = context
    const title = parent.courseTitle
    const {get} = dataSource
    return get(title)
}

export const resolvers = {
    Appointment: {
        course
    }
}