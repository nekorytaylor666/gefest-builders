import React from "react";
import { DashboardShell } from "../_components/dashboardShell";
import { DashboardHeader } from "../_components/dashboardHeader";
import { serverClient } from "@/app/_trpc/serverClient";
import { columns } from "./_components/columns";
import { DataTable } from "@/components/data-table";
import CoursePageActions from "./_components/coursePageActions";

const CoursesPage = async () => {
  const courses = await serverClient.courses.listCourses.query();
  return (
    <DashboardShell>
      <DashboardHeader heading="Курсы" text="Управляйте своими курсами">
        <CoursePageActions></CoursePageActions>
      </DashboardHeader>
      <DataTable columns={columns} data={courses}></DataTable>
    </DashboardShell>
  );
};

export const dynamic = "force-dynamic";

export default CoursesPage;
