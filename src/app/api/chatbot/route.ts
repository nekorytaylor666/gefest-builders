import { db } from "@/lib/db";
import { openai } from "@/lib/openai";
import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string; lessonId: string } }
) {
  const session = await getSession();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({
      success: false,
      message: "Не авторизован",
    });
  }

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      thread: true,
    },
  });
  if (!user) {
    return NextResponse.json({
      success: false,
      message: "Нет такого юзера",
    });
  }

  const body = await request.json();
  const { payload } = body;
  const { query } = payload;
  const assistant = await openai.beta.assistants.create({
    name: "Gefest Tutor",
    instructions:
      "Ты личный репетитор по разработке на Javascript, HTML и CSS. Отвечай емко и с примерами на вопросы по программированию и IT.",
    tools: [{ type: "code_interpreter" }],
    model: "gpt-4-1106-preview",
  });

  let thread;
  thread ??= user.thread;

  if (!thread) {
    thread = await openai.beta.threads.create();

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        thread: {
          create: {
            createdAt: thread.created_at,
            id: thread.id,
            metadata: thread.metadata as any,
            object: thread.object,
          },
        },
      },
    });
  }

  await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: query,
  });
  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
    instructions: `Обращайся к пользователю как ${user?.fullName}. Он оплатил полный курс по разработке на JS, HTML и CSS`,
  });

  const messages = await openai.beta.threads.messages.list(thread.id);
  return NextResponse.json({ success: true, thread, run, assistant, messages });
}
