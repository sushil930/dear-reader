
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4 py-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="ink-blot absolute top-12 left-8 sm:left-16 opacity-25 w-3 h-3 sm:w-4 sm:h-4"></div>
      <div className="ink-blot absolute top-32 right-8 sm:right-20 opacity-20 w-2 h-2 sm:w-3 sm:h-3"></div>
      <div className="ink-blot absolute bottom-24 left-12 sm:left-24 opacity-15 w-4 h-4 sm:w-5 sm:h-5"></div>
      
      {/* Vintage corner flourishes - hidden on very small screens */}
      <div className="hidden sm:block absolute top-8 left-8 w-12 h-12 sm:w-16 sm:h-16 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M10,10 Q50,30 90,10 Q70,50 90,90 Q50,70 10,90 Q30,50 10,10 Z" 
                fill="none" stroke="#8B7355" strokeWidth="2"/>
        </svg>
      </div>
      <div className="hidden sm:block absolute bottom-8 right-8 w-12 h-12 sm:w-16 sm:h-16 opacity-10 rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M10,10 Q50,30 90,10 Q70,50 90,90 Q50,70 10,90 Q30,50 10,10 Z" 
                fill="none" stroke="#8B7355" strokeWidth="2"/>
        </svg>
      </div>

      <div className="vintage-card w-full max-w-md mx-auto p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl paper-texture relative overflow-hidden border-2 border-muted-brown/20">
        
        {/* Decorative header ornament */}
        <div className="absolute top-3 sm:top-4 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-4 sm:h-6 opacity-20">
          <svg viewBox="0 0 120 30" className="w-full h-full">
            <path d="M10,15 Q30,5 60,15 Q90,25 110,15" 
                  fill="none" stroke="#8B7355" strokeWidth="1.5"/>
            <circle cx="60" cy="15" r="3" fill="#8B7355"/>
            <circle cx="35" cy="12" r="1.5" fill="#8B7355"/>
            <circle cx="85" cy="18" r="1.5" fill="#8B7355"/>
          </svg>
        </div>

        <div className="mt-6 sm:mt-8 text-center space-y-6 sm:space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <BookOpen size={48} className="text-muted-brown sm:w-16 sm:h-16" />
          </div>
          
          {/* Main heading */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-garamond font-medium text-ink-blue">
              404
            </h1>
            <div className="ornamental-divider"></div>
          </div>
          
          {/* Message */}
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-garamond font-medium text-ink-blue">
              Page Not Found
            </h2>
            <p className="text-base sm:text-lg font-garamond italic text-muted-brown leading-relaxed px-2">
              "The page you're looking for seems to have wandered off into the margins..."
            </p>
          </div>
          
          {/* Call to action */}
          <div className="pt-4 sm:pt-6">
            <Button 
              onClick={() => window.location.href = '/'}
              className="vintage-button text-cream font-garamond text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden w-full sm:w-auto"
            >
              <Home className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="relative z-10">Return Home</span>
            </Button>
          </div>
          
          <p className="text-xs sm:text-sm text-muted-brown/70 font-garamond italic px-4">
            "Every journey has its detours"
          </p>
        </div>

        {/* Decorative footer ornament */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 w-12 sm:w-16 h-3 sm:h-4 opacity-15">
          <svg viewBox="0 0 80 20" className="w-full h-full">
            <path d="M5,10 Q20,5 40,10 Q60,15 75,10" 
                  fill="none" stroke="#8B7355" strokeWidth="1"/>
            <circle cx="40" cy="10" r="2" fill="#8B7355"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
