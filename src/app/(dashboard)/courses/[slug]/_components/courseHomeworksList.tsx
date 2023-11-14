import { serverClient } from "@/app/_trpc/serverClient";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import TypographyH2 from "@/components/ui/typography/h2";
import { ProcedureReturnType } from "@/lib/utils";
import { Homework } from "@prisma/client";
import { inferAsyncReturnType } from "@trpc/server";
import Link from "next/link";
import React from "react";
import { format, formatDistance } from "date-fns";
import ru from "date-fns/locale/ru";
import { ClockIcon } from "@radix-ui/react-icons";
interface Props {
  homeworks: any;
  courseSlug: string;
}

const HomeworkList = (props: Props) => {
  const { homeworks, courseSlug } = props;

  return (
    <div className="pt-8 p-4">
      <TypographyH2>Домашние задания</TypographyH2>
      <div className="mt-4 flex flex-col gap-4  ">
        {homeworks.map((homework: Homework) => (
          <Link
            key={homework.id}
            href={`/courses/${courseSlug}/homework/${homework.id}`}
          >
            <Card className="transition-all duration-75 cursor-pointer hover:bg-muted">
              <CardHeader>
                <CardTitle>
                  <div className="flex justify-between items-center">
                    <div>{homework.title}</div>
                  </div>
                </CardTitle>
                <CardDescription className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">
                    {`Обновлено ${formatDistance(
                      homework.updatedAt,
                      new Date(),
                      {
                        addSuffix: true,
                        locale: ru,
                      }
                    )}`}
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeworkList;
