import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
}

interface GlobalMongo {
    conn: MongoClient | null;
    promise: Promise<MongoClient> | null;
}

declare global {
    // eslint-disable-next-line no-var
    var _mongoClientPromise: GlobalMongo;
}

let cached = global._mongoClientPromise;

if (!cached) {
    cached = global._mongoClientPromise = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
    if (cached.conn) {
        return { client: cached.conn, db: cached.conn.db() };
    }

    if (!cached.promise) {
        cached.promise = MongoClient.connect(MONGODB_URI);
    }

    cached.conn = await cached.promise;
    return { client: cached.conn, db: cached.conn.db() };
}

export async function getDb(): Promise<Db> {
    const { db } = await connectToDatabase();
    return db;
}
