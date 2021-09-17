import {Course, DataSource} from "./resolvers";

type GetDataSource = (dbAPI: DbAPI) => DataSource
type DbAPI = {
    getItem: (tableName: string, key: Key) => Promise<Item>
}
type Key = {
    title: Title
}
type Item = {
    title: Title,
    lessonTitles: LessonTitles
}
type LessonTitles = {L: Array<Title>}
type Title = {S: string}

export const getDataSource: GetDataSource = (dbAPI) => {

    const {getItem} = dbAPI

    const get = async (title: string) : Promise<Course> => {
        const {lessonTitles} = await getItem("courses", {title: {S: title}})
        return {
            title,
            lessonTitles: lessonTitles.L.map(title => title.S)
        }
    }

    return {get}
}