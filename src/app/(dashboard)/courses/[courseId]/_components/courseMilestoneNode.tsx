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
import MilestoneRive from "./milestone.riv";
import { BookCheck, Star } from "lucide-react";

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
    src: MilestoneRive,
    stateMachines: "State Machine 1",
    autoplay: true,
    shouldDisableRiveListeners: true,
  });
  const hoverInput = useStateMachineInput(rive, "State Machine 1", "Hovered");
  const pressedInput = useStateMachineInput(rive, "State Machine 1", "Clicked");

  const handleMouseEnter = useCallback(() => {
    if (rive && hoverInput) {
      hoverInput.value = true;
    }
  }, [hoverInput, rive]);

  const handleMouseLeave = useCallback(() => {
    if (rive && hoverInput) {
      hoverInput.value = false;
    }
  }, [hoverInput, rive]);

  const handleMouseDown = useCallback(() => {
    if (rive && pressedInput) {
      pressedInput.value = true;
    }
  }, [pressedInput, rive]);

  const handleMouseUp = useCallback(() => {
    if (rive && pressedInput) {
      pressedInput.value = false;
    }
  }, [pressedInput, rive]);

  const handleTouchStart = useCallback(() => {
    if (rive && pressedInput) {
      pressedInput.value = true;
    }
  }, [pressedInput, rive]);

  const handleTouchEnd = useCallback(() => {
    if (rive && pressedInput) {
      pressedInput.value = false;
    }
  }, [pressedInput, rive]);

  return (
    <Popover>
      <PopoverTrigger
        className="cursor-pointer"
        asChild
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative flex items-center justify-center">
          {/* <RiveComponent className="h-24 w-24" /> */}
          <Button
            size={"icon"}
            variant={"secondary"}
            className="w-16 h-16 mt-4 hover:bg-primary/100 hover:text-primary-foreground border border-secondary-foreground hover:border-primary-foreground"
          >
            <BookCheck></BookCheck>
          </Button>
          <p className="absolute text-sm font-semibold w-40 text-center top-24">
            {label}
          </p>
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
