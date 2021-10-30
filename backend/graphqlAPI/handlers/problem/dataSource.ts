import {DataSource, Problem} from "./resolvers";
import type {DynamoNumber, DynamoString} from "dynamoDBAPI";

type GetDataSource = (dbAPI: DbAPI) => DataSource
type DbAPI = {
    getItem: (tableName: string, key: Key) => Promise<Item>
}
type Key = {
    id: DynamoNumber
}
export type Item = {
    id: DynamoNumber,
    desc: DynamoString,
    answer?: DynamoString
}

export const getDataSource: GetDataSource = (dbAPI) => {

    const {getItem} = dbAPI

    const get = async (id: number) : Promise<Problem> => {
        const {desc, answer} = await getItem("problems", {id: {N: String(id)}})
        return {
            id,
            desc: desc.S,
            answer: answer ? answer.S : null
        }
    }

    return {get}
}