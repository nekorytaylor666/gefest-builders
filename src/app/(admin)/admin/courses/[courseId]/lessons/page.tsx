import TypographyH1 from "@/components/ui/typography/h1";
import React from "react";
import { DashboardHeader } from "../../../_components/dashboardHeader";
import { DashboardShell } from "../../../_components/dashboardShell";
import { DataTable } from "@/components/data-table";
import { columns } from "./_components/columns";
import { serverClient } from "@/app/_trpc/serverClient";
import { Button } from "@/components/ui/button";
import LessonsPageAction from "./_components/lessonsPageActions";

const LessonsPage = async ({ params }: { params: { courseId: string } }) => {
  const courseId = Number(params.courseId);
  const lessons = await serverClient.lessons.getLessonsByCourseId(courseId);
  return (
    <DashboardShell>
      <DashboardHeader heading="Уроки" text="Управляйте своими уроками курса">
        <LessonsPageAction courseId={courseId}></LessonsPageAction>
      </DashboardHeader>
      <DataTable columns={columns} data={lessons}></DataTable>
    </DashboardShell>
  );
};

export default LessonsPage;
