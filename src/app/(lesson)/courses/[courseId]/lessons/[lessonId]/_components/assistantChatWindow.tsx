"use client";

import { useChat } from "ai/react";
import { AssistantInput } from "./assistantInputNew";
import Markdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wand2, Forward, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUser } from "@/lib/hooks/useUserSession";
import Image from "next/image";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, setInput } =
    useChat();

  return (
    <div className="relative w-full  mx-auto stretch h-full p-6">
      <DialogHeader>
        <DialogTitle>Гефест ассистент</DialogTitle>
        <DialogDescription>
          Гефест ассистент поможет вам с вопросами любой сложности, будь то
          простые, сложные или даже кажущиеся глупыми.
        </DialogDescription>
      </DialogHeader>
      <div className="h-full overflow-y-auto flex  flex-col gap-4 pt-8">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center relative">
            <Image
              src="/gefestAi.png"
              alt="Гефест Ассистент"
              className="rounded-full"
              width={300}
              height={300}
            />
            <div className="flex flex-col items-center mt-4">
              <Button
                variant="outline"
                className="mb-2"
                onClick={() =>
                  setInput("Как мне улучшить свои навыки программирования?")
                }
              >
                Как мне улучшить свои навыки программирования?
              </Button>
              <Button
                variant="outline"
                className="mb-2"
                onClick={() =>
                  setInput("Какие есть способы изучения алгоритмов?")
                }
              >
                Какие есть способы изучения алгоритмов?
              </Button>
              <Button
                variant="outline"
                className="mb-2"
                onClick={() =>
                  setInput("Какие проекты я могу создать для портфолио?")
                }
              >
                Какие проекты я могу создать для портфолио?
              </Button>
            </div>
          </div>
        ) : null}
        {messages.map((m) => (
          <div key={m.id} className=" flex flex-col gap-2">
            {m.role === "user" ? (
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage alt="Студент" />
                  <AvatarFallback>С</AvatarFallback>
                </Avatar>
                <p className="font-bold"> Студент</p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/gefestAi.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="font-bold">Гефест Ассистент</p>
              </div>
            )}
            <Markdown className={"prose"} components={{}}>
              {m.content}
            </Markdown>
          </div>
        ))}
      </div>

      <form
        className="sticky bottom-0 bg-background flex gap-2 h-auto items-center py-4 "
        onSubmit={(e) => handleSubmit(e)}
      >
        <AssistantInput
          value={input}
          onChange={handleInputChange}
          type="text"
          placeholder="Спроси что угодно..."
        />
        <Button
          type="submit"
          size={`icon`}
          variant={"outline"}
          className="flex gap-1 items-center text-muted-foreground"
        >
          <Send width={"20"} />
        </Button>
      </form>
    </div>
  );
}
