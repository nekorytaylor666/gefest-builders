"use client";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { FaGoogle } from "react-icons/fa";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TypographyH1 from "@/components/ui/typography/h1";
import TypographyH2 from "@/components/ui/typography/h2";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/lib/hooks/useUserSession";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { data, isLoading, supabase } = useUser();
  if (!isLoading && data?.user?.id) {
    router.push("/");
  }
  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
  };

  const handleSignInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/api/auth/callback`,
      },
    });
    router.refresh();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="min-h-screen flex flex-col h-screen">
      <Navbar></Navbar>
      <div className="container mx-auto flex justify-center items-center  h-full">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>
              <TypographyH2>Войти</TypographyH2>
            </CardTitle>
            <CardDescription>Вход на платформу Gefest</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div>
                <Button className="w-full" onClick={handleSignIn}>
                  Войти
                </Button>
                <Separator className="my-4"></Separator>
                <Button className="w-full" onClick={handleSignInWithGoogle}>
                  <FaGoogle className="text-white mr-2"></FaGoogle> Войти через
                  гугл
                </Button>{" "}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
