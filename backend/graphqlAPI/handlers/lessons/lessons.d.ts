import type {DynamoList, DynamoNumber, DynamoString} from "../../libs/dynamoDBAPI";

interface Context {
    dataSource: DataSource
}

interface DataSource {
    lessons: LessonsDataSource
}

type GetDataSource = (dbAPI: DbAPI) => LessonsDataSource

interface LessonArgs {
    id: number
}

interface LessonsParent {
    lessonIdList: number[]
}

interface LessonsDataSource {
    get: (filter: GetFilter) => Promise<Lesson>
}

interface Lesson {
    id: number
    title: string
    isExamples: boolean
    exampleIdList: number[]
    finalTestId: number | null
}

interface LessonResponse {
    id?: string
    title?: string
    isExamples?: boolean
    exampleIdList?: string[]
    finalTestId?: string | null
}

interface DbAPI {
    getItem: (tableName: string, key: Key) => Promise<Item>
}

interface GetFilter {
    id: number
}

interface Key {
    id: DynamoNumber
}

interface Item {
    id: DynamoNumber,
    title: DynamoString,
    exampleIdList: DynamoList<DynamoNumber>
    finalTestId?: DynamoNumber
}