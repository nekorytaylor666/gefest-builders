"use client";
import TypographyH1 from "@/components/ui/typography/h1";
import React from "react";
import { DashboardHeader } from "../../../_components/dashboardHeader";
import { DashboardShell } from "../../../_components/dashboardShell";
import { DataTable } from "@/components/data-table";
import { columns } from "./_components/columns";
import { serverClient } from "@/app/_trpc/serverClient";
import { Button } from "@/components/ui/button";
import LessonsPageAction from "./_components/lessonsPageActions";
import { trpc } from "@/app/_trpc/client";
import { Skeleton } from "@/components/ui/skeleton";

const LessonsPage = ({ params }: { params: { courseId: string } }) => {
  const courseId = Number(params.courseId);
  const { data, isLoading, isError } =
    trpc.lessons.getLessonsByCourseId.useQuery(courseId);
  if (isLoading || isError) {
    return (
      <div className="flex flex-col">
        <Skeleton className="h-16 w-1/2" />
        <Skeleton className="h-[600px] mt-8 w-full" />
      </div>
    );
  }
  return (
    <DashboardShell>
      <DashboardHeader heading="Уроки" text="Управляйте своими уроками курса">
        <LessonsPageAction courseId={courseId}></LessonsPageAction>
      </DashboardHeader>
      <DataTable columns={columns} data={data}></DataTable>
    </DashboardShell>
  );
};

export const dynamic = "force-dynamic";
export default LessonsPage;
