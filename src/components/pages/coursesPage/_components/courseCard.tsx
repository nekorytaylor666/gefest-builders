import { serverClient } from "@/app/_trpc/serverClient";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import TypographyH2 from "@/components/ui/typography/h2";
import { ProcedureReturnType } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type CourseCardProps = {
  course: ProcedureReturnType<
    (typeof serverClient)["courses"]["listCourses"]["query"]
  >[number];
};

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => (
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
    <CardContent className="min-h-[200px]">
      {course.disabled ? null : (
        <div className="flex items-center flex-wrap justify-between">
          <span className="font-medium text-muted-foreground ">
            Уроков {course.lessons.length}
          </span>{" "}
          <Badge className="bg-accent text-accent-foreground">
            Рекомендовано
          </Badge>
        </div>
      )}
      <div className="pt-6">
        <TypographyH2>{course?.title}</TypographyH2>
        <CardDescription className="pt-2">{course.description}</CardDescription>
      </div>
    </CardContent>
    <CardFooter>
      {course.disabled ? (
        <Button variant="secondary" disabled className="w-full opacity-50 ">
          Заблокировано
        </Button>
      ) : (
        <Button variant="default" className="w-full" asChild>
          <Link href={"/courses/" + course.id}>Детали программы</Link>
        </Button>
      )}
    </CardFooter>
  </Card>
);
