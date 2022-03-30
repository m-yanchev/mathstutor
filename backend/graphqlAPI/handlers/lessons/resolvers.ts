import type {Context, Lesson, LessonArgs, LessonsParent} from "./lessons";

const lesson = async (_, args: LessonArgs, context: Context): Promise<Lesson | null> => {
    const {dataSource} = context
    const {id} = args
    const {lessons} = dataSource
    const {get} = lessons
    return get({id})
}

const lessons = (parent: LessonsParent, _, context: Context): Promise<Lesson[]> => {
    const {dataSource} = context
    const {lessonIdList} = parent
    const {lessons} = dataSource
    const {get} = lessons
    return Promise.all(lessonIdList.map(id => get({id})))
}

export const resolvers = {
    Query: {
        lesson
    },
    Course: {
        lessons
    }
}