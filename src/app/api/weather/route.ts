import { NextResponse } from "next/server";

const API_KEY = process.env.OPENWEATHER_KEY;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city") || "Tashkent";

    if (!API_KEY) {
      return NextResponse.json(
        { error: "❌ Нет API ключа. Добавь OPENWEATHER_KEY в .env.local" },
        { status: 500 }
      );
    }

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=ru`
    );

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("Ошибка OpenWeather:", err);
      return NextResponse.json(
        { error: "Не удалось получить погоду", details: err },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("❌ Ошибка API /weather:", err);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
