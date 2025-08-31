import { MongoClient, Db } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGO_URI!;
if (!uri) throw new Error("⚠️ Укажи MONGO_URI в .env.local");

let db: Db;

const client = new MongoClient(uri);

const clientPromise =
  globalThis._mongoClientPromise ??
  (globalThis._mongoClientPromise = client.connect());

export const getDB = async () => {
  if (!db) {
    const client = await clientPromise;
    db = client.db("next-todo");
  }
  return db;
};
