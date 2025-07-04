import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit2, Calendar, BookOpen, Camera } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const ProfileHeader = () => {
  const { user, updateUser, token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [profileImage, setProfileImage] = useState(user?.profileImage || '');

  // Update name when user data changes (e.g., after login)
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setBio(user.bio || '');
      setProfileImage(user.profileImage || '');
    }
  }, [user]);

  const handleSave = async () => {
    try {
      await updateUser({ name, bio, profileImage });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save profile changes:', error);
      // Optionally, show an error message to the user
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user || !token) return;

    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const response = await axios.post(`/api/users/${user.id}/upload-profile-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      const newProfileImageUrl = response.data.profileImage;
      setProfileImage(newProfileImageUrl);
      updateUser({ ...user, profileImage: newProfileImageUrl });
      alert('Profile image updated successfully!');
    } catch (error) {
      console.error('Failed to upload profile image:', error);
      alert('Failed to upload profile image.');
    }
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
              <AvatarImage src={profileImage || "/placeholder.svg"} alt="Profile" />
              <AvatarFallback className="text-2xl font-garamond text-ink-blue bg-cream">{name ? name.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
            </Avatar>
          </div>
          <input
            type="file"
            accept="image/*"
            id="profile-image-upload"
            className="hidden"
            onChange={handleImageUpload}
          />
          <Button
            size="sm"
            className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 bg-ink-blue hover:bg-forest-green"
            onClick={() => document.getElementById('profile-image-upload')?.click()}
          >
            <Camera className="w-4 h-4" />
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
              
              {bio && (
                <p className="text-lg font-garamond text-center italic text-muted-brown leading-relaxed max-w-2xl">
                  {bio}
                </p>
              )}

              {/* You can add dynamic user stats here if available from the backend */}
              <div className="flex flex-wrap items-center gap-6 justify-center md:justify-start text-muted-brown">
                {/* Example of dynamic data points (replace with actual user data) */}
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span className="font-garamond">Member since: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-garamond">Writing streak: {user?.writingStreak || 0} days</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats - Placeholder for dynamic data */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-muted-brown/20">
        <div className="text-center">
          <div className="text-3xl font-garamond font-bold text-ink-blue">{Array.isArray(user?.entries) ? user.entries.length : 0}</div>
          <div className="text-sm font-garamond text-muted-brown">Total Entries</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-garamond font-bold text-ink-blue">{user?.viewsThisMonth || 0}</div>
          <div className="text-sm font-garamond text-muted-brown">Total Views</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-garamond font-bold text-ink-blue">{user?.engagements || 0}</div>
          <div className="text-sm font-garamond text-muted-brown">Engagements</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-garamond font-bold text-ink-blue">{user?.commentsCount || 0}</div>
          <div className="text-sm font-garamond text-muted-brown">Comments</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
