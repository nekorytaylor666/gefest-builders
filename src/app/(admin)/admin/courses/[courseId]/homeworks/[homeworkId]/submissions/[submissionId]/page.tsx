import TypographyH1 from "@/components/ui/typography/h1";
import React from "react";

import { DataTable } from "@/components/data-table";
import { serverClient } from "@/app/_trpc/serverClient";
import { DashboardHeader } from "@/app/(admin)/admin/_components/dashboardHeader";
import { DashboardShell } from "@/app/(admin)/admin/_components/dashboardShell";

const SubmissionDetailsPage = async ({
  params,
}: {
  params: { homeworkId: string };
}) => {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Ответ на домашку"
        text="Тут видны ответы на домашки"
      ></DashboardHeader>
    </DashboardShell>
  );
};

export default SubmissionDetailsPage;
