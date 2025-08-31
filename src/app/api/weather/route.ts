import { NextResponse } from "next/server";

const API_KEY = process.env.OPENWEATHER_KEY;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") || "Tashkent";

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Ошибка получения погоды" }, { status: 500 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
