
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileHeader from '@/components/profile/ProfileHeader';
import StatsCards from '@/components/profile/StatsCards';
import EntryManager from '@/components/profile/EntryManager';
import WriteEditor from '@/components/profile/WriteEditor';
import DraftManager from '@/components/profile/DraftManager';
import ProfileSettings from '@/components/profile/ProfileSettings';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

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
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Navigation Tabs - Mobile Responsive */}
            <div className="mb-6 sm:mb-8">
              <TabsList className="grid grid-cols-2 sm:grid-cols-5 w-full bg-cream/50 border-2 border-muted-brown/20 rounded-xl p-2 gap-1 sm:gap-2">
                <TabsTrigger 
                  value="dashboard" 
                  className="font-garamond text-xs sm:text-base lg:text-lg data-[state=active]:bg-ink-blue data-[state=active]:text-cream rounded-xl transition-all duration-300 py-2 px-2 text-center min-h-[44px] flex items-center justify-center"
                >
                  Dashboard
                </TabsTrigger>
                <TabsTrigger 
                  value="entries" 
                  className="font-garamond text-xs sm:text-base lg:text-lg data-[state=active]:bg-ink-blue data-[state=active]:text-cream rounded-xl transition-all duration-300 py-2 px-2 text-center min-h-[44px] flex items-center justify-center"
                >
                  My Entries
                </TabsTrigger>
                <TabsTrigger 
                  value="write" 
                  className="font-garamond text-xs sm:text-base lg:text-lg data-[state=active]:bg-ink-blue data-[state=active]:text-cream rounded-xl transition-all duration-300 py-2 px-2 text-center min-h-[44px] flex items-center justify-center"
                >
                  Write New
                </TabsTrigger>
                <TabsTrigger 
                  value="drafts" 
                  className="font-garamond text-xs sm:text-base lg:text-lg data-[state=active]:bg-ink-blue data-[state=active]:text-cream rounded-xl transition-all duration-300 py-2 px-2 text-center min-h-[44px] flex items-center justify-center"
                >
                  Drafts
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="font-garamond text-xs sm:text-base lg:text-lg data-[state=active]:bg-ink-blue data-[state=active]:text-cream rounded-xl transition-all duration-300 py-2 px-2 text-center min-h-[44px] flex items-center justify-center col-span-2 sm:col-span-1"
                >
                  Settings
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab Content Areas */}
            <div className="w-full">
              <TabsContent 
                value="dashboard" 
                className="space-y-6 sm:space-y-8 transition-all duration-300 data-[state=inactive]:hidden data-[state=active]:block"
              >
                <StatsCards />
              </TabsContent>

              <TabsContent 
                value="entries" 
                className="transition-all duration-300 data-[state=inactive]:hidden data-[state=active]:block"
              >
                <EntryManager />
              </TabsContent>

              <TabsContent 
                value="write" 
                className="transition-all duration-300 data-[state=inactive]:hidden data-[state=active]:block"
              >
                <WriteEditor />
              </TabsContent>

              <TabsContent 
                value="drafts" 
                className="transition-all duration-300 data-[state=inactive]:hidden data-[state=active]:block"
              >
                <DraftManager />
              </TabsContent>

              <TabsContent 
                value="settings" 
                className="transition-all duration-300 data-[state=inactive]:hidden data-[state=active]:block"
              >
                <ProfileSettings />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
