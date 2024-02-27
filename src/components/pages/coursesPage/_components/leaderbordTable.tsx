"use client";
import { trpc } from "@/app/_trpc/client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import TypographyH2 from "@/components/ui/typography/h2";
import TypographyH3 from "@/components/ui/typography/h3";
import TypographyP from "@/components/ui/typography/p";
import { useUser } from "@/lib/hooks/useUserSession";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import Image from "next/image";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HiFire } from "react-icons/hi2";

const LeaderboardTable = () => {
  return (
    <div>
      <TypographyH3>Ваша Лига</TypographyH3>
      <Card className="mt-2">
        <CardContent className="p-4">
          <ErrorBoundary
            fallback={
              <div className="h-[450px] flex items-center justify-center">
                Войдите в аккаунт, чтобы узнать вашу лигу
              </div>
            }
          >
            <Suspense fallback={<Skeleton className="h-[450px]"></Skeleton>}>
              <div className="h-[450px] grid grid-rows-[auto_1fr]">
                <UserLeague></UserLeague>
                <LeaderboardTableView></LeaderboardTableView>
              </div>
            </Suspense>
          </ErrorBoundary>
        </CardContent>
      </Card>
    </div>
  );
};

const UserLeague = () => {
  const [league] = trpc.leagues.current.useSuspenseQuery();
  return (
    <div className="flex flex-col items-center p-4">
      <img
        className="w-36 aspect-square"
        width={250}
        height={250}
        src={league?.leagueCoverPath}
      ></img>
      <h3 className="font-semibold text-xl">{league?.name}</h3>
      <p className="text-muted-foreground text-sm">
        Топ 5 игроков перейдут в следующую лигу
      </p>
    </div>
  );
};

const LeaderboardTableView = () => {
  const [ranking] = trpc.activities.userRanking.useSuspenseQuery();
  const { data } = useUser();
  const user = data?.user;

  return (
    <ScrollArea className="h-full rounded-md">
      {ranking?.map((el, index) => (
        <div key={el?.name}>
          <div
            className={cn(
              "flex justify-between items-center p-2 rounded-md text-sm",
              el?.isCurrentUser && "bg-muted"
            )}
          >
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">{el?.rank}</span>
              {el?.isCurrentUser ? user?.email : el?.name}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-zinc-500 align-bottom text-sm font-medium">
                {el?.score}{" "}
              </span>{" "}
              <HiFire className="text-orange-600"></HiFire>
            </div>
          </div>
          {el?.rank === 4 && (
            <div className="flex justify-evenly items-center gap-2 p-2">
              <ArrowUp className="h-5 w-5"></ArrowUp>
              <h4 className="flex items-center font-bold">
                Переход в следующую лигу
              </h4>
              <ArrowUp className="h-5 w-5"></ArrowUp>
            </div>
          )}
        </div>
      ))}
    </ScrollArea>
  );
};

export default LeaderboardTable;
