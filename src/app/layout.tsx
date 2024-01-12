import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "./_trpc/Provider";
import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { PHProvider, PostHogPageview } from "../providers/posthog";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <title>Gefest Builders</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <Provider>
        <PHProvider>
          <Suspense>
            <PostHogPageview />
          </Suspense>
          <body className={inter.className}>
            {children}
            <Toaster />
          </body>
        </PHProvider>
      </Provider>
    </html>
  );
}
