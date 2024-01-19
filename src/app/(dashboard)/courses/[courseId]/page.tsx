import { serverClient } from "@/app/_trpc/serverClient";
import CoursePageContainer from "@/components/pages/coursePage/coursePageContainer";
import { ProcedureReturnType } from "@/lib/utils";

async function Page(context: { params: { courseId: string } }) {
  const { courseId } = context.params;

  const course = await serverClient.courses.getCourseById(Number(courseId));
  return <CoursePageContainer course={course}></CoursePageContainer>;
}

export default Page;
