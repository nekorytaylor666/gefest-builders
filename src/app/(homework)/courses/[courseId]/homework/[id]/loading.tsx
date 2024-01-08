import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import TypographyH1 from "@/components/ui/typography/h1";
import TypographyP from "@/components/ui/typography/p";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import HomeworkContent from "./_components/homework-content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="container lg:h-[80vh] p-4">
      <div className="flex flex-col items-start gap-4">
        <Button asChild className="text-muted-foreground" variant={"ghost"}>
          <Link href={"/"}>
            <ArrowLeftIcon className="mr-2"></ArrowLeftIcon>
            Назад
          </Link>
        </Button>
        <TypographyH1>Домашнее Задание</TypographyH1>
      </div>
      <Tabs defaultValue="content" className="my-8 h-full ">
        <TabsList className="w-full grid grid-cols-2 h-12">
          <TabsTrigger className="h-full" value="content">
            Задание
          </TabsTrigger>
          <TabsTrigger disabled className="h-full" value="submission">
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
              <Skeleton className="w-full h-[1000px]"></Skeleton>
            </CardContent>
            <CardFooter className="flex justify-between"></CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="submission">
          {/* <Card className="w-full col-span-2 flex flex-col justify-between h-full">
            <CardHeader>
              <CardTitle>
                <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                  Загрузить на проверку
                </h2>
              </CardTitle>
              <CardDescription className="h-full flex flex-col justify-center">
                <div>Deploy your new project in one-click.</div>
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter>
          </Card> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
