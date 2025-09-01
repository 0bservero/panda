import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Mini Chat Tools
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 px-2">
            Коллекция полезных инструментов и игр
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          <Link href="/qr" className="group">
            <div className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-blue-500 touch-manipulation">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📱</div>
              <h2 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">QR Generator</h2>
              <p className="text-sm sm:text-base text-gray-400">Создавайте QR коды с настройками</p>
            </div>
          </Link>

          <Link href="/weather" className="group">
            <div className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-blue-500 touch-manipulation">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🌤️</div>
              <h2 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">Weather</h2>
              <p className="text-sm sm:text-base text-gray-400">Прогноз погоды</p>
            </div>
          </Link>

          <Link href="/todos" className="group">
            <div className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-blue-500 touch-manipulation">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">✅</div>
              <h2 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">Todo List</h2>
              <p className="text-sm sm:text-base text-gray-400">Управление задачами</p>
            </div>
          </Link>

          <Link href="/calculator" className="group">
            <div className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-green-500 touch-manipulation">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🧮</div>
              <h2 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-green-400 transition-colors">Calculator</h2>
              <p className="text-sm sm:text-base text-gray-400">Научный калькулятор</p>
            </div>
          </Link>

          <Link href="/charts" className="group">
            <div className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-purple-500 touch-manipulation">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📊</div>
              <h2 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">Charts</h2>
              <p className="text-sm sm:text-base text-gray-400">Генератор графиков</p>
            </div>
          </Link>

          <Link href="/games" className="group">
            <div className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-red-500 touch-manipulation">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🎮</div>
              <h2 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-red-400 transition-colors">Mini Games</h2>
              <p className="text-sm sm:text-base text-gray-400">Коллекция мини-игр</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
