import React from "react";
import { GBlock, blocksList } from "./tools";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const ToolboxGrid = ({
  tools = [...Object.values(blocksList)],
  onToolClick,
}: {
  tools?: GBlock[];
  onToolClick: (tool: GBlock) => void;
}) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {tools.map((tool, index) => (
        <div key={index} className="w-full aspect-square">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="w-full" asChild>
                <Button
                  onClick={() => onToolClick(tool)}
                  variant={"ghost"}
                  key={index}
                  className="border shadow h-full w-full grid grid-rows-2 items-center justify-center justify-items-center gap-2"
                >
                  <p>{tool.name}</p>
                  <tool.icon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tool.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ))}
    </div>
  );
};

export default ToolboxGrid;
