import {resolvers} from "./resolvers";
import {subgraphHandler} from "apolloSubgraphHandler";
import {typeDefs} from "./schema";

export const handler = async (event, context) => {
    return subgraphHandler(event, context, {typeDefs, resolvers})
}