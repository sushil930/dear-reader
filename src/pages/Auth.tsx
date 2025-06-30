import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PenQuill from "@/assets/pen-quill.svg?url";

const Auth: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden bg-cream">
      {/* Floating pen quill */}
      <img 
        src={PenQuill} 
        alt="Decorative pen quill" 
        className="absolute bottom-10 right-10 w-32 opacity-70 rotate-12"
      />

      {/* Decorative ink blots */}
      <div className="ink-blot absolute top-8 left-12 opacity-20"></div>
      <div className="ink-blot absolute top-24 right-16 opacity-15"></div>

      <div className="max-w-xl mx-auto text-center space-y-10 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-garamond font-medium text-ink-blue leading-snug">
          Begin Your Reflection
        </h1>
        <p className="text-xl md:text-2xl font-garamond italic text-muted-brown max-w-lg mx-auto">
          Sign in or create an account to start writing your diary.
        </p>

        <div className="ornamental-divider mb-12"></div>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Button
            size="lg"
            className="vintage-button text-cream font-inter px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="font-inter px-10 py-4 rounded-full border-2 border-ink-blue text-ink-blue transition-all duration-300 hover:bg-ink-blue hover:text-cream"
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Auth;
