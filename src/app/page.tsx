import Image from "next/image";
import { serverClient } from "./_trpc/serverClient";
import TypographyH1 from "@/components/ui/typography/h1";
import { Toggle } from "@/components/ui/toggle";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import TypographyH2 from "@/components/ui/typography/h2";
import CoursesPageContainer from "@/components/pages/coursesPage/coursesPageContainer";
import { getSession } from "@auth0/nextjs-auth0";

export default async function Home() {
  const courses = await serverClient.courses.listCourses();
  const session = await getSession();

  return (
    <CoursesPageContainer
      courses={courses}
      user={session?.user}
    ></CoursesPageContainer>
  );
}
