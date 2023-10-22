import { serverClient } from "../_trpc/serverClient";
import CoursesPageContainer from "@/components/pages/coursesPage/coursesPageContainer";
import { getSession } from "@auth0/nextjs-auth0";
import { cache } from "react";

export default async function Home() {
  const courses = await getCourses();
  return <CoursesPageContainer courses={courses}></CoursesPageContainer>;
}

const getCourses = cache(async () => {
  return await serverClient.courses.listCourses();
});

export const dynamic = "force-static";
