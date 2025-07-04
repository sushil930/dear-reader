
import { Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-ink-blue/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center space-x-6">
            <a href="#" className="text-muted-brown hover:text-forest-green transition-colors font-inter text-sm">
              Home
            </a>
            <a href="#" className="text-muted-brown hover:text-forest-green transition-colors font-inter text-sm">
              Diary
            </a>
            <a href="#" className="text-muted-brown hover:text-forest-green transition-colors font-inter text-sm">
              About
            </a>
            <a href="#" className="text-muted-brown hover:text-forest-green transition-colors font-inter text-sm">
              Contact
            </a>
          </div>
          
          {/* Social Media Icons */}
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-brown hover:text-forest-green transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-brown hover:text-forest-green transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://vercel.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-brown hover:text-forest-green transition-all duration-300 hover:scale-110"
              aria-label="Vercel"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 19.777h20L12 2z"/>
              </svg>
            </a>
            <a 
              href="https://railway.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-brown hover:text-forest-green transition-all duration-300 hover:scale-110"
              aria-label="Railway"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.5 2v8.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2h10.5zM21 13.5v8.5H10.5v-8.5a1 1 0 0 1 1-1H20a1 1 0 0 1 1 1z"/>
              </svg>
            </a>
            <a 
              href="https://lovable.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-brown hover:text-forest-green transition-all duration-300 hover:scale-110"
              aria-label="Lovable"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </a>
          </div>
          
          <div className="text-soft-gray font-inter text-sm">
            © 2025 Dear Reader — A digital diary for gentle souls
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-muted-brown/20 text-center">
          <p className="text-xs font-garamond italic text-muted-brown">
            "For thoughts that need a home"
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
