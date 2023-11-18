import { openai } from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { threadId: string; runId: string } }
) {
  const { threadId } = params;

  const messages = await openai.beta.threads.messages.list(threadId);
  return NextResponse.json({ success: true, messages });
}
