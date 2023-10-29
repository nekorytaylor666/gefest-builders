import TypographyH1 from "@/components/ui/typography/h1";
import React from "react";
import { DashboardHeader } from "../../_components/dashboardHeader";
import { DashboardShell } from "../../_components/dashboardShell";
import { serverClient } from "@/app/_trpc/serverClient";
import { CouseEditForm } from "./_components/courseEditForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ActivityLogIcon } from "@radix-ui/react-icons";

const CoursePage = async ({ params }: { params: { courseId: number } }) => {
  const course = await serverClient.courses.getCourseById(
    Number(params.courseId)
  );
  if (!course) {
    return <div>Курс не найден</div>;
  }
  return (
    <DashboardShell>
      <DashboardHeader
        heading={course?.title ?? "Курс без заголовка"}
        text="Управляйте своим курсом"
      >
        <Button>
          <Link
            className="flex items-center gap-2"
            href={`/admin/courses/${course.id}/lessons`}
          >
            <ActivityLogIcon></ActivityLogIcon>
            Уроки курса
          </Link>
        </Button>
      </DashboardHeader>
      <CouseEditForm course={course}></CouseEditForm>
    </DashboardShell>
  );
};

export default CoursePage;
