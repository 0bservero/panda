// src/app/lib/mongo.ts
import { MongoClient, Db } from "mongodb";

declare global {
  // чтобы не пересоздавалось при hot-reload
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error("⚠️ Укажи MONGO_URI в .env.local");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;
let db: Db;

export async function getDB() {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri!, {
      // если Render чудит с SSL — иногда помогает
      tls: true,
      retryWrites: true,
    });
    global._mongoClientPromise = client.connect();
  }   
  clientPromise = global._mongoClientPromise;

  if (!db) {
    const connectedClient = await clientPromise;
    db = connectedClient.db("next-todo");
  }

  return db;
}
