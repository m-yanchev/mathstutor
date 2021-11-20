import type {Db} from "mongodb";
import {DB_ACCESS} from "./accessConsts";
import {MongoClient, ObjectId} from "mongodb";

const useMongoDb = async method => {
    const client = new MongoClient(DB_ACCESS)
    await client.connect()
    const db = await client.db('mathsTutorDB')
    const result = await method(db)
    client.close().catch(error => console.error(error))
    return result
}

const normaliseFilter = filter => {
    const normal = {...filter}
    if (normal.id) {
        normal._id = new ObjectId(filter.id)
        delete normal.id
    }
    return normal
}

const normaliseDocument = document => {
    if (document) {
        document.id = document._id.toString()
        delete document._id
        return document
    } else {
        return null
    }
}

export const findOne = async (model, filter) => {
    return useMongoDb(async (db: Db) => {
        const collection = await db.collection(model)
        return normaliseDocument(await collection.findOne(normaliseFilter(filter)))
    })
}

export const find = async (model, filter) => {
    return useMongoDb(async (db: Db) => {
        const collection = await db.collection(model)
        const list = await (await collection.find(normaliseFilter(filter))).toArray()
        return list.map(document => normaliseDocument(document))
    })
}

export const updateOne = async (model, filter, data) => {
    return useMongoDb(async (db: Db) => {
        const collection = await db.collection(model)
        return collection.updateOne(normaliseFilter(filter), {$set: data})
    })
}

export const insertOne = async (model, document) => {
    return useMongoDb(async (db: Db) => {
        const collection = await db.collection(model)
        return (await collection.insertOne(document)).insertedId
    })
}

export const deleteOne = async (model, filter) => {
    return useMongoDb(async (db: Db) => {
        const collection = await db.collection(model)
        return collection.deleteOne(normaliseFilter(filter))
    })
}