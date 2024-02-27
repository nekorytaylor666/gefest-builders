import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { uuid } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, PlusIcon, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";

const schema = z.object({
  questionContent: z.string().min(2),
  answers: z.array(
    z.object({
      content: z.string().min(2).max(1000),
      answerId: z.string(),
    })
  ),
  correctAnswerId: z.string(),
  points: z.number().int().min(1).default(25),
});

export type QuizEditorValue = z.infer<typeof schema>;

const QuizEditor = ({
  onValueChange,
  value,
}: {
  onValueChange: (value: QuizEditorValue) => void;
  value: QuizEditorValue;
}) => {
  const { watch, ...form } = useForm<QuizEditorValue>({
    defaultValues: value,
    resolver: zodResolver(schema),
  });
  const {
    fields: answers,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "answers",
  });
  const [isSaved, setIsSaved] = useState(true);

  const answersContent = watch("answers");
  useEffect(() => {
    const subscription = watch((values, { name, type }) => {
      if (name) {
        // Check if the change is triggered by a field
        setIsSaved(false);
      }
    });
    return () => subscription.unsubscribe(); // Cleanup subscription
  }, [watch]);

  const handleSubmit = (data: QuizEditorValue) => {
    console.log(data);
    onValueChange(data);
    setIsSaved(true);
  };
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <Card className="p-6 w-full">
        <Editor
          defaultValue={form.getValues("questionContent")}
          onDebouncedUpdate={(editor) => {
            if (!editor) return;
            const content = editor.getHTML();
            form.setValue("questionContent", content);
          }}
          debounceDuration={100}
          className="w-full  rounded-md p-4"
        ></Editor>
        {form.formState.errors.questionContent && (
          <div className="text-red-500">
            {form.formState.errors.questionContent.message}
          </div>
        )}
        <div className="flex items-center justify-between py-2 ">
          <h2 className="text-lg font-semibold">Варианты ответа</h2>
          <Button
            size={"sm"}
            variant={"outline"}
            type="button"
            onClick={() => append({ content: "", answerId: uuid() })}
          >
            <PlusIcon></PlusIcon>
            Добавить
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          {answers.map((answer, index) => (
            <div key={answer.id} className="flex items-center gap-2">
              <Input
                type="text"
                {...form.register(`answers.${index}.content`)}
              />
              <Button
                variant="outline"
                type="button"
                onClick={() => remove(index)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {form.formState.errors.answers && (
            <div className="text-red-500">
              {form.formState.errors.answers.message}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <h2 className="text-lg font-semibold">Правильный ответ</h2>
          <Select
            value={watch("correctAnswerId")}
            name="correctAnswerId"
            onValueChange={(value) => {
              const selectedAnswer = answersContent.find(
                (answer) => answer.answerId === value
              );
              if (!selectedAnswer) return;
              form.setValue("correctAnswerId", selectedAnswer.answerId);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Правильный ответ" />
            </SelectTrigger>
            <SelectContent>
              {answersContent?.map((field, index) => (
                <SelectItem key={field.answerId} value={field.answerId}>
                  {field.content}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.correctAnswerId && (
            <div className="text-red-500">
              {form.formState.errors.correctAnswerId.message}
            </div>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <Button disabled={isSaved} type="submit">
            {isSaved ? "Сохранено" : "Сохранить"}
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default QuizEditor;
