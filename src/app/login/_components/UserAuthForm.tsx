"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaSpinner } from "react-icons/fa";
import { useUser } from "@/lib/hooks/useUserSession";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useToast } from "@/components/ui/use-toast";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState("");

  const router = useRouter();
  const { toast } = useToast();

  const handleSignInWithGoogle = async () => {
    setIsLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/api/auth/callback`,
      },
    });
    setIsLoading(false);
    router.refresh();
  };

  const sendMagicLink = async ({
    shouldCreateUser,
  }: {
    shouldCreateUser: boolean;
  }) => {
    setIsLoading(true);
    await supabase.auth.signInWithOtp({
      email,
      options: {
        data: {
          email,
        },
        shouldCreateUser,
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    });
    setIsLoading(false);
  };

  const handleMagicLink = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const { data: userExists } = await supabase
      .from("User")
      .select("id")
      .eq("email", email)
      .single();
    await sendMagicLink({ shouldCreateUser: !userExists });
    toast({
      title:
        "Мы отправили ссылку на почту " +
        email +
        ". Откройте ссылку, чтобы войти",
      duration: 60000,
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div>
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
          </div>
          {/* <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Пароль
            </Label>
            <Input
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              disabled={isLoading}
            />
          </div> */}
          <Button onClick={handleMagicLink} disabled={isLoading}>
            {isLoading && <FaSpinner className="mr-2 h-4 w-4 animate-spin" />}
            Войти с Email
          </Button>
        </div>
      </div>
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
        )}{" "}
        Google
      </Button>
    </div>
  );
}
