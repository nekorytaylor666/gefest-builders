import React from "react";
import { DashboardNav } from "./_components/adminNav/adminNav";
import { NavItem } from "./_components/adminNav/adminNav.types";
import { UserNav } from "@/components/user-nav";
import Link from "next/link";
import Image from "next/image";
import {
  BackpackIcon,
  BarChartIcon,
  HomeIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import "@mdxeditor/editor/style.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link className="cursor-pointer" href={"/"}>
            <Image
              className="block "
              width={150}
              height={47}
              src={"/logo.svg"}
              alt="logo"
            ></Image>
          </Link>

          <UserNav></UserNav>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
