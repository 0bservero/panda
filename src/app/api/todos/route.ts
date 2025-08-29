import { NextResponse } from "next/server";
import { db } from "@/app/lib/mongo";

export async function GET() {
  const todos = await db.collection("todos").find().toArray();
  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  const { text } = await req.json();
  if (!text || text.trim() === "") {
    return NextResponse.json({ error: "Пустая задача" }, { status: 400 });
  }

  await db.collection("todos").insertOne({ text });
  return NextResponse.json({ ok: true });
}
