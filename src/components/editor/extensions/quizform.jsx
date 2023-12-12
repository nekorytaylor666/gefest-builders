import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import React from "react";
import { useForm } from "react-hook-form";

function QuizForm({ defaultValues, onFormSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    onFormSubmit(data);
  };

  return (
    <NodeViewWrapper>
      <form className="h-[400px] w-full" onSubmit={handleSubmit(onSubmit)}>
        <label>
          Вопрос:
          <Input {...register("question", { required: true })} />
        </label>
        {errors.question && <p>Это поле обязательно.</p>}

        <label>
          Опции:
          <Input {...register("options", { required: true })} />
        </label>
        {errors.options && <p>Это поле обязательно.</p>}

        <label>
          Правильный ответ:
          <Input {...register("correctAnswer", { required: true })} />
        </label>
        {errors.correctAnswer && <p>Это поле обязательно.</p>}

        <input type="submit" />
      </form>
    </NodeViewWrapper>
  );
}

export default QuizForm;
