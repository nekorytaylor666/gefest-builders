import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TypographyH2 from "@/components/ui/typography/h2";
import TypographyP from "@/components/ui/typography/p";
import { cn } from "@/lib/utils";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { useCallback } from "react";

interface CourseMilestoneNodeButtonProps {
  onClick: () => void;
  label: string;
  completed?: boolean;
}

function CourseMilestoneNodeButton({
  onClick,
  label,
  completed,
}: CourseMilestoneNodeButtonProps) {
  const { RiveComponent, rive } = useRive({
    src: "/milestone.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });
  const labelDic = {
    practice: "Практика",
    lecture: "Лекция",
  };
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center flex-col">
          <RiveComponent className="h-24 w-24" />
          <p className="font-semibold">{label}</p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col items-center justify-center text-center gap-4">
        <h3 className="scroll-m-20   first:mt-0 flex items-center gap-1">
          {completed && (
            <CheckCircledIcon
              height={24}
              width={24}
              className="text-green-500 "
            />
          )}
          <h3
            className={cn(
              "text-lg font-bold tracking-tight transition-colors",
              {
                "text-green-500": completed,
                "text-muted-foreground": !completed,
              }
            )}
          >
            {label}
          </h3>
        </h3>

        <Button onClick={onClick} className="w-full">
          {completed ? "Повторить" : "Начать"}
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export default CourseMilestoneNodeButton;
