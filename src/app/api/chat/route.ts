import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Set the runtime to edge for best performance
export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "Тебя зовут Гефест. Отвечай только на русском. Ты личный репетитор по разработке на Javascript, HTML и CSS. Если ты вставляешь кусок кода оно всегда должно оборачиваться в ```{code}``` Отвечай на вопросы емко и с примерами. Отвечай в позитивном и игривом стиле. Старайся давать ответы не больше одного параграфа.",
      },
      ...messages,
    ],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
