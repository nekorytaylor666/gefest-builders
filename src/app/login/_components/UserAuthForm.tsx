"use client";

import * as React from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { InitialScreen } from "./InitialScreen";
import { VerifyOTPScreen } from "./VerifyOTPScreen";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState("");
  const [emailSent, setEmailSent] = React.useState<boolean>(false); // New state variable to track if email has been sent
  const [timeoutRemaining, setTimeoutRemaining] = React.useState(0); // New state for timeout

  const router = useRouter();

  const sendOTP = async () => {
    setIsLoading(true);
    await supabase.auth.signInWithOtp({
      email,
      options: {
        data: {
          email,
        },
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    });
    toast.info(
      "Мы отправили код на почту " + email + ". Откройте ссылку, чтобы войти"
    );
    setIsLoading(false);
    setEmailSent(true); // Set emailSent to true after sending the email
    setTimeoutRemaining(60); // Start the timeout for 60 seconds after sending the OTP
  };

  const verifyOTP = async (value: string) => {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: value,
      type: "email",
    });
    if (error) {
      console.error(error);
      toast.error("Неправильный код");
      setIsLoading(false);
      return;
    }
    if (data) {
      setIsLoading(false);
      router.push("/courses");
      console.log(data);
      return;
    }
  };
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timeoutRemaining > 0) {
      interval = setInterval(() => {
        setTimeoutRemaining((current) => current - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timeoutRemaining]);

  return (
    <>
      {emailSent ? (
        <VerifyOTPScreen verifyOTP={verifyOTP} setEmailSent={setEmailSent} />
      ) : (
        <InitialScreen
          setIsLoading={setIsLoading}
          email={email}
          setEmail={setEmail}
          isLoading={isLoading}
          sendOTP={sendOTP}
          timeoutRemaining={timeoutRemaining} // Pass the timeoutRemaining state to InitialScreen
        />
      )}
    </>
  );
}
