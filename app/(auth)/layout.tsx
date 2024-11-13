import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Josefin_Sans as JosefinSans } from "next/font/google";
import "../globals.css";
import React from "react";

const josefinSans = JosefinSans({
  subsets: ["latin"],
  variable: "--font-josefin_sans",
});

export const metadata: Metadata = {
  title: "Todo.",
  description: "Generated by create next app",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={cn(
          "relative h-full font-josefin_sans antialiased",
          josefinSans.variable
        )}
      >
        <main className="relative flex min-h-screen flex-col">{children}</main>
      </body>
    </html>
  );
}
