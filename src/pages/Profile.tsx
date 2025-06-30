
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
      {/* Decorative background elements - hidden on mobile */}
      <div className="ink-blot absolute top-16 left-20 opacity-15 w-8 h-8 hidden lg:block"></div>
      <div className="ink-blot absolute top-40 right-24 opacity-10 w-6 h-6 hidden lg:block"></div>
      <div className="ink-blot absolute bottom-32 left-16 opacity-20 w-5 h-5 hidden lg:block"></div>
      
      {/* Vintage corner decorations - hidden on mobile */}
      <div className="absolute top-8 left-8 w-24 h-24 opacity-10 hidden lg:block">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M20,20 Q50,10 80,20 Q90,50 80,80 Q50,90 20,80 Q10,50 20,20 Z" 
                fill="none" stroke="#8B7355" strokeWidth="1.5"/>
        </svg>
      </div>
      
      <div className="absolute bottom-8 right-8 w-24 h-24 opacity-10 rotate-180 hidden lg:block">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M20,20 Q50,10 80,20 Q90,50 80,80 Q50,90 20,80 Q10,50 20,20 Z" 
                fill="none" stroke="#8B7355" strokeWidth="1.5"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-6 lg:py-8 max-w-7xl">
        <ProfileHeader />
        
        <div className="mt-6 lg:mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Mobile-friendly tabs */}
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 bg-cream/50 border-2 border-muted-brown/20 rounded-xl p-1 lg:p-2 mb-6 lg:mb-8 gap-1">
              <TabsTrigger 
                value="dashboard" 
                className="font-garamond text-sm lg:text-lg data-[state=active]:bg-ink-blue data-[state=active]:text-cream rounded-lg transition-all duration-300 py-2"
              >
                Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="entries" 
                className="font-garamond text-sm lg:text-lg data-[state=active]:bg-ink-blue data-[state=active]:text-cream rounded-lg transition-all duration-300 py-2"
              >
                Entries
              </TabsTrigger>
              <TabsTrigger 
                value="write" 
                className="font-garamond text-sm lg:text-lg data-[state=active]:bg-ink-blue data-[state=active]:text-cream rounded-lg transition-all duration-300 py-2 col-span-2 sm:col-span-1"
              >
                Write
              </TabsTrigger>
              <TabsTrigger 
                value="drafts" 
                className="font-garamond text-sm lg:text-lg data-[state=active]:bg-ink-blue data-[state=active]:text-cream rounded-lg transition-all duration-300 py-2 hidden sm:block lg:block"
              >
                Drafts
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="font-garamond text-sm lg:text-lg data-[state=active]:bg-ink-blue data-[state=active]:text-cream rounded-lg transition-all duration-300 py-2 hidden lg:block"
              >
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Mobile dropdown for hidden tabs */}
            <div className="sm:hidden lg:hidden mb-4">
              {(activeTab === 'drafts' || activeTab === 'settings') && (
                <div className="flex gap-2">
                  <TabsTrigger 
                    value="drafts" 
                    className="font-garamond text-sm data-[state=active]:bg-ink-blue data-[state=active]:text-cream rounded-lg transition-all duration-300 py-2 px-4 bg-cream/50 border border-muted-brown/20"
                  >
                    Drafts
                  </TabsTrigger>
                  <TabsTrigger 
                    value="settings" 
                    className="font-garamond text-sm data-[state=active]:bg-ink-blue data-[state=active]:text-cream rounded-lg transition-all duration-300 py-2 px-4 bg-cream/50 border border-muted-brown/20"
                  >
                    Settings
                  </TabsTrigger>
                </div>
              )}
            </div>

            <TabsContent value="dashboard" className="space-y-6 lg:space-y-8">
              <StatsCards />
            </TabsContent>

            <TabsContent value="entries">
              <EntryManager />
            </TabsContent>

            <TabsContent value="write">
              <WriteEditor />
            </TabsContent>

            <TabsContent value="drafts">
              <DraftManager />
            </TabsContent>

            <TabsContent value="settings">
              <ProfileSettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Profile;
