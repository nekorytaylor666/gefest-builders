"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  ArrowRightIcon,
  BackpackIcon,
  BarChartIcon,
  HomeIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { NavItem } from "./adminNav.types";
import TypographyH3 from "@/components/ui/typography/h3";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trpc } from "@/app/_trpc/client";
import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

const items: NavItem[] = [
  { title: "Главная", href: "/", icon: HomeIcon },
  {
    title: "Курсы",
    href: "/courses",
    icon: BackpackIcon,
  },
  { title: "Студенты", href: "/students", icon: PersonIcon },
  { title: "Стастика", href: "/stats", icon: BarChartIcon },
];

export function DashboardNav() {
  const path = usePathname();
  const { data, isLoading } = trpc.courses.listCourses.useQuery();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = item.icon ?? ArrowRightIcon;
        return (
          item.href && (
            <Link key={index} href={"/admin" + item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path === item.href ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}
