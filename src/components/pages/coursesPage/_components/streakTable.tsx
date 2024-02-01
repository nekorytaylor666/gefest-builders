"use client";
import { trpc } from "@/app/_trpc/client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TypographyH3 from "@/components/ui/typography/h3";
import { cva } from "class-variance-authority";
import { Flame } from "lucide-react";
import React from "react";

const StreakTable = () => {
  const [{ groupedByDay, streak }] =
    trpc.activities.getActivityStreakAndDetails.useSuspenseQuery();
  return (
    <div className="h-full  flex flex-col">
      <TypographyH3>Ваш Стрик</TypographyH3>
      <Card className="h-full mt-2 p-4 grid grid-rows-[1fr_auto] pb-4 gap-4">
        <div className="flex items-center ">
          <Flame className="text-orange-500 w-10 h-10"></Flame>
          <h2 className="font-bold text-3xl ">{streak} дней стриков</h2>
        </div>
        <div className="w-full ">
          <div className="grid grid-cols-10 grid-rows-10 lg:gap-2 gap-1  aspect-square">
            <TooltipProvider>
              {Object.entries(groupedByDay).map(([key, value]) => (
                <StreakBox
                  key={key}
                  variant={value.length ? "active" : "default"}
                  value={value}
                ></StreakBox>
              ))}
            </TooltipProvider>
          </div>
        </div>
      </Card>
    </div>
  );
};

const StreakBox = ({
  variant = "default",
  value,
}: {
  variant?: "default" | "active";
  value: any[];
}) => {
  const calculateIntensity = (value: any[]) => {
    if (!value || value.length === 0) return "bg-zinc-300";
    const length = value.length;
    if (length > 10) return "bg-green-800";
    if (length > 8) return "bg-green-700";
    if (length > 6) return "bg-green-600";
    if (length > 4) return "bg-green-500";
    if (length > 2) return "bg-green-400";
    return "bg-green-300";
  };

  const intensity = React.useMemo(() => calculateIntensity(value), [value]);
  const boxClass = cva("w-full aspect-square   rounded-md", {
    variants: {
      variant: {
        default: "bg-zinc-300",
        active: intensity,
      },
    },
  });

  const tooltipContent = React.useMemo(() => {
    if (value.length === 1) return <p>{value.length} полезное действие</p>;
    if (value.length > 1) return <p>{value.length} полезных действий</p>;
  }, [value.length]);
  return (
    <Tooltip>
      <TooltipTrigger>
        <div className={boxClass({ variant })}></div>
      </TooltipTrigger>
      <TooltipContent>
        {value.length ? tooltipContent : <p>Нет активности</p>}
      </TooltipContent>
    </Tooltip>
  );
};

export default StreakTable;
