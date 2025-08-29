import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI as string;

if (!uri) {
  throw new Error("⚠️ Укажи MONGO_URI в .env.local");
}

const client = new MongoClient(uri);
export const db = client.db("next-todo");

export const connectToDB = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Ошибка подключения к MongoDB:", error);
  }
};
