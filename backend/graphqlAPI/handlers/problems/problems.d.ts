import {DynamoMap, DynamoNumber, DynamoString} from "../../libs/dynamoDBAPI";

interface Context {
    dataSource: DataSource
}

interface DataSource {
    problems: ProblemsDataSource
}

type GetDataSource = (dbAPI: DbAPI) => ProblemsDataSource

interface ProblemsDataSource {
    get: (filter: GetFilter) => Promise<Problem>
}

interface GetFilter {
    id: number
}

interface Problem {
    id: number
    commonDesc: string | null
    desc: string
    illus: Illus | null
    solution: Solution | null
    answer: string | null
}

interface Solution {
    desc: string
    illus: Illus | null
}

interface Illus {
    name: string | null
}

interface ProblemParent {
    problemId: number
}

interface ProblemsParent {
    exampleIdList: number[]
}

interface DbAPI {
    getItem: (tableName: string, key: Key) => Promise<Item>
}

interface Key {
    id: DynamoNumber
}

interface Item {
    id: DynamoNumber
    commonDesc?: DynamoString
    desc: DynamoString
    illus?: IllusItem
    solution?: SolutionItem
    answer?: DynamoString
}

type SolutionItem = DynamoMap<{
    desc: DynamoString
    illus: IllusItem
}>

type IllusItem = DynamoMap<{
    name?: DynamoString
}>