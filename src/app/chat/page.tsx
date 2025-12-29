'use client'

import { useState } from 'react'

export default function Chat() {
  const [role, setRole] = useState<'student' | 'teacher'>('student')
  const [message, setMessage] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  const send = async () => {
    if (!message.trim()) return

    setLoading(true)
    setAnswer('')

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, role })
    })

    const data: { answer?: string } = await res.json()
    setAnswer(data.answer || 'Извини, не могу ответить на этот вопрос. Попробуй позже или переформулируй его подробнее.')
    setLoading(false)
  }

  return ( 
    <div style={{ maxWidth: 600, margin: '40px auto' }}>
      <h2>AI помощник</h2>

      <select value={role} onChange={e => setRole(e.target.value as 'student' | 'teacher')}>
        <option value="student">👨‍🎓 Ученик</option>
        <option value="teacher">👨‍🏫 Я</option>
      </select>

      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Задай вопрос..."
        rows={4}
        style={{ width: '100%', marginTop: 10 }}
      />

      <button onClick={send} disabled={loading}>
        {loading ? 'Думаю…' : 'Спросить'}
      </button>

      {answer && (
        <pre style={{ whiteSpace: 'pre-wrap', marginTop: 20 }}>
          {answer}
        </pre>
      )}
    </div>
  )
}
