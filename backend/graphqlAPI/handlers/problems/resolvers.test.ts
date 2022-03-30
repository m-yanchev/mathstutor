import {resolvers} from "./resolvers";
import {getDataSource} from "./dataSource";
import {dbAPI} from "../../libs/dynamoDBAPI";
import {Problem, ProblemsParent} from "./problems";

const context = {
    dataSource: {
        problems: getDataSource(dbAPI)
    }
}

describe("problems problem resolver", () => {

    test("Получить задачу без commonDesc, illus и solution", async () => {
        const parent = {problemId: 1}
        const result = {
            id: 1,
            commonDesc: null,
            desc: "5+5",
            illus: null,
            solution: null,
            answer: "10"
        }

        const response = await resolvers.Exercise.problem(parent, {}, context)
        await expect(response).toEqual(result)
    })

    test("Получить задачу с commonDesc и imageAlt", async () => {
        const parent = {problemId: 2}
        const result = {
            id: 2,
            commonDesc: "Вычислите:",
            desc: "5+2",
            illus: {
                name: null
            },
            solution: null,
            answer: "7"
        }

        const response = await resolvers.Exercise.problem(parent, {}, context)
        await expect(response).toEqual(result)
    })
})

describe("problems problems resolver", () => {

    test("Получить список примеров", async () => {

        const parent: ProblemsParent = {
            exampleIdList: [1, 2, 3]
        }

        const result: Problem[] = [{
            id: 1,
            commonDesc: null,
            desc: "5+5",
            illus: null,
            solution: null,
            answer: "10"
        }, {
            id: 2,
            commonDesc: "Вычислите:",
            desc: "5+2",
            illus: {
                name: null
            },
            solution: null,
            answer: "7"
        }, {
            id: 3,
            commonDesc: null,
            desc: "5+7",
            illus: null,
            solution: {
                desc: "Некоторое решение",
                illus: {
                    name: "image1"
                }
            },
            answer: "12"
        }]

        const response = await resolvers.Lesson.examples(parent, {}, context)
        await expect(response).toEqual(result)
    })
})