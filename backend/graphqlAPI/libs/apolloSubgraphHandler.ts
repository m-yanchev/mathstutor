import {deleteOne, findOne, insertOne, updateOne} from "./mongoDBDataSource";
import {ApolloServer} from "apollo-server-lambda";
import {buildSubgraphSchema} from "@apollo/federation";
import type {DocumentNode} from "graphql";
import {GetUserFromHeader, getUserFromHeaders} from "./userHeaders";

type Options = {
    typeDefs: DocumentNode,
    resolvers: any,
    dataSource?: any
}

const getUserFromHeader = (req): GetUserFromHeader => (name: string): string => req.headers[name]

const getServer = async (options: Options) => {
    const {typeDefs, resolvers, dataSource} = options
    const context = ({express}) => {
        return {
            userAPI: {
                user: getUserFromHeaders(getUserFromHeader(express.req))
            },
            mongoAPI: {findOne, updateOne, insertOne, deleteOne},
            dataSource: dataSource
        }
    }
    return new ApolloServer({schema: buildSubgraphSchema([{typeDefs, resolvers}]), context})
}

export const subgraphHandler = async (event, context, options: Options) => {
    const server = await getServer(options)
    // @ts-ignore
    return server.createHandler()(event, context)
}