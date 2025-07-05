
import React from 'react';
import ProfileHeader from '@/components/profile/ProfileHeader';

interface WritePageLayoutProps {
  children: React.ReactNode;
}

const WritePageLayout: React.FC<WritePageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-cream relative overflow-hidden">
      {/* Decorative background elements - responsive positioning */}
      <div className="ink-blot absolute top-12 sm:top-16 left-12 sm:left-20 opacity-15 w-6 h-6 sm:w-8 sm:h-8"></div>
      <div className="ink-blot absolute top-32 sm:top-40 right-16 sm:right-24 opacity-10 w-4 h-4 sm:w-6 sm:h-6"></div>
      <div className="ink-blot absolute bottom-24 sm:bottom-32 left-10 sm:left-16 opacity-20 w-4 h-4 sm:w-5 sm:h-5"></div>
      
      {/* Vintage corner decorations - hidden on very small screens */}
      <div className="hidden sm:block absolute top-8 left-8 w-16 h-16 sm:w-24 sm:h-24 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M20,20 Q50,10 80,20 Q90,50 80,80 Q50,90 20,80 Q10,50 20,20 Z" 
                fill="none" stroke="#8B7355" strokeWidth="1.5"/>
        </svg>
      </div>
      
      <div className="hidden sm:block absolute bottom-8 right-8 w-16 h-16 sm:w-24 sm:h-24 opacity-10 rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M20,20 Q50,10 80,20 Q90,50 80,80 Q50,90 20,80 Q10,50 20,20 Z" 
                fill="none" stroke="#8B7355" strokeWidth="1.5"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        {/* Profile Header Section */}
        <div className="mb-6 sm:mb-8">
          <ProfileHeader />
        </div>
        
        {/* Main Content Area */}
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default WritePageLayout;
