
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
    <div className="vintage-card p-8 rounded-2xl shadow-xl border-2 border-muted-brown/20 backdrop-blur-sm relative">
      {/* Decorative header ornament */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-8 opacity-15">
        <svg viewBox="0 0 160 40" className="w-full h-full">
          <path d="M20,20 Q50,5 80,20 Q110,35 140,20" 
                fill="none" stroke="#8B7355" strokeWidth="2"/>
          <circle cx="80" cy="20" r="4" fill="#8B7355"/>
        </svg>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mt-6">
        {/* Avatar Section */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-muted-brown/30 p-1 bg-cream">
            <Avatar className="w-full h-full">
              <AvatarImage src="/placeholder.svg" alt="Profile" />
              <AvatarFallback className="text-2xl font-garamond text-ink-blue bg-cream">SM</AvatarFallback>
            </Avatar>
          </div>
          <Button
            size="sm"
            className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 bg-ink-blue hover:bg-forest-green"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center md:text-left">
          {isEditing ? (
            <div className="space-y-4">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-2xl font-garamond font-bold bg-cream/70 border-2 border-muted-brown/30"
              />
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3 rounded-lg bg-cream/70 border-2 border-muted-brown/30 font-garamond text-muted-brown resize-none"
                rows={3}
              />
              <div className="flex gap-3">
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
            <div className="space-y-4">
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <h1 className="text-4xl font-garamond font-bold text-ink-blue">{name}</h1>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                  className="text-muted-brown hover:text-ink-blue"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
              </div>
              
              <p className="text-lg font-garamond italic text-muted-brown leading-relaxed max-w-2xl">
                {bio}
              </p>

              <div className="flex flex-wrap items-center gap-6 justify-center md:justify-start text-muted-brown">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span className="font-garamond">Member since March 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-garamond">127 day writing streak</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-muted-brown/20">
        <div className="text-center">
          <div className="text-3xl font-garamond font-bold text-ink-blue">247</div>
          <div className="text-sm font-garamond text-muted-brown">Total Entries</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-garamond font-bold text-ink-blue">12.5K</div>
          <div className="text-sm font-garamond text-muted-brown">Total Views</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-garamond font-bold text-ink-blue">1.8K</div>
          <div className="text-sm font-garamond text-muted-brown">Engagements</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-garamond font-bold text-ink-blue">234</div>
          <div className="text-sm font-garamond text-muted-brown">Comments</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
