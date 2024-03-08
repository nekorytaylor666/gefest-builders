import React from "react";
import { DashboardNav } from "./_components/adminNav/adminNav";
import { UserNav } from "@/components/navbar/user-nav";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/breadcrumbs";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link className="cursor-pointer flex items-center" href={"/"}>
            <Image
              className="block w-8 h-8 object-contain"
              width={150}
              height={47}
              src={"/logo.png"}
              alt="logo"
            ></Image>
            <span className="text-xl font-bold tracking-tight">
              Gefest Builders
            </span>
          </Link>
        </div>
      </header>
      <div className="container max-w-full grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          <Breadcrumbs></Breadcrumbs>
          {children}
        </main>
      </div>
    </div>
  );
}
