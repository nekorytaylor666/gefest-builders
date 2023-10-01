import { serverClient } from "@/app/_trpc/serverClient";
import { ProcedureReturnType } from "@/lib/utils";

export type CoursePageProps = {
  course: ProcedureReturnType<
    (typeof serverClient)["courses"]["getCourseBySlug"]
  >;
};

export type CourseData = CoursePageProps["course"];
