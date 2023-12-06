import React from "react";
import { DashboardShell } from "../_components/dashboardShell";
import { DashboardHeader } from "../_components/dashboardHeader";
import { serverClient } from "@/app/_trpc/serverClient";
import { columns } from "./_components/columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import CoursePageActions from "./_components/lessonsPageActions";

const CoursesPage = async () => {
  const courses = await serverClient.courses.listCourses();
  return (
    <DashboardShell>
      <DashboardHeader heading="Курсы" text="Управляйте своими курсами">
        <CoursePageActions></CoursePageActions>
      </DashboardHeader>
      <DataTable columns={columns} data={courses}></DataTable>
    </DashboardShell>
  );
};

export default CoursesPage;
