import {resolvers} from "./resolvers";
import {subgraphHandler} from "apolloSubgraphHandler";
import {typeDefs} from "./schema";
import {getDataSource} from "./dataSource";
import {dbAPI} from "dynamoDBAPI";
import {DataSource} from "./problems";

export const handler = async (event, context) => {
    const dataSource: DataSource = {
        problems: getDataSource(dbAPI)
    }
    return subgraphHandler(event, context, {typeDefs, resolvers, dataSource})
}