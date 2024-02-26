"use client";
import React, { Suspense } from "react";
import { Loader } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import TypographyH3 from "../ui/typography/h3";
import { serverClient } from "@/app/_trpc/serverClient";
import { ProcedureReturnType } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { format, formatDistance } from "date-fns";
import ru from "date-fns/locale/ru";
import { trpc } from "@/app/_trpc/client";
import { Activity, ActivityType } from "@prisma/client";
import { HiFire } from "react-icons/hi2";

const ActivitiesBar = () => {
  return (
    <Popover>
      <ActivityTrigger></ActivityTrigger>
      <PopoverContent>
        <Suspense
          fallback={<Loader className="animate-spin text-zinc-500"></Loader>}
        >
          <ActivityContent></ActivityContent>
        </Suspense>
      </PopoverContent>
    </Popover>
  );
};

const ActivityContent = () => {
  const [activities] = trpc.activities.list.useSuspenseQuery();
  return (
    <div>
      <h4 className="font-semibold">Активность</h4>
      <Separator className="my-2"></Separator>
      <div className="flex flex-col gap-4 mt-4">
        {activities.map((el) => (
          <ActivityItem key={el.id} activity={el}></ActivityItem>
        ))}
      </div>
    </div>
  );
};

const ActivityItem = ({
  activity,
}: {
  activity: Activity & { type: ActivityType };
}) => {
  return (
    <div className="flex gap-4 items-center justify-between">
      <div className="flex flex-col gap-1">
        <h6 className="font-medium text-sm">{activity.type.label}</h6>
        <p className="text-xs text-zinc-500">
          {formatDistance(activity.createdAt, new Date(), {
            addSuffix: true,
            locale: ru,
          })}
        </p>
      </div>
      <div className="flex  items-center">
        <p className="font-medium text-orange-600 text-sm">
          +{activity.experience}
        </p>
        <HiFire className="text-orange-600 w-5 h-5"></HiFire>
      </div>
    </div>
  );
};

const ActivityTrigger = () => (
  <PopoverTrigger>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button size={"icon"} variant={"outline"}>
            <HiFire className="text-orange-600"></HiFire>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Моя активность</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </PopoverTrigger>
);

export default ActivitiesBar;
