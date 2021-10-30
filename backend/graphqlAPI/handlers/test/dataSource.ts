import {DataSource, Get} from "./resolvers";
import type {DynamoBoolean, DynamoList, DynamoMap, DynamoNumber} from "dynamoDBAPI";

type GetDataSource = (dbAPI: DbAPI) => DataSource
type DbAPI = {
    getItem: (tableName: string, key: Key) => Promise<Item>
}
type Key = {
    id: DynamoNumber
}
type Item = {
    id: DynamoNumber,
    exercises: DynamoList<DynamoMap<Exercise>>
}
type Exercise = {
    problemIdList: DynamoList<DynamoNumber>,
    withDetailedAnswer?: DynamoBoolean,
    maxEstimate: DynamoNumber
}

export const getDataSource: GetDataSource = (dbAPI) => {

    const {getItem} = dbAPI

    const get: Get = async filter => {
        const {id} = filter
        const {exercises} = await getItem("tests", {id: {N: String(id)}})
        return {
            id,
            exercises: exercises.L.map(({M}) => {
                const {problemIdList, withDetailedAnswer, maxEstimate} = M
                return {
                    problemIdList: problemIdList.L.map(id => Number(id.N)),
                    withDetailedAnswer: withDetailedAnswer ? withDetailedAnswer.BOOL : false,
                    maxEstimate: Number(maxEstimate.N)
                }
            }),
        }
    }

    return {get}
}