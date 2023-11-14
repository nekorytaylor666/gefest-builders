import { trpc } from "@/app/_trpc/client";
import SubmissionFileCard from "@/components/submission-file-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TypographyH3 from "@/components/ui/typography/h3";
import { useToast } from "@/components/ui/use-toast";
import { Submission } from "@prisma/client";
import React, { FC } from "react";

interface HomeworkSubmissionsListProps {
  submission: Submission;
}

const HomeworkSubmissionsList: FC<HomeworkSubmissionsListProps> = ({
  submission,
}) => {
  const { toast } = useToast();
  const deleteSubmissionMutation =
    trpc.submissions.deleteSubmission.useMutation({
      onMutate() {
        toast({
          title: "Ваш ответ удален! Учитель его не увидит ;)",
        });
      },
    });
  return (
    <Card className="w-full col-span-2 flex flex-col justify-between h-full">
      <CardHeader>
        <CardTitle>
          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Загружено на проверку!
          </h2>
        </CardTitle>
        <CardDescription className="h-full flex flex-col justify-center">
          <div>
            Вы загрузили ответ вашего домашнего задания. Вы можете его удалить и
            попробовать заново
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="flex justify-between items-center">
            <Button
              onClick={() => {
                deleteSubmissionMutation.mutate(submission.id);
              }}
            >
              Удалить ответ
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {submission.fileUploads.map((el: any) => (
              <SubmissionFileCard key={el.name} {...el}></SubmissionFileCard>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeworkSubmissionsList;
