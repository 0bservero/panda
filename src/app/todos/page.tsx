"use client";
import { useState, useEffect } from "react";

export default function TodosPage() {
  const [todos, setTodos] = useState<any[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then(setTodos);
  }, []);

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    setText("");
    const updated = await fetch("/api/todos").then((res) => res.json());
    setTodos(updated);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">🔥 Мини TODO</h1>

      <form onSubmit={addTodo} className="flex gap-2 mb-6">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Новая задача..."
          className="px-4 py-2 rounded-lg text-black bg-white"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
        >
          Добавить
        </button>
      </form>

      <ul className="w-full max-w-md space-y-2">
        {todos.map((t) => (
          <li
            key={t._id}
            className="bg-gray-800 px-4 py-2 rounded-lg shadow"
          >
            {t.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
