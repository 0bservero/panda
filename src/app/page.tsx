import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -right-24 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_60%)]" />

      <div className="container mx-auto px-4 py-6 sm:py-10">
        <header className="mb-8 sm:mb-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial Black" font-size="90"
        fill="#000000" stroke="#6A0DAD" stroke-width="2">
        SB
        </text>
</svg>

            <div>
              <div className="text-lg sm:text-xl font-semibold tracking-wide">Mini Chat Tools</div>
              <div className="text-xs sm:text-sm text-gray-400">Коллекция инструментов и мини‑игр</div>
            </div>
          </div>
          <nav className="hidden sm:flex items-center gap-3 text-sm text-gray-300">
            <Link href="#tools" className="rounded-md px-3 py-2 hover:text-white hover:bg-white/5 transition-colors">Инструменты</Link>
            <Link href="/chat" className="rounded-md px-3 py-2 hover:text-white hover:bg-white/5 transition-colors">Чат</Link>
            <Link href="/games" className="rounded-md px-3 py-2 hover:text-white hover:bg-white/5 transition-colors">Игры</Link>
          </nav>
        </header>

        <section className="relative mx-auto mb-10 sm:mb-14 max-w-4xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-sky-400 to-purple-500 bg-clip-text text-transparent">
            Быстрые утилиты и мини‑игры в одном месте
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-300">
            Создавайте QR‑коды, считайте, строите графики, ведите задачи и отдыхайте за мини‑играми.
          </p>
          <div className="mt-5 sm:mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="#tools"
              className="w-full sm:w-auto rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-center text-sm sm:text-base font-medium shadow-lg shadow-blue-600/20 transition-transform hover:scale-[1.02]"
            >
              Посмотреть инструменты
            </Link>
            <Link
              href="/games"
              className="w-full sm:w-auto rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-center text-sm sm:text-base font-medium text-white/90 backdrop-blur transition-colors hover:bg-white/10"
            >
              Игры 🎮
            </Link>
          </div>
        </section>

        <section id="tools" className="mx-auto max-w-6xl">
          <div className="mb-4 sm:mb-6 flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold text-white/90">Инструменты и игры</h2>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">Обновляется</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Link href="/qr" className="group">
              <div className="relative h-full rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500/40 hover:bg-white/10">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-purple-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📱</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-blue-300 transition-colors">QR Generator</h3>
                <p className="text-sm sm:text-base text-gray-300/90">Создавайте QR‑коды с гибкими настройками</p>
              </div>
            </Link>

            <Link href="/weather" className="group">
              <div className="relative h-full rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500/40 hover:bg-white/10">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/0 via-sky-400/0 to-purple-400/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🌤️</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-blue-300 transition-colors">Weather</h3>
                <p className="text-sm sm:text-base text-gray-300/90">Прогноз погоды</p>
              </div>
            </Link>

            <Link href="/todos" className="group">
              <div className="relative h-full rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500/40 hover:bg-white/10">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/0 via-cyan-500/0 to-emerald-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">✅</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-blue-300 transition-colors">Todo List</h3>
                <p className="text-sm sm:text-base text-gray-300/90">Управление задачами</p>
              </div>
            </Link>

            <Link href="/calculator" className="group">
              <div className="relative h-full rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-green-500/40 hover:bg-white/10">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/0 via-green-500/0 to-teal-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🧮</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-emerald-300 transition-colors">Calculator</h3>
                <p className="text-sm sm:text-base text-gray-300/90">Научный калькулятор</p>
              </div>
            </Link>

            <Link href="/charts" className="group">
              <div className="relative h-full rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-500/40 hover:bg-white/10">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-fuchsia-500/0 via-purple-500/0 to-indigo-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📊</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-purple-300 transition-colors">Charts</h3>
                <p className="text-sm sm:text-base text-gray-300/90">Генератор графиков</p>
              </div>
            </Link>

            <Link href="/games" className="group">
              <div className="relative h-full rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-red-500/40 hover:bg-white/10">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-rose-500/0 via-red-500/0 to-orange-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🎮</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-rose-300 transition-colors">Mini Games</h3>
                <p className="text-sm sm:text-base text-gray-300/90">Коллекция мини‑игр</p>
              </div>
            </Link>
          </div>
        </section>

        <footer className="mx-auto mt-12 max-w-6xl border-t border-white/10 pt-6 text-center text-sm text-gray-400">
          <p>Сделано с заботой о UX · TailwindCSS · Next.js</p>
        </footer>
      </div>
    </div>
  );
}
