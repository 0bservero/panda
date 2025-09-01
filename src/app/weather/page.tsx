"use client";
import React from "react";
import { useState } from "react";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

export default function Weather() {
  const [city, setCity] = useState("Tashkent");
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const getWeather = async () => {
    const res = await fetch(`/api/weather?city=${city}`);
    const data: WeatherData = await res.json();
    setWeather(data);
  };

  return (
    <div className="p-4">
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Введите город"
        className="border p-2 rounded"
      />
      <button
        onClick={getWeather}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Показать погоду
      </button>

      {weather && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">{weather.name}</h2>
          <p>🌡 {weather.main.temp}°C</p>
          <p>💧 Влажность: {weather.main.humidity}%</p>
          <p>🌬 Ветер: {weather.wind.speed} м/с</p>
        </div>
      )}
    </div>
  );
}
