import TypographyH1 from "@/components/ui/typography/h1";
import React from "react";

import { DataTable } from "@/components/data-table";
import { serverClient } from "@/app/_trpc/serverClient";
import { DashboardHeader } from "@/app/(admin)/admin/_components/dashboardHeader";
import { DashboardShell } from "@/app/(admin)/admin/_components/dashboardShell";
import { columns } from "./_components/columns";

const HomeworksPage = async ({
  params,
}: {
  params: { homeworkId: string };
}) => {
  const submissions = await serverClient.submissions.listHomeworkSubmissions(
    Number(params.homeworkId)
  );
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Ответы на домашки"
        text="Тут видны ответы на домашки"
      ></DashboardHeader>
      <DataTable columns={columns} data={submissions}></DataTable>
    </DashboardShell>
  );
};

export default HomeworksPage;
