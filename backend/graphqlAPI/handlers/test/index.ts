import {resolvers} from "./resolvers";
import {subgraphHandler} from "apolloSubgraphHandler";
import {typeDefs} from "./schema";
import {DataSource} from "./resolvers";
import {getDataSource} from "./dataSource";
import {dbAPI} from "dynamoDBAPI";

export const handler = async (event, context) => {
    const dataSource: DataSource = getDataSource(dbAPI)
    return subgraphHandler(event, context, {typeDefs, resolvers, dataSource})
}