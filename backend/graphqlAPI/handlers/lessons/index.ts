import {resolvers} from "./resolvers";
import {subgraphHandler} from "apolloSubgraphHandler";
import {typeDefs} from "./schema";
import {getDataSource} from "./dataSource";
import {dbAPI} from "dynamoDBAPI";
import type {DataSource} from "./lessons"

export const handler = async (event, context) => {
    const dataSource: DataSource = {
        lessons: getDataSource(dbAPI)
    }
    return subgraphHandler(event, context, {typeDefs, resolvers, dataSource})
}