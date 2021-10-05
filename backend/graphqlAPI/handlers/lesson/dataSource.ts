import {DataSource, Lesson} from "./resolvers";
import type {DynamoNumber, DynamoString} from "dynamoDBAPI";

type GetDataSource = (dbAPI: DbAPI) => DataSource
type DbAPI = {
    getItem: (tableName: string, key: Key) => Promise<Item>
}
type Key = {
    id: DynamoNumber
}
type Item = {
    id: DynamoNumber,
    title: DynamoString,
    finalTestId?: DynamoNumber
}

export const getDataSource: GetDataSource = (dbAPI) => {

    const {getItem} = dbAPI

    const get = async (id: number) : Promise<Lesson> => {
        const {title, finalTestId} = await getItem("lessons", {id: {N: String(id)}})
        return {
            id,
            title: title.S,
            finalTestId: finalTestId ? Number(finalTestId.N) : null
        }
    }

    return {get}
}