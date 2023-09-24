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

export default async function Home() {
  const courses = await serverClient.courses.listCourses();
  const generateLinkToCourse = (slug: string) => {
    return "/courses/" + slug;
  };
  return (
    <main className="container py-12 max-w-screen-xl">
      <TypographyH1>Что ты хочешь узнать сегодня?</TypographyH1>
      <section className="pt-8">
        <div className="grid grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <div className="flex items-center justify-center">
                  <Image
                    width={250}
                    height={250}
                    src={"https://gefest.b-cdn.net/" + course.thumbnailPath}
                    alt={course.title}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center flex-wrap justify-between">
                  <span className="font-medium text-muted-foreground ">
                    Уроков {course.lessons.length}
                  </span>{" "}
                  <Badge className="bg-accent text-accent-foreground">
                    Рекомендовано
                  </Badge>
                </div>
                <div className="pt-6">
                  <TypographyH2>{course?.title}</TypographyH2>
                  <CardDescription className="pt-2">
                    {course.description}
                  </CardDescription>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href={generateLinkToCourse(course.slug)}>
                    Детали программы
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
