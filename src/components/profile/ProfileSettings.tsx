import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { User, Bell, Shield, Download, Palette, Globe } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ProfileSettings = () => {
  const { user, token, login } = useAuth();

  const [profileData, setProfileData] = useState(user ? {
    displayName: user.name || '',
    email: user.email || '',
    bio: user.bio || '',
    location: user.location || '',
    website: user.website || ''
  } : {
    displayName: '',
    email: '',
    bio: '',
    location: '',
    website: ''
  });

  const [preferences, setPreferences] = useState({
    defaultMood: '', // Replace with user preference if available from backend
    autoSave: true,
    publicProfile: false,
    showReadingTime: true,
    allowComments: true
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    commentNotifications: true,
    likeNotifications: false,
    weeklyDigest: true
  });

  const handleSaveProfile = () => {
    console.log('Saving profile...');
    // Save to backend
  };

  const handleExportData = () => {
    console.log('Exporting data...');
    // Export functionality
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-garamond font-bold text-ink-blue mb-2">Account Settings</h2>
        <p className="text-muted-brown font-garamond italic">
          "Customize your diary experience"
        </p>
      </div>
      
      <div className="ornamental-divider"></div>

      {/* Profile Settings */}
      <Card className="vintage-card p-8 border-2 border-muted-brown/20">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-6 h-6 text-ink-blue" />
          <h3 className="text-2xl font-garamond font-bold text-ink-blue">Profile Information</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-garamond text-lg text-ink-blue mb-2 font-medium">
              Display Name
            </label>
            <Input
              value={profileData.displayName}
              onChange={(e) => setProfileData({...profileData, displayName: e.target.value})}
              className="bg-cream/50 border-2 border-muted-brown/30 font-garamond focus:border-ink-blue"
            />
          </div>

          <div>
            <label className="block font-garamond text-lg text-ink-blue mb-2 font-medium">
              Email Address
            </label>
            <Input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              className="bg-cream/50 border-2 border-muted-brown/30 font-garamond focus:border-ink-blue"
            />
          </div>

          <div>
            <label className="block font-garamond text-lg text-ink-blue mb-2 font-medium">
              Location
            </label>
            <Input
              value={profileData.location}
              onChange={(e) => setProfileData({...profileData, location: e.target.value})}
              className="bg-cream/50 border-2 border-muted-brown/30 font-garamond focus:border-ink-blue"
            />
          </div>

          <div>
            <label className="block font-garamond text-lg text-ink-blue mb-2 font-medium">
              Website
            </label>
            <Input
              value={profileData.website}
              onChange={(e) => setProfileData({...profileData, website: e.target.value})}
              className="bg-cream/50 border-2 border-muted-brown/30 font-garamond focus:border-ink-blue"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-garamond text-lg text-ink-blue mb-2 font-medium">
              Bio
            </label>
            <textarea
              value={profileData.bio}
              onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
              className="w-full p-3 rounded-lg bg-cream/50 border-2 border-muted-brown/30 font-garamond focus:border-ink-blue resize-none"
              rows={3}
            />
          </div>
        </div>

        <div className="mt-6">
          <Button onClick={handleSaveProfile} className="vintage-button text-cream font-garamond">
            Save Profile Changes
          </Button>
        </div>
      </Card>

      {/* Writing Preferences */}
      <Card className="vintage-card p-8 border-2 border-muted-brown/20">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="w-6 h-6 text-ink-blue" />
          <h3 className="text-2xl font-garamond font-bold text-ink-blue">Writing Preferences</h3>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block font-garamond text-lg text-ink-blue mb-3 font-medium">
              Default Mood
            </label>
            <Select value={preferences.defaultMood} onValueChange={(value) => setPreferences({...preferences, defaultMood: value})}>
              <SelectTrigger className="bg-cream/50 border-2 border-muted-brown/30 font-garamond">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Peaceful">Peaceful</SelectItem>
                <SelectItem value="Excited">Excited</SelectItem>
                <SelectItem value="Contemplative">Contemplative</SelectItem>
                <SelectItem value="Joyful">Joyful</SelectItem>
                <SelectItem value="Reflective">Reflective</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-garamond text-lg text-ink-blue font-medium">Auto-save drafts</h4>
              <p className="text-muted-brown font-garamond text-sm">Automatically save your work as you write</p>
            </div>
            <Switch
              checked={preferences.autoSave}
              onCheckedChange={(checked) => setPreferences({...preferences, autoSave: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-garamond text-lg text-ink-blue font-medium">Show reading time</h4>
              <p className="text-muted-brown font-garamond text-sm">Display estimated reading time for entries</p>
            </div>
            <Switch
              checked={preferences.showReadingTime}
              onCheckedChange={(checked) => setPreferences({...preferences, showReadingTime: checked})}
            />
          </div>
        </div>
      </Card>

      {/* Privacy Settings */}
      <Card className="vintage-card p-8 border-2 border-muted-brown/20">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-ink-blue" />
          <h3 className="text-2xl font-garamond font-bold text-ink-blue">Privacy & Sharing</h3>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-garamond text-lg text-ink-blue font-medium">Public profile</h4>
              <p className="text-muted-brown font-garamond text-sm">Allow others to discover your public entries</p>
            </div>
            <Switch
              checked={preferences.publicProfile}
              onCheckedChange={(checked) => setPreferences({...preferences, publicProfile: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-garamond text-lg text-ink-blue font-medium">Allow comments</h4>
              <p className="text-muted-brown font-garamond text-sm">Let readers comment on your public entries</p>
            </div>
            <Switch
              checked={preferences.allowComments}
              onCheckedChange={(checked) => setPreferences({...preferences, allowComments: checked})}
            />
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="vintage-card p-8 border-2 border-muted-brown/20">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-ink-blue" />
          <h3 className="text-2xl font-garamond font-bold text-ink-blue">Notifications</h3>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-garamond text-lg text-ink-blue font-medium">Email notifications</h4>
              <p className="text-muted-brown font-garamond text-sm">Receive updates via email</p>
            </div>
            <Switch
              checked={notifications.emailNotifications}
              onCheckedChange={(checked) => setNotifications({...notifications, emailNotifications: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-garamond text-lg text-ink-blue font-medium">Comment notifications</h4>
              <p className="text-muted-brown font-garamond text-sm">Get notified when someone comments</p>
            </div>
            <Switch
              checked={notifications.commentNotifications}
              onCheckedChange={(checked) => setNotifications({...notifications, commentNotifications: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-garamond text-lg text-ink-blue font-medium">Weekly digest</h4>
              <p className="text-muted-brown font-garamond text-sm">Weekly summary of your writing activity</p>
            </div>
            <Switch
              checked={notifications.weeklyDigest}
              onCheckedChange={(checked) => setNotifications({...notifications, weeklyDigest: checked})}
            />
          </div>
        </div>
      </Card>

      {/* Account Security */}
      <Card className="vintage-card p-8 border-2 border-muted-brown/20">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-ink-blue" />
          <h3 className="text-2xl font-garamond font-bold text-ink-blue">Security</h3>
        </div>

        <div className="space-y-4">
          <Button variant="outline" className="border-2 border-muted-brown/30 text-muted-brown hover:bg-muted-brown/10 font-garamond">
            Change Password
          </Button>
          
          <Button variant="outline" className="border-2 border-muted-brown/30 text-muted-brown hover:bg-muted-brown/10 font-garamond">
            Enable Two-Factor Authentication
          </Button>
        </div>
      </Card>

      {/* Data Export */}
      <Card className="vintage-card p-8 border-2 border-muted-brown/20">
        <div className="flex items-center gap-3 mb-6">
          <Download className="w-6 h-6 text-ink-blue" />
          <h3 className="text-2xl font-garamond font-bold text-ink-blue">Export Data</h3>
        </div>

        <p className="text-muted-brown font-garamond mb-6">
          Download all your diary entries and data in various formats.
        </p>

        <div className="flex flex-wrap gap-4">
          <Button onClick={handleExportData} variant="outline" className="border-2 border-muted-brown/30 text-muted-brown hover:bg-muted-brown/10 font-garamond">
            Export as PDF
          </Button>
          <Button onClick={handleExportData} variant="outline" className="border-2 border-muted-brown/30 text-muted-brown hover:bg-muted-brown/10 font-garamond">
            Export as Word Document
          </Button>
          <Button onClick={handleExportData} variant="outline" className="border-2 border-muted-brown/30 text-muted-brown hover:bg-muted-brown/10 font-garamond">
            Export as JSON
          </Button>
        </div>
      </Card>

      <button onClick={async () => {
        try {
          const response = await axios.post('/api/auth/mock');
          if (response.status === 200) {
            login(token, response.data);
            alert('User data mocked successfully!');
          } else {
            alert('Failed to mock user data');
          }
        } catch (error) {
          console.error('Error mocking user data:', error);
          alert('Error mocking user data');
        }
      }}>Mock Data</button>
    </div>
  );
};

export default ProfileSettings;
