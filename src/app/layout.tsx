import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Provider from "./_trpc/Provider";
import "swiper/css";
import Navbar from "@/components/navbar";
//@ts-ignore
import riveWASMResource from "node_modules/@rive-app/canvas/rive.wasm";
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
    <html lang="en">
      <head>
        <link
          rel="preload"
          href={riveWASMResource}
          as="fetch"
          crossOrigin="anonymous"
        />
      </head>
      <UserProvider>
        <Provider>
          <body className={inter.className}>
            <div className="pt-8">{children}</div>
          </body>
        </Provider>
      </UserProvider>
    </html>
  );
}
