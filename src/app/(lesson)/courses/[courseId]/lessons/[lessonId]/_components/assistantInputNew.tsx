import * as React from "react";

import { cn } from "@/lib/utils";
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const AssistantInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <textarea
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md   bg-transparent px-3 py-1 text-sm  transition-colors    focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        //@ts-ignore
        ref={ref}
        {...props}
      />
    );
  }
);
AssistantInput.displayName = "AssistantInput";

export { AssistantInput };
