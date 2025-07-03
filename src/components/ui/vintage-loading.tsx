
import React from 'react';

interface VintageLoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const VintageLoading: React.FC<VintageLoadingProps> = ({ 
  message = "Loading your thoughts...", 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const containerSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-12">
      {/* Vintage Ink Blot Animation */}
      <div className="relative">
        <div className={`${sizeClasses[size]} relative`}>
          {/* Main ink blot */}
          <div className="absolute inset-0 bg-ink-blue rounded-full opacity-60 animate-pulse"></div>
          
          {/* Animated ink drops */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div className="w-2 h-2 bg-ink-blue rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          </div>
          <div className="absolute top-1 right-0 transform translate-x-1 -translate-y-1">
            <div className="w-1.5 h-1.5 bg-muted-brown rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <div className="absolute bottom-0 left-0 transform -translate-x-1 translate-y-1">
            <div className="w-1 h-1 bg-forest-green rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
          
          {/* Quill pen animation */}
          <div className="absolute -top-8 -right-8 w-8 h-8 opacity-40">
            <svg 
              className="w-full h-full text-muted-brown animate-gentle-float" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
          </div>
        </div>
        
        {/* Decorative circles */}
        <div className="absolute -inset-4">
          <div className="absolute top-0 left-0 w-1 h-1 bg-soft-gray rounded-full animate-ping" style={{ animationDelay: '0.1s' }}></div>
          <div className="absolute top-2 right-0 w-0.5 h-0.5 bg-muted-brown rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
          <div className="absolute bottom-0 left-2 w-0.5 h-0.5 bg-forest-green rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>

      {/* Loading message with typewriter effect */}
      <div className={`font-garamond text-ink-blue ${containerSizes[size]} italic text-center max-w-md`}>
        <div className="relative">
          <span className="inline-block animate-pulse">{message}</span>
          <span className="inline-block w-0.5 h-5 bg-ink-blue ml-1 animate-pulse"></span>
        </div>
      </div>

      {/* Decorative divider */}
      <div className="w-24 h-px bg-gradient-to-r from-transparent via-muted-brown to-transparent opacity-50"></div>
      
      {/* Floating paper elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-sepia opacity-20 rounded-sm animate-gentle-float" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-cream opacity-30 rounded-sm animate-gentle-float" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-soft-gray opacity-25 rounded-sm animate-gentle-float" style={{ animationDelay: '0.5s', animationDuration: '6s' }}></div>
      </div>
    </div>
  );
};

export default VintageLoading;
