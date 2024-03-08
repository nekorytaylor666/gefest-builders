"use client";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight, SlashIcon } from "lucide-react";

const Breadcrumbs = () => {
  const { courseId, id } = useParams();
  const pathname = usePathname();

  const crumbs = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList className="sm:gap-1">
        {crumbs.map((crumb, index) => {
          const path = `/${crumbs.slice(0, index + 1).join("/")}`;

          return (
            <>
              <BreadcrumbItem key={index}>
                <BreadcrumbLink href={path}>{crumb}</BreadcrumbLink>
              </BreadcrumbItem>
              {index !== crumbs.length - 1 && (
                <BreadcrumbSeparator>
                  <ChevronRight className="w-4 h-4" />
                </BreadcrumbSeparator>
              )}
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
