
const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-ink-blue/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
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
