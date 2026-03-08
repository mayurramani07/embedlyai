import mongoose, { connect } from "mongoose"

const mongo_url = process.env.MONGODB_URL

if (!mongo_url) {
    console.log("mongodb url is not found")
}

let cache = (global as any).mongoose

if (!cache) {
    cache = (global as any).mongoose = { conn: null, promise: null }
}

const connectDb = async () => {

    if (cache.conn) {
        return cache.conn
    }

    if (!cache.promise) {
        cache.promise = connect(mongo_url!).then((c) => c)
    }

    try {
        cache.conn = await cache.promise
    } catch (error) {
        console.log(error)
    }

    return cache.conn
}

export default connectDb