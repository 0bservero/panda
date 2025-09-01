"use client";
import React from "react";
import { useState, useEffect } from "react";

// Тип для задачи
type Todo = {
  _id: string;
  text: string;
};

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  // загрузка списка задач
  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data: Todo[]) => setTodos(data))
      .catch(console.error);
  }, []);

const addTodo = async (e: React.FormEvent) => {
    e.preventDefault(); // чтобы форма не перезагружала страницу
    if (!text.trim()) return;

    try {
      await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      setText("");

      // обновим список
      const updated = await fetch("/api/todos").then((res) => res.json()) as Todo[];
      setTodos(updated);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center p-3 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">🔥 Мини TODO</h1>

      <form className="flex flex-col sm:flex-row gap-2 mb-4 sm:mb-6 w-full max-w-md" onSubmit={addTodo}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Новая задача..."
          className="flex-1 px-3 sm:px-4 py-2 rounded-lg text-black bg-white text-sm sm:text-base touch-manipulation"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-4 py-2 rounded-lg font-semibold shadow-lg transition-all touch-manipulation text-sm sm:text-base"
        >
          ➕ Добавить
        </button>
      </form>

      <ul className="w-full max-w-md space-y-2">
        {todos.map((t) => (
          <li key={t._id} className="bg-gray-800 hover:bg-gray-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-lg transition-colors text-sm sm:text-base">
            {t.text}
          </li>
        ))}
      </ul>
      
      {todos.length === 0 && (
        <div className="mt-8 text-center text-gray-400">
          <p className="text-lg sm:text-xl mb-2">📝</p>
          <p className="text-sm sm:text-base">Пока нет задач. Добавьте первую!</p>
        </div>
      )}
    </div>
  );
}
