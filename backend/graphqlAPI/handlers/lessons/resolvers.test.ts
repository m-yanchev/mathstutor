import {getDataSource} from "./dataSource";
import {dbAPI} from "../../libs/dynamoDBAPI";
import {resolvers} from "./resolvers";
import {gql} from "apollo-server";
import {typeDefs} from "./schema";
import {getTestServer} from "../../libs/apolloSubgraphHandler";
import {DataSource, Lesson, LessonResponse} from "./lessons";


describe("lesson server", () => {

    const query = gql`
        query Lesson($id: ID!) {
            lesson(id: $id) {
                id
                title
                isExamples
                finalTestId
            }
        }
    `
    const variables = {id: 1}
    const dataSource: DataSource = {
        lessons: getDataSource(dbAPI)
    }

    test("Получить урок", async () => {
        const result: LessonResponse = {
            id: "1",
            title: "Градусная и радианная мера на числовой окружности.",
            isExamples: false,
            finalTestId: "100"
        }
        const server = await getTestServer({typeDefs, resolvers, dataSource})
        const response = await server.executeOperation({query, variables})
        await expect(response.data?.lesson).toEqual(result)
    })
})

const context = {dataSource: {lessons: getDataSource(dbAPI)}}

describe("lesson", () => {
    const args = {id: 1}
    test("Получить урок", async () => {
        const result: Lesson = {
            id: 1,
            title: "Градусная и радианная мера на числовой окружности.",
            isExamples: false,
            exampleIdList: [],
            finalTestId: 100
        }
        const response = await resolvers.Query.lesson({}, args, context)
        await expect(response).toEqual(result)
    })
})

describe("lessons", () => {
    const parent = {lessonIdList: [1, 2, 3]}
    test("Получить список уроков", async () => {
        const result: Lesson[] = [{
            id: 1,
            title: "Градусная и радианная мера на числовой окружности.",
            isExamples: false,
            exampleIdList: [],
            finalTestId: 100
        }, {
            id: 2,
            title: "Определение множества значений по точкам на числовой окружности.",
            isExamples: false,
            exampleIdList: [],
            finalTestId: 2
        }, {
            id: 3,
            title: "Синус и косинус на числовой окружности.",
            isExamples: false,
            exampleIdList: [],
            finalTestId: 3
        }]
        const response = await resolvers.Course.lessons(parent, {}, context)
        await expect(response).toEqual(result)
    })
})