import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "./_components/UserAuthForm";

export const metadata: Metadata = {
  title: "Аутентификация",
  description: "Формы аутентификации, созданные с использованием компонентов.",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative flex  h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium gap-4">
            <Image width={40} height={40} src="min-logo.svg" alt="" />
            Гефест Академия
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Сокращаем разрыв между воображением и мастерством.&rdquo;
              </p>
              <footer className="text-sm">Команда Гефест</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Создать аккаунт
              </h1>
              <p className="text-sm text-muted-foreground">
                Войдите удобным способом
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Нажимая продолжить, вы соглашаетесь с нашими{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Условиями обслуживания
              </Link>{" "}
              и{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Политикой конфиденциальности
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
