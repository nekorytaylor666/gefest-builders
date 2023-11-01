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
import { ProcedureReturnType } from "@/lib/utils";
import { DotsHorizontalIcon, FileIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { inferAsyncReturnType } from "@trpc/server";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Lesson = inferAsyncReturnType<
  (typeof serverClient)["submissions"]["listHomeworkSubmissions"]
>[0];

export const columns: ColumnDef<Lesson>[] = [
  {
    accessorKey: "fileUploads",
    header: "Файлы",
    cell: ({ row }) => {
      const submission = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Действия</span>
              <FileIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Скачать файлы</DropdownMenuLabel>
            {submission.fileUploads.map((el: any) => (
              <DropdownMenuItem asChild key={el?.location}>
                <a href={el?.location}>{el?.name}</a>
              </DropdownMenuItem>
            ))}
            {/* <DropdownMenuItem asChild>
              <Link
                href={`/admin/courses/${row.original.courseId}/homeworks/${homework.id}/editor`}
              >
                Редактировать задание
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={`/admin/courses/${row.original.courseId}/homeworks/${homework.id}/submissions`}
              >
                Проверить ответы
              </Link>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "user.fullName",
    header: "Студент",
  },
  { accessorKey: "updatedAt", header: "Последнее обновление" },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const homework = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Действия</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Действия</DropdownMenuLabel>
            {/* <DropdownMenuItem asChild>
              <Link
                href={`/admin/courses/${row.original.courseId}/homeworks/${homework.id}/editor`}
              >
                Редактировать задание
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={`/admin/courses/${row.original.courseId}/homeworks/${homework.id}/submissions`}
              >
                Проверить ответы
              </Link>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
