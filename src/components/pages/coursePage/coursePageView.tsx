import React from "react";
import CourseMilestoneMap from "@/app/(dashboard)/courses/[courseId]/_components/courseMilestoneMap";
import {
  ArrowLeftIcon,
  CardStackIcon,
  Pencil1Icon,
} from "@radix-ui/react-icons";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Link from "next/link";
import { Button } from "../../ui/button";
import { Card, CardHeader, CardDescription, CardContent } from "../../ui/card";
import TypographyH2 from "../../ui/typography/h2";
import Image from "next/image";
import { AppRouter, ReactQueryOptions } from "@/server";
import { CourseData, CoursePageProps } from "./type";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/app/_trpc/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HomeworkList from "@/app/(dashboard)/courses/[courseId]/_components/courseHomeworksList";
import { useUser } from "@/lib/hooks/useUserSession";

const CoursePageView = (props: { course: CourseData; other?: any }) => {
  const { course } = props;
  const { data: userData, isLoading: isUserLoading } = useUser();

  if (!course) {
    return <div></div>;
  }
  const userId = userData?.user?.id;

  const {
    data: finishedLessons,
    isLoading: isProgressLoading,
    error,
  } = trpc.courses.getUserLessonProgress.useQuery(
    {
      courseId: course.id,
      userId: userId!,
    },
    { enabled: !!userId }
  );

  const totalLessons = course.lessons.length;
  const completedLessons = finishedLessons?.length ?? 0;

  const courseProgress = (completedLessons / totalLessons) * 100;
  return (
    <Tabs defaultValue="map">
      <div className="grid grid-cols-1 items-start lg:grid-cols-5 container max-w-screen-xl p-0 gap-8">
        <div className="p-4 lg:col-span-2">
          <Button asChild className="text-muted-foreground" variant={"ghost"}>
            <Link href={"/"}>
              <ArrowLeftIcon className="mr-2"></ArrowLeftIcon>
              Назад
            </Link>
          </Button>
          <TabsList className="w-full">
            <TabsTrigger className="w-full flex gap-1" value="map">
              <CardStackIcon></CardStackIcon> Уроки
            </TabsTrigger>
            <TabsTrigger className="w-full flex gap-1" value="homework">
              <Pencil1Icon></Pencil1Icon> Домашние задания
            </TabsTrigger>
          </TabsList>
          <Card className="mt-4">
            <CardHeader>
              <div className="flex items-center justify-center">
                <Image
                  width={250}
                  height={250}
                  src={course.thumbnailPath}
                  alt={course.title ?? "course-thumbnail"}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Уроков - {course.lessons.length}
              </p>
              <TypographyH2>{course.title}</TypographyH2>
              <CardDescription className="text-md">
                {course.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="pb-2 font-semibold">Прогресс:</p>
              <CourseProgressBar
                courseProgress={courseProgress}
                courseSlug={course?.slug ?? ""}
              ></CourseProgressBar>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-start-3 lg:col-span-3">
          <TabsContent value="map">
            <ScrollArea className="lg:h-[calc(100vh-100px)] scroll-smooth ">
              <CourseMilestoneMap
                finishedLessons={finishedLessons ?? []}
                courseId={course.id}
                lessons={course.lessons ?? []}
              ></CourseMilestoneMap>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="homework">
            <HomeworkList
              courseId={course?.id ?? ""}
              homeworks={course?.homeworks}
            ></HomeworkList>
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
};

export function CourseProgressBar({
  courseSlug,
  courseProgress,
}: {
  courseProgress: number | undefined;
  courseSlug: string;
}) {
  return (
    <div>
      {courseProgress === undefined ? (
        <Skeleton className="w-full h-2"> </Skeleton>
      ) : (
        <Progress value={courseProgress}></Progress>
      )}
    </div>
  );
}

export default CoursePageView;
