import TypographyH1 from "@/components/ui/typography/h1";
import React from "react";
import { DashboardHeader } from "../../../_components/dashboardHeader";
import { DashboardShell } from "../../../_components/dashboardShell";
import { DataTable } from "@/components/data-table";
import { columns } from "./_components/columns";
import { serverClient } from "@/app/_trpc/serverClient";

const HomeworksPage = async ({ params }: { params: { courseId: string } }) => {
  const homeworks = await serverClient.homework.listCourseHomeworks(
    Number(params.courseId)
  );
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Домашние задания"
        text="Домашние задания курса"
      ></DashboardHeader>
      <DataTable columns={columns} data={homeworks}></DataTable>
    </DashboardShell>
  );
};

export default HomeworksPage;
