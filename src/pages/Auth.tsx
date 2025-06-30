
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PenQuill from "@/assets/pen-quill.svg?url";

const Auth: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden bg-cream">
      
      {/* Enhanced floating pen quill with animation */}
      <img 
        src={PenQuill} 
        alt="Decorative pen quill" 
        className="absolute bottom-16 right-16 w-40 opacity-60 rotate-12 animate-gentle-float"
      />

      {/* Enhanced decorative ink blots */}
      <div className="ink-blot absolute top-16 left-20 opacity-30 w-6 h-6"></div>
      <div className="ink-blot absolute top-40 right-24 opacity-20 w-4 h-4"></div>
      <div className="ink-blot absolute bottom-32 left-16 opacity-25 w-5 h-5"></div>
      
      {/* Vintage corner decorations */}
      <div className="absolute top-12 left-12 w-20 h-20 opacity-15">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M20,20 Q50,10 80,20 Q90,50 80,80 Q50,90 20,80 Q10,50 20,20 Z M50,50 m-15,0 a15,15 0 1,0 30,0 a15,15 0 1,0 -30,0" 
                fill="none" stroke="#8B7355" strokeWidth="1.5"/>
          <circle cx="50" cy="30" r="2" fill="#8B7355"/>
          <circle cx="70" cy="50" r="2" fill="#8B7355"/>
          <circle cx="50" cy="70" r="2" fill="#8B7355"/>
          <circle cx="30" cy="50" r="2" fill="#8B7355"/>
        </svg>
      </div>
      
      <div className="absolute bottom-12 right-12 w-20 h-20 opacity-15 rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M20,20 Q50,10 80,20 Q90,50 80,80 Q50,90 20,80 Q10,50 20,20 Z M50,50 m-15,0 a15,15 0 1,0 30,0 a15,15 0 1,0 -30,0" 
                fill="none" stroke="#8B7355" strokeWidth="1.5"/>
        </svg>
      </div>

      <div className="max-w-2xl mx-auto text-center space-y-12 animate-fade-in relative">
        
        {/* Decorative header */}
        <div className="relative mb-12">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 w-32 h-8 opacity-20">
            <svg viewBox="0 0 160 40" className="w-full h-full">
              <path d="M20,20 Q50,5 80,20 Q110,35 140,20" 
                    fill="none" stroke="#8B7355" strokeWidth="2"/>
              <circle cx="80" cy="20" r="4" fill="#8B7355"/>
              <path d="M70,15 Q80,10 90,15" fill="none" stroke="#8B7355" strokeWidth="1"/>
              <path d="M70,25 Q80,30 90,25" fill="none" stroke="#8B7355" strokeWidth="1"/>
            </svg>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-garamond font-medium text-ink-blue leading-tight mb-6 drop-cap">
            Begin Your Reflection
          </h1>
          
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-muted-brown/50 to-transparent mx-auto mb-6"></div>
        </div>

        <div className="vintage-card p-10 rounded-2xl shadow-xl border-2 border-muted-brown/20 backdrop-blur-sm">
          <p className="text-2xl md:text-3xl font-garamond italic text-muted-brown leading-relaxed mb-8">
            "In the quiet pages of reflection, we discover the stories that shape our souls. 
            Every thought deserves a home, every moment a memory."
          </p>

          <div className="ornamental-divider mb-10"></div>

          <div className="flex flex-col sm:flex-row justify-center gap-8 mb-8">
            <Button
              size="lg"
              className="vintage-button text-cream font-garamond text-xl px-12 py-5 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden group"
              onClick={() => navigate('/login')}
            >
              <span className="relative z-10">Enter My Diary</span>
              <div className="absolute inset-0 bg-gradient-to-r from-forest-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="font-garamond text-xl px-12 py-5 rounded-full border-3 border-ink-blue text-ink-blue bg-cream/50 transition-all duration-300 hover:bg-ink-blue hover:text-cream hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm"
              onClick={() => navigate('/register')}
            >
              Start New Journal
            </Button>
          </div>
          
          <div className="text-center">
            <p className="text-lg font-garamond italic text-muted-brown/80">
              Your thoughts. Your story. Your sanctuary.
            </p>
          </div>
        </div>

        {/* Decorative footer */}
        <div className="relative mt-16">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 w-24 h-6 opacity-15">
            <svg viewBox="0 0 120 30" className="w-full h-full">
              <path d="M10,15 Q30,5 60,15 Q90,25 110,15" 
                    fill="none" stroke="#8B7355" strokeWidth="1.5"/>
              <circle cx="60" cy="15" r="2" fill="#8B7355"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
