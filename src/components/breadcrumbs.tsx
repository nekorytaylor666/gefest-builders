"use client";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";

const Breadcrumb = () => {
  const { courseId, id } = useParams();
  const pathname = usePathname();

  const crumbs = pathname.split("/").filter(Boolean);

  return (
    <nav className="p-2">
      <ul className="flex text-muted-foreground font-medium ">
        {crumbs.map((crumb, index) => {
          const path = `/${crumbs.slice(0, index + 1).join("/")}`;

          return (
            <li key={index}>
              <Link href={path}>{crumb}</Link>
              <span
                className={`mx-1 ${
                  index === crumbs.length - 1 ? "hidden" : ""
                }`}
              >
                /
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
