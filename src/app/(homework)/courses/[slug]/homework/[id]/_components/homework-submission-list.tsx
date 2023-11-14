import { trpc } from "@/app/_trpc/client";
import SubmissionFileCard from "@/components/submission-file-card";
import { Button } from "@/components/ui/button";
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
    <div>
      <div className="flex justify-between items-center">
        <TypographyH3>Загружено на проверку!</TypographyH3>
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
  );
};

export default HomeworkSubmissionsList;
