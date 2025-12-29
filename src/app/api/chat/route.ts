import { NextResponse } from 'next/server'

const PROMPTS = {
  student: `Ты преподаватель. Объясняй просто, по шагам, с примерами.`,
  teacher: `Ты личный ассистент программиста. Коротко, по делу, код > слов.`
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const message = String(body?.message ?? '')
    const role = body?.role === 'teacher' ? 'teacher' : 'student'

    if (!message.trim()) {
      return NextResponse.json({ answer: 'Пустой вопрос' }, { status: 400 })
    }

    const prompt = `${PROMPTS[role]}\nВопрос: ${message}`

    const res = await fetch(
      'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: { max_new_tokens: 300 }
        })
      }
    )

    const data = await res.json()

    if (data?.error) {
      return NextResponse.json({ answer: data.error })
    }

    let text = data?.[0]?.generated_text ?? 'Нет ответа'

    text = text.replace(prompt, '').trim()

    return NextResponse.json({ answer: text })
  } catch {
    return NextResponse.json(
      { answer: 'Ошибка сервера' },
      { status: 500 }
    )
  }
}
