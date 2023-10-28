import TypographyH1 from "@/components/ui/typography/h1";
import React from "react";
import { DashboardShell } from "../_components/dashboardShell";
import { DashboardHeader } from "../_components/dashboardHeader";
import { serverClient } from "@/app/_trpc/serverClient";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { Button } from "@/components/ui/button";

const CoursesPage = async () => {
  const courses = await serverClient.courses.listCourses();
  return (
    <DashboardShell>
      <DashboardHeader heading="Курсы" text="Управляйте своими курсами">
        <Button>Добавить</Button>
      </DashboardHeader>
      <DataTable columns={columns} data={courses}></DataTable>
    </DashboardShell>
  );
};

export default CoursesPage;
