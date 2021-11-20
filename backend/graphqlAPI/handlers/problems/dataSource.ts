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
    commonDesc?: DynamoString,
    desc: DynamoString,
    imageAlt?: DynamoString,
    answer?: DynamoString
}

export const getDataSource: GetDataSource = (dbAPI) => {

    const {getItem} = dbAPI

    const get = async (id: number) : Promise<Problem> => {
        const {commonDesc, desc, imageAlt, answer} = await getItem("problems", {id: {N: String(id)}})
        return {
            id,
            commonDesc: commonDesc ? commonDesc.S : null,
            desc: desc.S,
            imageAlt: imageAlt ? imageAlt.S : null,
            answer: answer ? answer.S : null
        }
    }

    return {get}
}