"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaSpinner, FaGoogle } from "react-icons/fa";

const InitialScreenHeader = () => {
  return (
    <div className="flex flex-col space-y-2 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Создать аккаунт</h1>
      <p className="text-sm text-muted-foreground">Войдите удобным способом</p>
    </div>
  );
};

const ThirdPartyAuth = ({
  setIsLoading,
  isLoading,
}: {
  setIsLoading: (value: boolean) => void;
  isLoading: boolean;
}) => {
  const router = useRouter();
  const handleSignInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data } = await response.json();
      if (!data?.url) throw new Error("No url returned");
      setIsLoading(false);
      router.push(data.url);

      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Или продолжить с...
          </span>
        </div>
      </div>
      <Button
        onClick={handleSignInWithGoogle}
        variant="outline"
        type="button"
        disabled={isLoading}
      >
        {isLoading ? (
          <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FaGoogle className="mr-2 h-4 w-4" />
        )}
        Google
      </Button>
    </>
  );
};

export const InitialScreen = ({
  email,
  setEmail,
  isLoading,
  sendOTP,
  setIsLoading,
  timeoutRemaining,
}: {
  email: string;
  setEmail: (value: string) => void;
  isLoading: boolean;
  sendOTP: () => void;
  setIsLoading: (value: boolean) => void;
  timeoutRemaining: number;
}) => {
  return (
    <div className={cn("grid gap-6")}>
      <InitialScreenHeader />
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
          />
          <Button
            className="my-2"
            onClick={sendOTP}
            disabled={isLoading || timeoutRemaining > 0}
          >
            {isLoading && <FaSpinner className="mr-2 h-4 w-4 animate-spin" />}
            {timeoutRemaining > 0
              ? `Подождите ${timeoutRemaining} сек.`
              : "Войти с Email"}
          </Button>
        </div>
      </div>
      <ThirdPartyAuth setIsLoading={setIsLoading} isLoading={isLoading} />
    </div>
  );
};
