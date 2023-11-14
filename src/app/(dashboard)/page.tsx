import { serverClient } from "../_trpc/serverClient";
import CoursesPageContainer from "@/components/pages/coursesPage/coursesPageContainer";
import { getSession } from "@auth0/nextjs-auth0";
import { cache } from "react";

export default async function Home() {
  const courses = await serverClient.courses.listCourses();
  return <CoursesPageContainer courses={courses}></CoursesPageContainer>;
}
