import { openai } from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { threadId: string; runId: string } }
) {
  const { runId, threadId } = params;
  const messages = await openai.beta.threads.messages.list(threadId);

  if (runId === "undefined")
    return NextResponse.json({ success: true, messages, run: {} });

  const run = await openai.beta.threads.runs.retrieve(threadId, runId);
  return NextResponse.json({ success: true, messages, run });
}
