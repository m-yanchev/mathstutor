import {DataSource, Get} from "./resolvers";
import type {DynamoNumber, DynamoString} from "dynamoDBAPI";

type GetDataSource = (dbAPI: DbAPI) => DataSource
type DbAPI = {
    getItems: (tableName: "testResults", filter: Filter) => Promise<Item[]>
}
type Filter = {
    expression: "testId = :testId and userId = :userId",
    values: FilterValues
}
type FilterValues = {
    ":testId": DynamoNumber,
    ":userId": DynamoString
}
type Item = {
    timeStamp: DynamoNumber,
    percent: DynamoNumber
}

export const getDataSource: GetDataSource = (dbAPI) => {

    const {getItems} = dbAPI

    const get: Get = async filter => {
        const {userId, testId} = filter
        const items = await getItems("testResults", {
            expression: "testId = :testId and userId = :userId",
            values: {":testId": {N: String(testId)}, ":userId": {S: userId}}
        })
        return items.map(item => ({
            userId: userId,
            testId: testId,
            percent: Number(item.percent.N),
            timeStamp: Number(item.timeStamp.N)
        }))
    }

    return {get}
}