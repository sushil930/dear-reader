
import { Button } from "@/components/ui/button";
import { Feather } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Floating feather */}
      <div className="absolute top-20 right-20 opacity-20 animate-gentle-float">
        <Feather size={40} className="text-muted-brown" />
      </div>
      
      {/* Decorative ink blots */}
      <div className="ink-blot absolute top-32 left-32 opacity-30"></div>
      <div className="ink-blot absolute bottom-40 right-40 opacity-20"></div>
      
      <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
        <div className="space-y-6">
          <h1 className="text-6xl md:text-8xl font-garamond font-medium text-ink-blue leading-tight drop-cap-alt">
            Dear Reader,
          </h1>
          <p className="text-2xl md:text-3xl font-garamond italic text-muted-brown max-w-2xl mx-auto leading-relaxed handwritten">
            A diary of thoughts we all have, but rarely write down.
          </p>
        </div>
        
        <div className="ornamental-divider my-8"></div>
        
        <div className="space-y-8">
          <p className="text-xl font-garamond text-soft-gray max-w-3xl mx-auto leading-relaxed">
            Welcome to a quiet corner of the internet where psychology meets introspection, 
            where overthinking finds its voice, and where the unspoken thoughts of gentle souls 
            are given space to breathe.
          </p>
          
          <Button 
            size="lg" 
            className="vintage-button text-cream font-inter font-medium px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Read the Diary
          </Button>
        </div>
      </div>
      
      {/* Enhanced decorative elements */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-muted-brown to-transparent opacity-40"></div>
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-muted-brown opacity-30 text-sm font-garamond italic">
        ❦ ❦ ❦
      </div>
    </section>
  );
};

export default Hero;
