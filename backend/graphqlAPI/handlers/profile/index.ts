import {typeDefs} from "./schema";
import {resolvers} from "./resolvers";
import {subgraphHandler} from "apolloSubgraphHandler"

export const handler = async (event, context) => {
    return subgraphHandler(event, context, {typeDefs, resolvers})
}