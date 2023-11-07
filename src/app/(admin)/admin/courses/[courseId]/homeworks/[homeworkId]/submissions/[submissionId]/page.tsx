import TypographyH1 from "@/components/ui/typography/h1";
import React from "react";

import { DataTable } from "@/components/data-table";
import { serverClient } from "@/app/_trpc/serverClient";
import { DashboardHeader } from "@/app/(admin)/admin/_components/dashboardHeader";
import { DashboardShell } from "@/app/(admin)/admin/_components/dashboardShell";
import SubmissionFileCard from "@/components/submission-file-card";
import { format, sub } from "date-fns";
import { ru } from "date-fns/locale";
import { Separator } from "@/components/ui/separator";
import TypographyH3 from "@/components/ui/typography/h3";
import { Slider } from "@/components/ui/slider";
import SubmissionMarkingForm from "./_components/markingForm";
import TypographyP from "@/components/ui/typography/p";
import { ClockIcon, TimerIcon } from "@radix-ui/react-icons";
import ReviewCard from "./_components/reviewCard";

const SubmissionDetailsPage = async ({
  params,
}: {
  params: { homeworkId: string; submissionId: string };
}) => {
  const submission = await serverClient.submissions.getSubmissionById(
    Number(params.submissionId)
  );
  const reviews = await serverClient.review.listReviewForSubmission(
    Number(params.submissionId)
  );

  if (!submission?.id) {
    return <>Ошибка</>;
  }
  const userId = submission.userId;
  const submissionId = submission.id;
  return (
    <DashboardShell>
      <DashboardHeader
        heading={`Ответ от: ${submission?.user.fullName}`}
        text={`Задание: ${submission?.homework.title}.`}
      ></DashboardHeader>
      <div className="grid grid-cols-3 gap-12">
        <div className="col-span-1 flex flex-col gap-4">
          <TypographyH3>Оценить работу</TypographyH3>
          <SubmissionMarkingForm
            userId={userId}
            submissionId={submissionId}
          ></SubmissionMarkingForm>
        </div>

        <div className="col-span-2">
          <div className="flex justify-between items-center">
            <TypographyH3>Файлы ответы </TypographyH3>
            <p className="flex text-muted-foreground items-center gap-1">
              <ClockIcon></ClockIcon>
              Обновлено{" "}
              {format(submission?.updatedAt, "dd MMM", { locale: ru })}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {submission?.fileUploads.map((el: any) => (
              <SubmissionFileCard key={el.name} {...el}></SubmissionFileCard>
            ))}
          </div>
        </div>
      </div>
      <div>
        {reviews.map((el) => (
          <ReviewCard key={el.id} review={el}></ReviewCard>
        ))}
      </div>
    </DashboardShell>
  );
};

export default SubmissionDetailsPage;
