import { MongoClient, Db } from "mongodb";

// Extend the global type to include our MongoDB client promise
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGO_URI!;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;
let db: Db;

if (!uri) throw new Error("⚠️ Укажи MONGO_URI в .env.local");

// Используем глобальный объект, чтобы избежать повторных подключений на hot reload
if (!globalThis._mongoClientPromise) {
  client = new MongoClient(uri);
  globalThis._mongoClientPromise = client.connect();
}
clientPromise = globalThis._mongoClientPromise;

export const getDB = async () => {
  if (!db) {
    const client = await clientPromise;
    db = client.db("next-todo");
  }
  return db;
};
