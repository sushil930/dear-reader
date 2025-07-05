

import { Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 sm:py-12 px-4 sm:px-6 bg-ink-blue/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col space-y-8 sm:space-y-6 md:flex-row md:justify-between md:items-center md:space-y-0">
          
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:justify-start">
            <a href="#" className="text-muted-brown hover:text-forest-green transition-colors font-inter text-sm sm:text-base min-h-[44px] flex items-center">
              Home
            </a>
            <a href="#" className="text-muted-brown hover:text-forest-green transition-colors font-inter text-sm sm:text-base min-h-[44px] flex items-center">
              Diary
            </a>
            <a href="#" className="text-muted-brown hover:text-forest-green transition-colors font-inter text-sm sm:text-base min-h-[44px] flex items-center">
              About
            </a>
            <a href="#" className="text-muted-brown hover:text-forest-green transition-colors font-inter text-sm sm:text-base min-h-[44px] flex items-center">
              Contact
            </a>
          </div>
          
          {/* Social Media Icons */}
          <div className="flex justify-center items-center gap-4 sm:gap-6 order-first md:order-none">
            <a 
              href="https://github.com/sushil930/dear-reader.git" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-brown hover:text-forest-green transition-all duration-300 hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="GitHub"
            >
              <Github size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-brown hover:text-forest-green transition-all duration-300 hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a 
              href="https://vercel.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-brown hover:text-forest-green transition-all duration-300 hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Vercel"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="sm:w-6 sm:h-6">
                <path d="M12 2L2 19.777h20L12 2z"/>
              </svg>
            </a>
            <a 
              href="https://railway.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-brown hover:text-forest-green transition-all duration-300 hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Railway"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="sm:w-6 sm:h-6">
                <path d="M13.5 2C18.194 2 22 5.806 22 10.5S18.194 19 13.5 19c-2.832 0-5.389-1.387-6.977-3.695L5.5 19l-1.05-1.05L10.195 8.205C11.613 6.387 12.5 4.542 12.5 2.5h1z"/>
              </svg>
            </a>
            <a 
              href="https://reflections-dairy.lovable.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-brown hover:text-forest-green transition-all duration-300 hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Lovable"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="sm:w-6 sm:h-6">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </a>
          </div>
          
          {/* Copyright */}
          <div className="text-soft-gray font-inter text-xs sm:text-sm text-center md:text-left order-last">
            © 2025 Dear Reader — A digital diary for gentle souls
          </div>
        </div>
        
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-muted-brown/20 text-center">
          <p className="text-xs sm:text-sm font-garamond italic text-muted-brown px-4">
            "For thoughts that need a home"
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

