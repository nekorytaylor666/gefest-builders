import React from "react";
import CourseMilestoneMap from "@/app/courses/[slug]/_components/courseMilestoneMap";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Link from "next/link";
import { Button } from "../../ui/button";
import { Card, CardHeader, CardDescription, CardContent } from "../../ui/card";
import TypographyH2 from "../../ui/typography/h2";
import Image from "next/image";
import { AppRouter, ReactQueryOptions } from "@/server";
import { CourseData, CoursePageProps } from "./type";
import { Progress } from "@/components/ui/progress";

const CoursePageView = (props: CourseData & { other?: any }) => {
  const { course } = props;

  return (
    <div className="grid grid-cols-1 items-start lg:grid-cols-5 container max-w-screen-xl p-0">
      <div className="p-4 lg:col-span-2">
        <Button asChild className="text-muted-foreground" variant={"ghost"}>
          <Link href={"/"}>
            <ArrowLeftIcon className="mr-2"></ArrowLeftIcon>
            Назад
          </Link>
        </Button>
        <Card className="mt-4">
          <CardHeader>
            <div className="flex items-center justify-center">
              <Image
                width={250}
                height={250}
                src={"https://gefest.b-cdn.net/" + course?.thumbnailPath}
                alt={course?.title ?? "course-thumbnail"}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Уроков - {course?.lessons.length}
            </p>
            <TypographyH2>{course?.title}</TypographyH2>
            <CardDescription className="text-md">
              {course?.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="pb-2 font-semibold">Прогресс:</p>
            <Progress value={props.courseProgress}></Progress>
          </CardContent>
        </Card>
      </div>

      <ScrollArea className="lg:h-[calc(100vh-100px)] scroll-smooth lg:col-start-3 lg:col-span-3">
        <CourseMilestoneMap
          finishedLessons={props.lessonProgress}
          courseSlug={course?.slug ?? ""}
          lessons={course?.lessons ?? []}
        ></CourseMilestoneMap>
      </ScrollArea>
    </div>
  );
};

export default CoursePageView;
