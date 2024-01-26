import { serverClient } from "@/app/_trpc/serverClient";
import { ProcedureReturnType } from "@/lib/utils";

export type ListCoursesOutput = ProcedureReturnType<
  (typeof serverClient)["courses"]["listCourses"]["query"]
>;

export type CoursesPageContainerProps = {
  courses: ListCoursesOutput;
};

export type CoursesPageViewProps = {
  courses: ListCoursesOutput;
};
