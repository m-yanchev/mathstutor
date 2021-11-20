import {resolvers} from "./resolvers";
import {subgraphHandler} from "apolloSubgraphHandler";
import {typeDefs} from "./schema";
import {getDataSource} from "./dataSource";
import {dbAPI} from "dynamoDBAPI";
import {usersDataSource} from "mongoUsersDataSource"

export const handler = async (event, context) => {
    const dataSource = {
        results: getDataSource(dbAPI),
        users: usersDataSource
    }
    return subgraphHandler(event, context, {typeDefs, resolvers, dataSource})
}