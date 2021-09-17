// version 1.0.0

import {DynamoDBClient, GetItemCommand} from "@aws-sdk/client-dynamodb";
import {
    DynamoDBClientConfig,
    GetItemCommandInput
} from "@aws-sdk/client-dynamodb/dist/types/ts3.4";
import {DB_CREDENTIALS} from "./accessConsts";

type GetItem = (tableName: string, key: any) => Promise<any>

const CONFIG: DynamoDBClientConfig = {
    credentials: DB_CREDENTIALS,
    region: "eu-central-1"
}

const makeRequest = async (command: GetItemCommand) => {
    const client = new DynamoDBClient(CONFIG);
    return await client.send(command);
}

const getItem: GetItem = async (tableName, key) => {
    const params: GetItemCommandInput = {Key: key, TableName: tableName}
    const command = new GetItemCommand(params)
    const response = await makeRequest(command)
    return response?.Item
}

export const dbAPI = {getItem}