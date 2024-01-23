"use client";
import React from "react";
import { DashboardShell } from "../_components/dashboardShell";
import { DashboardHeader } from "../_components/dashboardHeader";
import { serverClient } from "@/app/_trpc/serverClient";
import { Button } from "@/components/ui/button";
import { columns } from "./_data_table/columns";
import { trpc } from "@/app/_trpc/client";
import { useSearchParams, useRouter } from "next/navigation";
import { DataTable } from "./_data_table/data-table";

const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
}: {
  itemsPerPage: number;
  totalItems: number;
  paginate: (page: number) => void;
}) => {
  const pageNumbers = [];

  for (let i = 0; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} className="page-link">
              {number + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const CoursesPage = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? 0);
  const take = Number(searchParams.get("take") ?? 50);
  const [students] = trpc.students.list.useSuspenseQuery({
    skip: page * take,
    take: take,
  });
  const [totalStudents] =
    trpc.students.getTotalNumberOfStudents.useSuspenseQuery();
  const router = useRouter();
  return (
    <DashboardShell>
      <DashboardHeader heading="Студенты" text="Управление студентами курса">
        <Button>Добавить</Button>
      </DashboardHeader>
      <DataTable columns={columns} data={students}></DataTable>
    </DashboardShell>
  );
};

export default CoursesPage;
