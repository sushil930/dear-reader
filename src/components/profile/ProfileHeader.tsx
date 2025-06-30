
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit2, Calendar, BookOpen } from 'lucide-react';

const ProfileHeader = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Sarah Mitchell');
  const [bio, setBio] = useState('Capturing life\'s moments, one page at a time. Writer, dreamer, and keeper of memories.');

  const handleSave = () => {
    setIsEditing(false);
    // Save to backend
  };

  return (
    <div className="vintage-card p-4 lg:p-8 rounded-2xl shadow-xl border-2 border-muted-brown/20 backdrop-blur-sm relative">
      {/* Decorative header ornament - hidden on mobile */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-8 opacity-15 hidden lg:block">
        <svg viewBox="0 0 160 40" className="w-full h-full">
          <path d="M20,20 Q50,5 80,20 Q110,35 140,20" 
                fill="none" stroke="#8B7355" strokeWidth="2"/>
          <circle cx="80" cy="20" r="4" fill="#8B7355"/>
        </svg>
      </div>

      <div className="flex flex-col items-center gap-4 lg:gap-8 mt-2 lg:mt-6">
        {/* Avatar Section */}
        <div className="relative">
          <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-4 border-muted-brown/30 p-1 bg-cream">
            <Avatar className="w-full h-full">
              <AvatarImage src="/placeholder.svg" alt="Profile" />
              <AvatarFallback className="text-xl lg:text-2xl font-garamond text-ink-blue bg-cream">SM</AvatarFallback>
            </Avatar>
          </div>
          <Button
            size="sm"
            className="absolute -bottom-1 -right-1 lg:-bottom-2 lg:-right-2 rounded-full w-8 h-8 lg:w-10 lg:h-10 bg-ink-blue hover:bg-forest-green"
          >
            <Edit2 className="w-3 h-3 lg:w-4 lg:h-4" />
          </Button>
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center w-full">
          {isEditing ? (
            <div className="space-y-4 max-w-lg mx-auto">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-xl lg:text-2xl font-garamond font-bold bg-cream/70 border-2 border-muted-brown/30 text-center"
              />
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3 rounded-lg bg-cream/70 border-2 border-muted-brown/30 font-garamond text-muted-brown resize-none text-center"
                rows={3}
              />
              <div className="flex gap-3 justify-center">
                <Button onClick={handleSave} className="vintage-button text-cream">
                  Save Changes
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(false)}
                  className="border-2 border-muted-brown/30 text-muted-brown hover:bg-muted-brown/10"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 lg:space-y-4">
              <div className="flex items-center gap-2 lg:gap-4 justify-center">
                <h1 className="text-2xl lg:text-4xl font-garamond font-bold text-ink-blue">{name}</h1>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                  className="text-muted-brown hover:text-ink-blue"
                >
                  <Edit2 className="w-3 h-3 lg:w-4 lg:h-4" />
                </Button>
              </div>
              
              <p className="text-base lg:text-lg font-garamond italic text-muted-brown leading-relaxed max-w-2xl mx-auto px-4">
                {bio}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6 justify-center text-muted-brown text-sm lg:text-base">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span className="font-garamond">Member since March 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span className="font-garamond">127 day writing streak</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-muted-brown/20">
        <div className="text-center">
          <div className="text-2xl lg:text-3xl font-garamond font-bold text-ink-blue">247</div>
          <div className="text-xs lg:text-sm font-garamond text-muted-brown">Total Entries</div>
        </div>
        <div className="text-center">
          <div className="text-2xl lg:text-3xl font-garamond font-bold text-ink-blue">12.5K</div>
          <div className="text-xs lg:text-sm font-garamond text-muted-brown">Total Views</div>
        </div>
        <div className="text-center">
          <div className="text-2xl lg:text-3xl font-garamond font-bold text-ink-blue">1.8K</div>
          <div className="text-xs lg:text-sm font-garamond text-muted-brown">Engagements</div>
        </div>
        <div className="text-center">
          <div className="text-2xl lg:text-3xl font-garamond font-bold text-ink-blue">234</div>
          <div className="text-xs lg:text-sm font-garamond text-muted-brown">Comments</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
