import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { useCallback } from "react";

function CourseMilestoneNodeButton() {
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
  }, [hoverInput]);

  const handleMouseLeave = useCallback(() => {
    if (rive && hoverInput) {
      hoverInput.value = false;
    }
  }, [hoverInput]);

  const handleMouseDown = useCallback(() => {
    if (rive && pressedInput) {
      pressedInput.value = true;
    }
  }, [pressedInput]);

  const handleMouseUp = useCallback(() => {
    if (rive && pressedInput) {
      pressedInput.value = false;
    }
  }, [pressedInput]);

  const handleTouchStart = useCallback(() => {
    if (rive && pressedInput) {
      pressedInput.value = true;
    }
  }, [pressedInput]);

  const handleTouchEnd = useCallback(() => {
    if (rive && pressedInput) {
      pressedInput.value = false;
    }
  }, [pressedInput]);

  return (
    <div
      className="flex flex-col justify-center items-center "
      onClick={() =>
        setTimeout(() => {
          alert("Переменные");
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
      <p className="w-24 text-center flex justify-center">Переменные</p>
    </div>
  );
}

export default CourseMilestoneNodeButton;
