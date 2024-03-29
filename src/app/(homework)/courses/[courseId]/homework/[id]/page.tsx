import { serverClient } from "@/app/_trpc/serverClient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import TypographyH1 from "@/components/ui/typography/h1";
import TypographyP from "@/components/ui/typography/p";
import {
  divideMarkdown,
  serializeAllMdxSections,
  serializeMdxContent,
} from "@/lib/mdx-utils";
import { Label } from "@radix-ui/react-label";
import React from "react";
import fs from "fs";
import MDXRenderer from "@/components/mdx-renderer";
import HomeworkContent from "./_components/homework-content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import HomeworkSubmission from "./_components/homework-submission";
import { APP_CONFIG } from "@/lib/config";

export default async function Page({
  params,
}: {
  params: { slug: string; id: string; courseId: string };
}) {
  const { id, courseId } = params;
  const homework = await serverClient.homework.getHomeworkById.query(
    Number(id)
  );

  const jsonContent =
    homework && homework.jsonContent && JSON.parse(homework.jsonContent as any);
  return (
    <div className="container lg:h-[80vh] p-4">
      <div className="flex flex-col items-start gap-4">
        <Button asChild className="text-muted-foreground" variant={"ghost"}>
          <Link href={`/courses/${courseId}`}>
            <ArrowLeftIcon className="mr-2"></ArrowLeftIcon>
            Назад
          </Link>
        </Button>
        <TypographyH1>Домашнее Задание</TypographyH1>
      </div>
      <Tabs defaultValue="content" className="my-8 h-full ">
        <TabsList className="w-full grid grid-cols-2 h-12">
          <TabsTrigger data-disabled className="h-full" value="content">
            Задание
          </TabsTrigger>
          <TabsTrigger data-disabled className="h-full" value="submission">
            Ваш ответ
          </TabsTrigger>
        </TabsList>
        <TabsContent value="content">
          <Card className="w-full col-span-3  ">
            <CardHeader>
              <CardTitle>
                <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                  Задание
                </h2>
              </CardTitle>
              <CardDescription>
                <TypographyP>
                  Внимательно прочитайте задание и загрузите файл с вашим
                  ответом в форму загрузки. Пожалуйста, убедитесь, что вы
                  загружаете правильный файл и что он соответствует требованиям
                  задания. Если у вас возникли какие-либо вопросы, пожалуйста,
                  обратитесь к преподавателю.
                </TypographyP>
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              <HomeworkContent content={jsonContent}></HomeworkContent>
            </CardContent>
            <CardFooter className="flex justify-between"></CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="submission">
          <HomeworkSubmission></HomeworkSubmission>
        </TabsContent>
      </Tabs>
    </div>
  );
}
