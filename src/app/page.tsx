"use client";

import Link from "next/link";
import { AnimatedTestimonialsDemo } from "@/components/cards";
import Footer from "@/components/footer";
import { NavbarDemo } from "@/components/navbar";
import { CardSpotlightDemo } from "@/components/price";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300">
      <div className="h-full relative overflow-hidden">
        <main className="relative z-10">
          {/* Navbar */}
          <NavbarDemo  />

          {/* Main content area */}
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] py-8 px-4 sm:px-6 lg:px-8 relative">
            {/* Background beams behind content */}
            <BackgroundBeams className="absolute inset-0 -z-0" />

            {/* Foreground content */}
            <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center z-10 gap-12">
              <AnimatedTestimonialsDemo  />
              <Link href="/sign-in">
                <Button size="lg" className="bg-gradient-to-r from-[var(--saffron)] to-[var(--india-green)] text-white hover:opacity-90">
                  Start Practicing Free
                </Button>
              </Link>
            </div>
          </div>

          {/* Pricing Section */}
          <CardSpotlightDemo />

          {/* Footer */}
          <Footer  />
        </main>
      </div>
    </div>
  );
}
