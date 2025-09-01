import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8">🔥 Полезные инструменты</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        <Link href="/todos" className="bg-blue-600 hover:bg-blue-700 p-6 rounded-lg text-center transition-colors">
          <div className="text-3xl mb-2">📝</div>
          <h2 className="text-xl font-semibold">TODO</h2>
          <p className="text-gray-300">Управление задачами</p>
        </Link>
        
        <Link href="/weather" className="bg-green-600 hover:bg-green-700 p-6 rounded-lg text-center transition-colors">
          <div className="text-3xl mb-2">🌤️</div>
          <h2 className="text-xl font-semibold">Погода</h2>
          <p className="text-gray-300">Прогноз погоды</p>
        </Link>
        
        <Link href="/qr" className="bg-purple-600 hover:bg-purple-700 p-6 rounded-lg text-center transition-colors">
          <div className="text-3xl mb-2">📱</div>
          <h2 className="text-xl font-semibold">QR Код</h2>
          <p className="text-gray-300">Генератор QR кодов</p>
        </Link>

        <Link href="/calculator" className="bg-orange-600 hover:bg-orange-700 p-6 rounded-lg text-center transition-colors">
          <div className="text-3xl mb-2">🧮</div>
          <h2 className="text-xl font-semibold">Калькулятор</h2>
          <p className="text-gray-300">Научный калькулятор</p>
        </Link>

        <Link href="/charts" className="bg-cyan-600 hover:bg-cyan-700 p-6 rounded-lg text-center transition-colors">
          <div className="text-3xl mb-2">📊</div>
          <h2 className="text-xl font-semibold">Графики</h2>
          <p className="text-gray-300">Создание диаграмм</p>
        </Link>

        <Link href="/games" className="bg-pink-600 hover:bg-pink-700 p-6 rounded-lg text-center transition-colors">
          <div className="text-3xl mb-2">🎮</div>
          <h2 className="text-xl font-semibold">Игры</h2>
          <p className="text-gray-300">Мини-игры</p>
        </Link>
      </div>
    </div>
  );
}
