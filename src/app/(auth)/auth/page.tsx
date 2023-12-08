"use client";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const supabase = createClient(
  "https://uepcmodmqkhfcsbxctjb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlcGNtb2RtcWtoZmNzYnhjdGpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIwMDc1OTksImV4cCI6MjAxNzU4MzU5OX0._RcYxqzj_BxZ39w2jcSvelP9fRRdcmuWMOX78FVtDUY"
);

const App = () => (
  <div className="container">
    <Card>
      <CardHeader>
        <CardTitle>Войти</CardTitle>
        <CardDescription>Вход на платформу Gefest</CardDescription>
      </CardHeader>
      <CardContent>
        <Auth
          supabaseClient={supabase}
          redirectTo="/api/auth/callback"
          appearance={{ theme: ThemeSupa }}
          providers={["google"]}
          localization={{
            variables: {
              sign_in: {
                email_label: "Адрес электронной почты",
                password_label: "Создайте пароль",
                email_input_placeholder: "Ваш адрес электронной почты",
                password_input_placeholder: "Ваш пароль",
                button_label: "Зарегистрироваться",
                loading_button_label: "Регистрация...",
                social_provider_text: "Войти с помощью {{provider}}",
                link_text: "Нет аккаунта? Зарегистрируйтесь",
              },
            },
          }}
        />
      </CardContent>
    </Card>
  </div>
);

export default App;
