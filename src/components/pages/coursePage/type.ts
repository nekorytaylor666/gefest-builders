import { serverClient } from "@/app/_trpc/serverClient";
import { ProcedureReturnType } from "@/lib/utils";

export type CoursePageProps = {
  courseDataWithUserProgress: ProcedureReturnType<
    (typeof serverClient)["courses"]["getCourseDataWithUserProgress"]
  >;
};

export type CourseData =
  CoursePageProps["courseDataWithUserProgress"]["course"];
