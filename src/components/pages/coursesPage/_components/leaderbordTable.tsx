import { trpc } from "@/app/_trpc/client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import TypographyH3 from "@/components/ui/typography/h3";
import { useUser } from "@/lib/hooks/useUserSession";
import { cn } from "@/lib/utils";
import { ArrowUp, Flame } from "lucide-react";
import React, { Suspense } from "react";

const LeaderboardTable = () => {
  return (
    <div>
      <TypographyH3>Ваша лига</TypographyH3>
      <Card className="mt-2">
        <CardContent className="p-4">
          <Suspense fallback={<Skeleton className="h-96"></Skeleton>}>
            <div className="h-96 grid grid-rows-2">
              <div>Текущая лига</div>
              <LeaderboardTableView></LeaderboardTableView>
            </div>
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

const LeaderboardTableView = () => {
  const [ranking] = trpc.activities.userRanking.useSuspenseQuery();
  const { data } = useUser();
  const user = data?.user;

  return (
    <ScrollArea className="h-full ">
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
              <Flame className="text-orange-500"></Flame>
            </div>
          </div>
          {index === 4 && (
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
