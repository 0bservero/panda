"use client";
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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">🔥 Мини TODO</h1>

      <form className="flex gap-2 mb-6" onSubmit={addTodo}>
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
          <li key={t._id} className="bg-gray-800 px-4 py-2 rounded-lg shadow">
            {t.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
