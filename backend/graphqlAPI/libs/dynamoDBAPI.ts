import {
    DeleteItemCommand,
    DynamoDBClient,
    GetItemCommand, PutItemCommand,
    ScanCommand, UpdateItemCommand
} from "@aws-sdk/client-dynamodb";
import {
    DynamoDBClientConfig,
    GetItemCommandInput,
    ScanCommandInput,
    GetItemCommandOutput,
    PutItemCommandInput,
    UpdateItemCommandInput,
    DeleteItemCommandInput
} from "@aws-sdk/client-dynamodb/dist/types/ts3.4";
import {DB_CREDENTIALS} from "./accessConsts";

type GetItem = (tableName: string, key: any) => Promise<any>
type PutItem = (tableName: string, item: any) => Promise<void>
type UpdateItem = (tableName: string, key: any, attributeUpdates: any) => Promise<void>
type DeleteItem = (tableName: string, key: any) => Promise<void>
export type DynamoNumber = {N: string}
export type DynamoString = {S: string}
export type DynamoNumberList = {L: DynamoNumber[]}
export type DynamoList<T> = {L: T[]}
export type DynamoMap<T> = {M: T}
export type DynamoBoolean = {BOOL: boolean}
export type DynamoNull = {"NULL": true}

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
        TableName: tableName
    }
    const command: ScanCommand = new ScanCommand(params)
    const response = await client.send(command)
    return response.Items
}

const putItem: PutItem = async (tableName, item) => {
    const client = new DynamoDBClient(CONFIG)
    const params: PutItemCommandInput = {Item: item, TableName: tableName}
    const command: PutItemCommand = new PutItemCommand(params)
    await client.send(command)
}

const updateItem: UpdateItem = async (tableName, key, updateData) => {
    const client = new DynamoDBClient(CONFIG)
    const params: UpdateItemCommandInput = {
        Key: key,
        UpdateExpression: updateData.expression,
        ExpressionAttributeValues: updateData.values,
        TableName: tableName}
    const command: UpdateItemCommand = new UpdateItemCommand(params)
    await client.send(command)
}

const deleteItem: DeleteItem = async (tableName, key) => {
    const client = new DynamoDBClient(CONFIG)
    const params: DeleteItemCommandInput = {Key: key, TableName: tableName}
    const command: DeleteItemCommand = new DeleteItemCommand(params)
    await client.send(command)
}

export const dbAPI = {getItem, getItems, putItem, updateItem, deleteItem}