import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { useCallback } from "react";

interface CourseMilestoneNodeButtonProps {
  onClick: () => void;
  label: string;
}

function CourseMilestoneNodeButton({
  onClick,
  label,
}: CourseMilestoneNodeButtonProps) {
  const { RiveComponent, rive } = useRive({
    src: "/milestone.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
    shouldDisableRiveListeners: true,
  });

  // Get the state machine inputs for hover and pressed
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
    <div
      className="flex flex-col justify-center items-center "
      onClick={() =>
        setTimeout(() => {
          onClick();
        }, 500)
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <RiveComponent className="h-24 w-24" />
      <p className="w-24 text-center flex justify-center font-bold">{label}</p>
    </div>
  );
}

export default CourseMilestoneNodeButton;
