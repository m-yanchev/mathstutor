//const {MongoClient} = require("mongodb")
const {ApolloServer, gql} = require('apollo-server-lambda');
//const crypto = require('crypto');
//const {DB_ACCESS} = require("./accessConsts");

/*const typeDefs = gql`
    type Query {
        signUp: SignUp
    }
    
    type SignUp {
        hello: String!
    }
`*/

/*const typeDefs = gql`
    type Mutation {
        signUp(name: String!, email: String!, password: String!): Result!
    }
    type Result {
        ok: Boolean!
        error: Error
    }
    enum Error {
        expected_email
    }
`*/

const typeDefs = gql`
    type Query {
        signUp(name: String!): Result!
    }
    type Result {
        ok: Boolean!
    }
`

/*const getSecret = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(16, async (err, buf) => {
            if (err) reject(err);
            resolve(buf.toString('hex'))
        })
    })
}

const hash = (password, secret) => {
    return new Promise(resolve => {
        const hmac = crypto.createHmac('sha256', secret);
        hmac.update(password);
        resolve(hmac.digest('hex'));
    })
}*/

/*const signUp = async (parent, args, context) => {
    const {name, email, password} = args
    const {findOne, insertOne} = context.dataSources
    /!*const user = await findOne(email)
    if (user) return {ok: false, error: "email-already-exists"}
    const secret = await getSecret()
    await insertOne({name, email, secret, hash: hash(password, secret)})*!/
    return {ok: true}
}*/

const resolvers = {
    Query: {
        signUp: () => ({ok: true})
    }
}

/*const useMongoDb = async method => {
    const client = new MongoClient(DB_ACCESS)
    await client.connect()
    const db = await client.db('mathsTutorDB')
    const result = await method(db)
    client.close().catch(error => console.error(error))
    return result
}

const findOne = email => {
    return useMongoDb(async db => {
        const collection = await db.collection("users")
        return collection.findOne({email})
    })
}

const insertOne = async document => {
    return useMongoDb(async db => {
        const collection = await db.collection("users")
        return collection.insertOne(document)
    })
}*/

const getDataSources = async () => {
    return () => ({findOne: () => null, insertOne: () => null})
}

const getServer = async () => {
    const dataSources = await getDataSources()
    return new ApolloServer({typeDefs, resolvers, dataSources});
}

exports.handler = async (event, context) => {
    const server = await getServer()
    //const server = new ApolloServer({typeDefs, resolvers /*dataSources*/});
    return server.createHandler()(event, context)
}
