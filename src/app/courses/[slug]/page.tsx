import Image from "next/image";
import Rive, { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { useState, useEffect, useCallback } from "react";
import TypographyP from "@/components/ui/typography/p";
import CourseMilestoneNodeButton from "./components/courseMilestoneNode";
import CourseMilestoneMap from "./components/courseMilestoneMap";
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

type CoursePageParams = {
  slug: string;
};
export default async function Page({ params }: { params: CoursePageParams }) {
  const course = await serverClient.courses.getCourseBySlug(params.slug);
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
            <TypographyH2>{course?.title}</TypographyH2>
            <CardDescription className="text-md">
              {course?.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Уроков - {course?.lessons.length}
            </p>
          </CardContent>
        </Card>
      </div>

      <ScrollArea className="lg:h-[calc(100vh-100px)] scroll-smooth lg:col-start-3 lg:col-span-3">
        <CourseMilestoneMap
          lessons={course?.lessons ?? []}
        ></CourseMilestoneMap>
      </ScrollArea>
    </div>
  );
}
