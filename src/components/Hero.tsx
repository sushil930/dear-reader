
import { Button } from "@/components/ui/button";
import { Feather } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Floating feather */}
      <div className="absolute top-20 right-20 opacity-20 animate-gentle-float">
        <Feather size={40} className="text-muted-brown" />
      </div>
      
      <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-garamond font-medium text-ink-blue leading-tight">
            Dear Reader,
          </h1>
          <p className="text-xl md:text-2xl font-garamond italic text-muted-brown max-w-2xl mx-auto leading-relaxed">
            A diary of thoughts we all have, but rarely write down.
          </p>
        </div>
        
        <div className="space-y-6">
          <p className="text-lg font-garamond text-soft-gray max-w-3xl mx-auto leading-relaxed">
            Welcome to a quiet corner of the internet where psychology meets introspection, 
            where overthinking finds its voice, and where the unspoken thoughts of gentle souls 
            are given space to breathe.
          </p>
          
          <Button 
            size="lg" 
            className="bg-forest-green hover:bg-forest-green/90 text-cream font-inter font-medium px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
          >
            Read the Diary
          </Button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-muted-brown to-transparent opacity-30"></div>
    </section>
  );
};

export default Hero;
