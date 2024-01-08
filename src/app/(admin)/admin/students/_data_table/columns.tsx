"use client";

import { trpc } from "@/app/_trpc/client";
import { serverClient } from "@/app/_trpc/serverClient";
import { Badge } from "@/components/ui/badge";
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
import { DotsHorizontalIcon, PlusIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { inferAsyncReturnType } from "@trpc/server";
import Link from "next/link";
import UserCohortColumn from "./cohortSelest";
import { Button } from "@/components/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Student = inferAsyncReturnType<
  (typeof serverClient)["students"]["list"]
>[number];

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "email",
    header: "Почта",
  },
  {
    header: "Когорта",
    accessorFn: (row) => {
      const cohorts = row.userCohorts.map((el) => el.cohort.name).flat();
      console.log("user cohorts:", cohorts);
      return cohorts;
    },
    filterFn: "includesString",
    enableColumnFilter: true,
    cell: ({ row }) => {
      const userCohorts = row.original.userCohorts;

      return (
        <UserCohortColumn
          userId={row.original.id}
          userCohorts={userCohorts}
        ></UserCohortColumn>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
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
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${user.id}`}>Перейти к студенту</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
