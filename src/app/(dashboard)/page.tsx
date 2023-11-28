import { serverClient } from "../_trpc/serverClient";
import CoursesPageContainer from "@/components/pages/coursesPage/coursesPageContainer";
import { getSession } from "@auth0/nextjs-auth0";
import { cache } from "react";

export default async function Home() {
  const courses = await serverClient.courses.listCourses();
  const orderedCourses = courses.sort((a, b) => a.id - b.id);
  return <CoursesPageContainer courses={orderedCourses}></CoursesPageContainer>;
}

export const revalidate = 600;
