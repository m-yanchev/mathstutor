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
    if (filter.id) {
        filter._id = new ObjectId(filter.id)
        delete filter.id
    }
    return filter
}

const normaliseDocument = document => {
    if (document) {
        document.id = document._id.toString()
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