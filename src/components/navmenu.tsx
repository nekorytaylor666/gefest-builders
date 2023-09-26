"use client";
import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Skeleton } from "./ui/skeleton";

export function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/courses" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Курсы
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              О нас
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <LoginMenuItem></LoginMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const LoginMenuItem = () => {
  const user = useUser();
  if (user.isLoading) {
    return <Skeleton className="w-[100px] h-[32px] rounded-md" />;
  }
  return user.user?.email ? (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Аккаунт</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
          <ListItem title="Имя">
            {" "}
            <span className="text-muted-foreground">{user.user.name}</span>
          </ListItem>
          <ListItem title="Email">
            <span className="text-muted-foreground"> {user.user.email}</span>
          </ListItem>
          <ListItem
            href="/api/auth/logout"
            className="group hover:bg-destructive "
          >
            <span className="text-destructive group-hover:text-white">
              {" "}
              Выйти
            </span>
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  ) : (
    <NavigationMenuItem>
      <a href="/api/auth/login">
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          Войти
        </NavigationMenuLink>
      </a>
    </NavigationMenuItem>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
