"use client";
import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useCompletion } from "ai/react";
import React, { useState } from "react";

const OpenQuestion = ({ value }: { value: string }) => {
  const [answer, setAnswer] = useState("");

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = () => {
    // Handle submission of the answer
    const prompt = `Ты ассистент учителя, который проверяет ответы на вопросы. Если ответ верный, то ответить "Верно" иначе "Неверно". Если ответ неверен, то нужно указать правильный ответ. Вопрос: ${value} Ответ: ${answer}`;
    console.log(prompt);
  };

  return (
    <Card className="w-full lg:w-1/2 mx-auto">
      <CardHeader>
        <CardTitle>Открытый вопрос</CardTitle>
        <CardDescription>Ответьте на этот вопрос</CardDescription>
      </CardHeader>
      <CardContent>
        <Editor className="w-full" defaultValue={value} readonly></Editor>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit}>
          <Textarea value={answer} onChange={handleAnswerChange}></Textarea>
          <Button type="submit">Ответить</Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default OpenQuestion;
