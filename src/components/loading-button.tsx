"use client";

import * as React from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

import { cn, composeEventHandlers } from "@/lib/utils";
import {
  Button,
  buttonVariants,
  type ButtonProps,
} from "@/components/ui/button";

interface LoadingButtonProps extends ButtonProps {
  action: "create" | "update" | "delete";
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ children, className, variant, size, action, ...props }, ref) => {
    const [buttonAction, setButtonAction] = React.useState<
      "update" | "delete" | "create"
    >("create");

    return (
      <Button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        onClick={composeEventHandlers(props.onClick, () => {
          if (!props.disabled) {
            setButtonAction(action);
          }
        })}
      >
        {buttonAction === action && (
          <ReloadIcon className="mr-2 size-4 animate-spin" aria-hidden="true" />
        )}

        {children}
      </Button>
    );
  }
);
LoadingButton.displayName = "LoadingButton";

export { LoadingButton };
