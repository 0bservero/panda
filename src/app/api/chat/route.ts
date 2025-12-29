import { NextResponse } from 'next/server'

const PROMPTS = {
  student: `Ты преподаватель. Объясняй просто, по шагам, с примерами.`,
  teacher: `Ты личный ассистент программиста. Коротко, по делу, код > слов.`
}

export async function POST(req: Request) {
const body = await req.json()
const message: string = String(body?.message ?? '')
const role = body?.role
const key = (role === 'teacher' ? 'teacher' : 'student') as keyof typeof PROMPTS

const prompt = `
      ${PROMPTS[key]}
Вопрос: ${message}
`

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
  return NextResponse.json({
    answer: data?.[0]?.generated_text || 'Нет ответа'
  })
}
