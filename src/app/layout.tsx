import type { Metadata } from "next";
import {Geist_Mono} from "next/font/google";
import "./globals.css";
import {Toaster} from "sonner";
import React from "react";
import Footer from "@/components/Footer";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Estrafe: Your train",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&display=swap" rel="stylesheet"/>
    </head>
    <body
        className={`font-lexendDeca ${geistMono.variable} antialiased`}
    >
      <main>
        {children}
      </main>
      <Toaster />
      <Footer />
    </body>
    </html>
  );
}
