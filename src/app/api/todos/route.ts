import { NextResponse } from "next/server";
import { getDB } from "@/app/lib/mongo";

export async function GET() {
  try {
    const db = await getDB();
    const todos = await db.collection("todos").find().toArray();
    return NextResponse.json(todos);
  } catch (err) {
    console.error("GET /api/todos error:", err);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.text || !body.text.trim()) {
      return NextResponse.json({ error: "Пустая задача" }, { status: 400 });
    }

    const db = await getDB();
    await db.collection("todos").insertOne({ text: body.text });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("POST /api/todos error:", err);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
