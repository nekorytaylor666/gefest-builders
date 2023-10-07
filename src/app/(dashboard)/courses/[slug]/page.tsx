import { serverClient } from "@/app/_trpc/serverClient";
import CoursePageContainer from "@/components/pages/coursePage/coursePageContainer";
import { ProcedureReturnType } from "@/lib/utils";

async function Page(context: any) {
  const course = await serverClient.courses.getCourseBySlug(
    context?.params?.slug
  );
  return <CoursePageContainer course={course}></CoursePageContainer>;
}

export async function generateStaticParams() {
  const courses = await serverClient.courses.listCourses();

  return courses.map((el) => el.id);
}

export default Page;
