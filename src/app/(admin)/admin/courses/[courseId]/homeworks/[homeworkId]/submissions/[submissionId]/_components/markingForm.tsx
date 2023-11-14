"use client";
import { trpc } from "@/app/_trpc/client";
import { serverClient } from "@/app/_trpc/serverClient";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import TypographyH3 from "@/components/ui/typography/h3";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { inferAsyncReturnType } from "@trpc/server";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const reviewSchema = z.object({
  comment: z.string(),
  mark: z.number(),
});
type ReviewSchemaType = z.infer<typeof reviewSchema>;
interface SubmissionMarkingFormProps {
  submissionId: number;
  userId: string;
}
const SubmissionMarkingForm = ({
  submissionId,
  userId,
}: SubmissionMarkingFormProps) => {
  const { register, handleSubmit, formState, watch, setValue } =
    useForm<ReviewSchemaType>({
      resolver: zodResolver(reviewSchema),
      defaultValues: {
        mark: 6,
        comment: "",
      },
    });
  const reviewMutation = trpc.review.createReview.useMutation();

  const markValue = watch("mark");
  const onSubmit = (data: ReviewSchemaType) => {
    reviewMutation.mutate({
      type: "TEACHER",
      submissionId,
      userId,
      ...data,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8 max-w-lg"
    >
      <TypographyH3>Оценить работу</TypographyH3>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Оценка</Label>
          <div>{markValue} из 12</div>
        </div>
        <Slider
          step={1}
          max={12}
          onValueChange={([value]: number[]) => {
            setValue("mark", value);
          }}
          value={[watch("mark")]}
          {...(register("mark") as {
            name: string;
          })}
        />
        {formState.errors.mark && (
          <p className="text-sm-text-red-500">
            {formState.errors.mark.message?.toString()}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Комментарий учителя</Label>
        <Textarea
          placeholder="В целом хорошая работа..."
          {...register("comment")}
        />
        {formState.errors.comment && (
          <p className="text-sm-text-red-500">
            {formState.errors.comment.message?.toString()}
          </p>
        )}
      </div>

      <Button className="w-36" type="submit">
        Оценить
      </Button>
    </form>
  );
};

export default SubmissionMarkingForm;
