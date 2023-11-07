import { serverClient } from "@/app/_trpc/serverClient";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { inferAsyncReturnType } from "@trpc/server";
import React from "react";

interface ReviewCardProp {
  review: inferAsyncReturnType<
    typeof serverClient.review.listReviewForSubmission
  >[0];
}

const ReviewCard = (props: ReviewCardProp) => {
  return (
    <div>
      <Card>
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
      </Card>
    </div>
  );
};

export default ReviewCard;
