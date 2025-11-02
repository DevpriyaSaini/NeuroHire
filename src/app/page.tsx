"use client";

import { AnimatedTestimonialsDemo } from "@/components/cards";
import Footer from "@/components/footer";
import AuthDialog from "@/components/loginpop-up";
import { NavbarDemo } from "@/components/navbar";
import { CardSpotlightDemo } from "@/components/price";
import { BackgroundBeams } from "@/components/ui/background-beams";


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
              <AuthDialog />
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
