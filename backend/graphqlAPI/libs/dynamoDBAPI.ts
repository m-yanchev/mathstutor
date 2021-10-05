import {
    DynamoDBClient,
    GetItemCommand,
    ScanCommand
} from "@aws-sdk/client-dynamodb";
import {
    DynamoDBClientConfig,
    GetItemCommandInput,
    ScanCommandInput,
    GetItemCommandOutput
} from "@aws-sdk/client-dynamodb/dist/types/ts3.4";
import {DB_CREDENTIALS} from "./accessConsts";

type GetItem = (tableName: string, key: any) => Promise<any>
export type DynamoNumber = {N: string}
export type DynamoString = {S: string}
export type DynamoNumberList = {L: DynamoNumber[]}

type GetItems = (tableName: string, filter: Filter) => Promise<any>
type Filter = {
    expression: string,
    values: any
}

const CONFIG: DynamoDBClientConfig = {
    credentials: DB_CREDENTIALS,
    region: "eu-central-1"
}

const getItem: GetItem = async (tableName, key) => {
    const client = new DynamoDBClient(CONFIG)
    const params: GetItemCommandInput = {Key: key, TableName: tableName}
    const command: GetItemCommand = new GetItemCommand(params)
    const response: GetItemCommandOutput = await client.send(command)
    return response?.Item
}

const getItems: GetItems = async (tableName, filter) => {
    const client = new DynamoDBClient(CONFIG)
    const params: ScanCommandInput = {
        FilterExpression: filter.expression,
        ExpressionAttributeValues: filter.values,
        TableName: tableName}
    const command: ScanCommand = new ScanCommand(params)
    const response = await client.send(command)
    return response.Items
}

export const dbAPI = {getItem, getItems}