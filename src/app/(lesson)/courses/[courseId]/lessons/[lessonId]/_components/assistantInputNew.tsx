import * as React from "react";
import { Wand2, Forward } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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
