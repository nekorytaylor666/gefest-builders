import { serverClient } from "../_trpc/serverClient";
import CoursesPageContainer from "@/components/pages/coursesPage/coursesPageContainer";

export default async function Home() {
  const courses = await serverClient.courses.listCourses();
  const orderedCourses = courses.sort((a, b) => a.id - b.id);
  return <CoursesPageContainer courses={orderedCourses}></CoursesPageContainer>;
}
export const dynamic = "force-dynamic";
export const revalidate = 600;
