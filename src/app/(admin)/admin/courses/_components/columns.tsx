"use client";

import { serverClient } from "@/app/_trpc/serverClient";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ProcedureReturnType } from "@/lib/utils";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { inferAsyncReturnType } from "@trpc/server";
import Link from "next/link";
import HomeworkAddForm from "../[courseId]/homeworks/_components/homeworkAddForm";
import LessonAddForm from "../[courseId]/lessons/_components/lessonAddForm";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Course = inferAsyncReturnType<
  (typeof serverClient)["courses"]["listCourses"]
>[0];

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: "Заголовок",
  },
  {
    accessorKey: "slug",
    header: "Слаг",
  },
  {
    accessorKey: "description",
    header: "Описания",
  },
  {
    accessorKey: "lessons",
    header: "Количество уроков",
    cell: ({ row }) => `${row.original.lessons.length}`,
  },
  {
    accessorKey: "disabled",
    header: "Публичная",
    cell: ({ row }) => `${row.original.disabled ? "Нет" : "Да"}`,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const course = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Действия</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col" align="end">
            <DropdownMenuItem asChild>
              <Button className="text-left" asChild variant={"ghost"}>
                <Link href={`/admin/courses/${course.id}`}>
                  Перейти к курсу
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button className="text-left" asChild variant={"ghost"}>
                <Link href={`/admin/courses/${course.id}/homeworks`}>
                  Перейти к домашкам
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"ghost"}>Добавить домашнее задание</Button>
                </PopoverTrigger>
                <PopoverContent className="w-96">
                  <HomeworkAddForm courseId={course.id}></HomeworkAddForm>
                </PopoverContent>
              </Popover>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"ghost"}>Добавить урок</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <LessonAddForm courseId={course.id}></LessonAddForm>
                </PopoverContent>
              </Popover>
              {/* <Link href={`/admin/courses/${course.id}`}>Перейти к курсу</Link> */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
