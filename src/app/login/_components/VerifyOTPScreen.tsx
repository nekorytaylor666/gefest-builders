import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const VerifyOTPScreenHeader = ({ onBack }: { onBack: () => void }) => {
  return (
    <div>
      <Button
        size={"sm"}
        className="text-muted-foreground"
        variant={"ghost"}
        onClick={onBack}
      >
        <ArrowLeft></ArrowLeft>
        Назад
      </Button>
      <div className="flex flex-col space-y-2 text-center mt-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          Подтвердить почту
        </h1>
        <p className="text-sm text-muted-foreground">Введите код из письма</p>
      </div>
    </div>
  );
};

export const VerifyOTPScreen = ({
  verifyOTP,
  setEmailSent,
}: {
  setEmailSent: (value: boolean) => void;
  verifyOTP: (value: string) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleVerifyOTP = async (value: string) => {
    try {
      setIsLoading(true);
      await verifyOTP(value);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <div className={cn("grid gap-6")}>
      <VerifyOTPScreenHeader onBack={() => setEmailSent(false)} />

      <div className="grid gap-2">
        <div className="grid gap-1">
          <div className="flex justify-center ">
            <InputOTP
              className={cn({
                "animate-pulse": isLoading,
              })}
              disabled={isLoading}
              onComplete={handleVerifyOTP}
              maxLength={6}
              render={({ slots }) => (
                <>
                  <InputOTPGroup>
                    {slots.slice(0, 3).map((slot, index) => (
                      <InputOTPSlot
                        className="w-12 h-12"
                        key={index}
                        {...slot}
                      />
                    ))}{" "}
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    {slots.slice(3).map((slot, index) => (
                      <InputOTPSlot
                        className="w-12 h-12"
                        key={index}
                        {...slot}
                      />
                    ))}
                  </InputOTPGroup>
                </>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
