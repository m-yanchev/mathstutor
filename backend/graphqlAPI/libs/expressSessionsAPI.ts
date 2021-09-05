import {SESSION_KEY, DB_ACCESS} from "./accessConsts";
import session from "express-session";
import connect from "connect-mongodb-session";
import {User} from "./User";

export const useSession = app => {

    const MongoDBStore = connect(session)

    const store = new MongoDBStore({
        uri: DB_ACCESS,
        databaseName: 'mathsTutorDB',
        collection: 'sessions'
    });

    store.on('error', function (e) {
        throw e
    });

    const sessionConfig = {
        secret: SESSION_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 31708800000, secure: true, domain: "mathstutor.ru"},
        store: store
    };

    app.use(session(sessionConfig))
}

export const setUser = (session, user: User) => {
    session.user = user
}

export const getUser = (session): User => {
    return session.user
}