"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { AssistantMessage } from "./types/messages";
import ChatBubble from "./assistantChatBubble";
import AssistantChatContainer from "./assistantChatBubble";
import { trpc } from "@/app/_trpc/client";
import { serialize } from "next-mdx-remote/serialize";
import { compile } from "@mdx-js/mdx";
import { serializeMdxContent } from "@/lib/mdx-utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Run } from "openai/resources/beta/threads/runs/runs.mjs";

const AssistantInputSchema = z.object({
  query: z.string().nonempty({ message: "Нужен вопрос" }),
});

type AssistantInputType = z.infer<typeof AssistantInputSchema>;

const AssistantChat = () => {
  const { register, handleSubmit } = useForm<AssistantInputType>();
  const [lastRun, setLastRun] = useState<Run | null>(null);
  const [initialMessagesFetched, setInitialMessagesFetched] = useState(false);
  const [userData] = trpc.user.getUserData.useSuspenseQuery("1" as string);

  const fetchLastBotRun = async () => {
    const res = await fetch(
      `/api/chatbot/thread/${userData?.thread?.id}/${lastRun?.id}`
    );
    const data = await res.json();
    const run = data?.run;
    const isRunCompleted = run && run.status === "completed";
    if (isRunCompleted) setLastRun(null);
    if (!initialMessagesFetched) setInitialMessagesFetched(true);

    const rawMessages: AssistantMessage[] = data?.messages?.data;

    for (const rawMessage of rawMessages) {
      const messageText = rawMessage.content[0].text.value;
      const serializedMessage = await serializeMdxContent(messageText);
      rawMessage.serializedContent = serializedMessage;
      //   serializedMessages.push(serializedMessage);
    }
    data.messages.data = rawMessages;
    return data;
  };
  const { data, error, isFetching } = useQuery(["thread"], fetchLastBotRun, {
    refetchInterval: 500,
    enabled: !initialMessagesFetched || !!lastRun,
  });

  const createThreadMutation = useMutation(
    async (payload: { query: string; thread: string }) => {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payload }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }
  );
  const onSubmit = async (data: AssistantInputType) => {
    createThreadMutation.mutate(
      { query: data.query, thread: userData?.thread?.id ?? "" },
      {
        onSuccess(res) {
          const run = res.run;
          const thread = res.thread;
          setLastRun(run);
        },
      }
    );
  };

  return (
    <div className="grid grid-rows-[1fr_200px] h-full">
      <ScrollArea className="h-full">
        <AssistantChatContainer
          messages={data?.messages?.data ?? []}
        ></AssistantChatContainer>
      </ScrollArea>

      <form className="space-y-4 mt-8 h-full" onSubmit={handleSubmit(onSubmit)}>
        <Textarea {...register("query")}></Textarea>
        <Button type="submit">Отправить вопрос</Button>
      </form>
    </div>
  );
};

export default AssistantChat;
