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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-3 sm:p-6 md:p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">🌤️ Погода</h1>
        
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Введите город"
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-black bg-white text-sm sm:text-base touch-manipulation"
          />
          <button
            onClick={getWeather}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold shadow-lg transition-all touch-manipulation text-sm sm:text-base"
          >
            🔍 Показать погоду
          </button>
        </div>

        {weather && (
          <div className="bg-gray-800 rounded-xl p-4 sm:p-6 shadow-2xl">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 text-blue-400">{weather.name}</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                <span className="text-sm sm:text-base">🌡️ Температура</span>
                <span className="text-lg sm:text-xl font-bold text-orange-400">{weather.main.temp}°C</span>
              </div>
              <div className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                <span className="text-sm sm:text-base">💧 Влажность</span>
                <span className="text-lg sm:text-xl font-bold text-blue-400">{weather.main.humidity}%</span>
              </div>
              <div className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                <span className="text-sm sm:text-base">🌬️ Ветер</span>
                <span className="text-lg sm:text-xl font-bold text-green-400">{weather.wind.speed} м/с</span>
              </div>
            </div>
          </div>
        )}
        
        {!weather && (
          <div className="text-center text-gray-400 mt-8">
            <p className="text-4xl sm:text-5xl mb-4">🌍</p>
            <p className="text-sm sm:text-base">Введите название города и узнайте погоду</p>
          </div>
        )}
      </div>
    </div>
  );
}
