
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
    <section className="min-h-screen bg-cream relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="ink-blot absolute top-16 left-20 opacity-15 w-8 h-8"></div>
      <div className="ink-blot absolute top-40 right-24 opacity-10 w-6 h-6"></div>
      <div className="ink-blot absolute bottom-32 left-16 opacity-20 w-5 h-5"></div>
      
      {/* Vintage corner decorations */}
      <div className="absolute top-8 left-8 w-24 h-24 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M20,20 Q50,10 80,20 Q90,50 80,80 Q50,90 20,80 Q10,50 20,20 Z" 
                fill="none" stroke="#8B7355" strokeWidth="1.5"/>
        </svg>
      </div>
      
      <div className="absolute bottom-8 right-8 w-24 h-24 opacity-10 rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M20,20 Q50,10 80,20 Q90,50 80,80 Q50,90 20,80 Q10,50 20,20 Z" 
                fill="none" stroke="#8B7355" strokeWidth="1.5"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <ProfileHeader />
        
        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex w-full bg-cream/50 border-2 border-muted-brown/20 rounded-xl py-6 mb-8 overflow-hidden">
              <TabsTrigger 
                value="dashboard" 
                className="font-garamond text-lg data-[state=active]:bg-ink-blue data-[state=active]:text-cream rounded-xl transition-all duration-300 py-2 px-2 flex-1 items-center justify-center"
              >
                Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="entries" 
                className="font-garamond text-lg data-[state=active]:bg-ink-blue data-[state=active]:text-cream rounded-xl transition-all duration-300 py-2 px-2 flex-1 items-center justify-center"
              >
                My Entries
              </TabsTrigger>
              <TabsTrigger 
                value="write" 
                className="font-garamond text-lg data-[state=active]:bg-ink-blue data-[state=active]:text-cream rounded-xl transition-all duration-300 py-2 px-2 flex-1 items-center justify-center"
              >
                Write New
              </TabsTrigger>
              <TabsTrigger 
                value="drafts" 
                className="font-garamond text-lg data-[state=active]:bg-ink-blue data-[state=active]:text-cream rounded-xl transition-all duration-300 py-2 px-2 flex-1 items-center justify-center"
              >
                Drafts
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="font-garamond text-lg data-[state=active]:bg-ink-blue data-[state=active]:text-cream rounded-xl transition-all duration-300 py-2 px-2 flex-1 items-center justify-center"
              >
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-8 transition-all duration-300 data-[state=inactive]:hidden data-[state=active]:block">
              <StatsCards />
            </TabsContent>

            <TabsContent value="entries" className="transition-all duration-300 data-[state=inactive]:hidden data-[state=active]:block">
              <EntryManager />
            </TabsContent>

            <TabsContent value="write" className="transition-all duration-300 data-[state=inactive]:hidden data-[state=active]:block">
              <WriteEditor />
            </TabsContent>

            <TabsContent value="drafts" className="transition-all duration-300 data-[state=inactive]:hidden data-[state=active]:block">
              <DraftManager />
            </TabsContent>

            <TabsContent value="settings" className="transition-all duration-300 data-[state=inactive]:hidden data-[state=active]:block">
              <ProfileSettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Profile;
