import {typeDefs} from "./schema";
import {resolvers} from "./resolvers";
import {subgraphHandler} from "apolloSubgraphHandler"
import {usersDataSource} from "mongoUsersDataSource"
import {postTransport} from "postTransportAPI";

export const handler = async (event, context) => {
    const dataSource = {
        users: usersDataSource,
        postTransport
    }
    return subgraphHandler(event, context, {typeDefs, resolvers, dataSource})
}