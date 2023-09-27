import Rive, { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { useState, useEffect, useCallback } from "react";
import TypographyP from "@/components/ui/typography/p";
import CourseMilestoneNodeButton from "./_components/courseMilestoneNode";
import CourseMilestoneMap from "./_components/courseMilestoneMap";
import { ScrollArea } from "@/components/ui/scroll-area";
import TypographyH1 from "@/components/ui/typography/h1";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import TypographyH2 from "@/components/ui/typography/h2";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { trpc } from "@/app/_trpc/client";
import { serverClient } from "@/app/_trpc/serverClient";
import { AppRouterPageRoute, getSession } from "@auth0/nextjs-auth0";
import CoursePageContainer from "@/components/pages/coursePage/coursePageContainer";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { ProcedureReturnType } from "@/lib/utils";

type CoursePageParams = {
  slug: string;
};
type CoursePageProps = {
  course: ProcedureReturnType<
    (typeof serverClient)["courses"]["getCourseBySlug"]
  >; // Замените CourseType на тип вашего курса
};

export default withPageAuthRequired(
  async function Page(context) {
    const user = await getSession();
    console.log(user?.user);
    const courseData = await serverClient.courses.getCourseDataWithUserProgress(
      {
        courseSlug: context?.params?.slug as string,
        userId: user?.user?.email,
      }
    );
    console.log(courseData);
    return (
      <CoursePageContainer
        courseDataWithUserProgress={courseData}
      ></CoursePageContainer>
    );
  },
  {
    returnTo({ params }) {
      return ("courses/" + params?.slug) as string;
    },
  }
);

// export const getServerSideProps = withPageAuthRequired({
//   async getServerSideProps(context) {
//     const course = await serverClient.courses.getCourseBySlug(
//       context?.params?.slug as string
//     );
//     return { props: { course } };
//   },
// });

// export default Page;
