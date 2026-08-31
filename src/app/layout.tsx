
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import AuthProvider from "./context/AuthProvider";
import { Toaster } from "sonner";
import { Suspense } from "react";
import { LanguageProvider } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neuro-Hire",
  description: "AI interview readiness toolkit for NCS jobseekers: voice-based mock interviews, resume-to-job fit scoring, and soft skills feedback.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense>
        <AuthProvider>
          <ThemeProvider
            attribute="data-theme"
            defaultTheme="system"
            enableSystem
          >
            <LanguageProvider>
              <Toaster />
              {children}
            </LanguageProvider>
          </ThemeProvider>
        </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
