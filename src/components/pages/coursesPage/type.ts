import { serverClient } from "@/app/_trpc/serverClient";
import { ProcedureReturnType } from "@/lib/utils";
import { Session, getSession } from "@auth0/nextjs-auth0";

export type ListCoursesOutput = ProcedureReturnType<
  (typeof serverClient)["courses"]["listCourses"]
>;

export type CoursesPageContainerProps = {
  courses: ListCoursesOutput;
};

export type CoursesPageViewProps = {
  courses: ListCoursesOutput;
};
