import SubmissionFileCard from "@/components/submission-file-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Submission } from "@prisma/client";
import React from "react";

const HomeworkLoadingSkeleton = () => {
  return (
    <Card className="w-full col-span-2 flex flex-col justify-between h-full">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-16 w-1/2" />
        </CardTitle>
        <CardDescription className="h-full flex flex-col justify-center">
          <div>
            <Skeleton className="h-8 w-full" />
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[600px] mt-8 w-full" />
      </CardContent>
    </Card>
  );
};

export default HomeworkLoadingSkeleton;
