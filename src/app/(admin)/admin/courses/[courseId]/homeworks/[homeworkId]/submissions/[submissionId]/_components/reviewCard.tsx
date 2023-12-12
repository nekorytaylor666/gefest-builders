"use client";
import { trpc } from "@/app/_trpc/client";
import { serverClient } from "@/app/_trpc/serverClient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Review } from "@prisma/client";
import { inferAsyncReturnType } from "@trpc/server";
import { useRouter } from "next/navigation";
import React from "react";

interface ReviewCardProp {
  review: Review;
}

const ReviewCard = (props: ReviewCardProp) => {
  const { toast } = useToast();
  const router = useRouter();
  const removeReviewSubmissionMutation =
    trpc.review.removeReviewFromSubmission.useMutation({
      onSuccess() {
        toast({ title: "Оценка удалена" });
        router.refresh();
      },
    });
  return (
    <Card className="h-full flex flex-col justify-between">
      <div>
        <CardHeader className="font-bold text-lg">
          Оценка: {props.review.mark}
        </CardHeader>
        <CardContent>
          <blockquote className="blockquote mb-0">
            <footer className="blockquote-footer">
              Комментарий: {props.review.comment}
            </footer>
          </blockquote>
        </CardContent>
      </div>
      <CardFooter>
        <Button
          onClick={() => {
            removeReviewSubmissionMutation.mutate(props.review.submissionId);
          }}
          variant={"destructive"}
        >
          Убрать оценку
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReviewCard;
