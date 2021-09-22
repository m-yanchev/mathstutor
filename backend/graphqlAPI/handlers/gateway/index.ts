import {ApolloServer} from "apollo-server-lambda";
import {ApolloGateway, RemoteGraphQLDataSource} from "@apollo/gateway";
import express from "express";
import {getUser, useSession} from "expressSessionsAPI";
import {supergraphSdl} from "./schema";
import {setUserToHeaders} from "userHeaders";

const getServer = async () => {
    const context = ({express}) => {
        const session = express.req.session
        return {
            session
        }
    }
    const gateway = new ApolloGateway({
        supergraphSdl,
        buildService({url}) {
            return new RemoteGraphQLDataSource({
                url,
                willSendRequest({request, context}) {
                    // @ts-ignore
                    const {session} = context
                    const user = getUser(session)
                    if (user) {
                        const method = (name, value) => {
                            request.http?.headers.set(name, value)
                        }
                        setUserToHeaders(method, user)
                    }
                }
            })
        }
    })
    return new ApolloServer({gateway, context});
}

const expressAppFromMiddleware = middleware => {
    const app = express()
    useSession(app)
    app.use(middleware)
    return app
}

exports.handler = async (event, context) => {
    const server = await getServer()
    const cors = {
        origin: context.functionName === "graphql-api-dev-gateway" ? "https://localhost:9000" : 'https://mathstutor.ru',
        credentials: true
    }
    const h = server.createHandler({expressAppFromMiddleware, expressGetMiddlewareOptions: {cors}})
    // @ts-ignore
    return h(event, context)
}