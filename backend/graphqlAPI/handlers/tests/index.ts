import {resolvers} from "./resolvers";
import {subgraphHandler} from "apolloSubgraphHandler";
import {typeDefs} from "./schema";
import {DataSource} from "./tests";
import {getProblemResultsDataSource, getTestResultsDataSource, getTestsDataSource} from "./dataSource";
import {dbAPI} from "dynamoDBAPI";
import {usersDataSource} from "mongoUsersDataSource";

export const handler = async (event, context) => {
    const dataSource: DataSource = {
        tests: getTestsDataSource(dbAPI),
        testResults: getTestResultsDataSource(dbAPI),
        problemResults: getProblemResultsDataSource(dbAPI),
        users: usersDataSource
    }
    return subgraphHandler(event, context, {typeDefs, resolvers, dataSource})
}