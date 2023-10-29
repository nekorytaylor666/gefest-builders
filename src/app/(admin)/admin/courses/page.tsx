import React from "react";
import { DashboardShell } from "../_components/dashboardShell";
import { DashboardHeader } from "../_components/dashboardHeader";
import { serverClient } from "@/app/_trpc/serverClient";
import { columns } from "./_components/columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";

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
