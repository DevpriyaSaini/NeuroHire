import { AnimatedTestimonialsDemo } from "@/components/cards"
import Footer from "@/components/footer"
import AuthDialog from "@/components/loginpop-up"
import { NavbarDemo } from "@/components/navbar"
import { CardSpotlightDemo } from "@/components/price"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision"



export default function Home() {
  return (
     
      <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300">
  <div className="h-full relative overflow-hidden">
    <main className="relative z-10">
      <NavbarDemo className="sticky top-0 z-50 w-full backdrop-blur-sm bg-white/80 dark:bg-gray-950/80 border-b border-gray-200 dark:border-gray-800" />
      
      {/* Main content area with proper spacing and centering */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] py-8 px-4 sm:px-6 lg:px-8 relative">
        {/* Background beams - moved to sit behind content */}
        <BackgroundBeams className="absolute inset-0 -z-0" />
        
        {/* Content container with max-width and z-index to appear above beams */}
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center z-10 gap-12">
          <AnimatedTestimonialsDemo className="w-full" />
          <AuthDialog className="w-full max-w-md" />
        </div>
      </div>
      <CardSpotlightDemo/>
      
      {/* Footer with proper spacing */}
      <Footer className="border-t border-gray-200 dark:border-gray-800" />
    </main>
  </div>
</div>
    
  )
}
