import TypographyH1 from "@/components/ui/typography/h1";
import React from "react";
import { DashboardHeader } from "../../../_components/dashboardHeader";
import { DashboardShell } from "../../../_components/dashboardShell";
import { DataTable } from "@/components/data-table";
import { columns } from "./_components/columns";
import { serverClient } from "@/app/_trpc/serverClient";

const LessonsPage = async ({ params }: { params: { courseId: string } }) => {
  const lessons = await serverClient.lessons.getLessonsByCourseId(
    Number(params.courseId)
  );
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Уроки"
        text="Управляйте своими уроками курса"
      ></DashboardHeader>
      <DataTable columns={columns} data={lessons}></DataTable>
    </DashboardShell>
  );
};

export default LessonsPage;
