import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Save, Send, Eye, Image, Tag, Smile } from 'lucide-react';

const WriteEditor = () => {
  const { user, token } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [entryDate, setEntryDate] = useState(new Date().toLocaleDateString());

  const moods = ['Peaceful', 'Excited', 'Contemplative', 'Joyful', 'Melancholy', 'Reflective', 'Energetic', 'Calm', 'Anxious', 'Hopeful'];

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSaveDraft = async () => {
    console.log('Saving draft...');
    if (!user || !token) {
      console.error('User not authenticated.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/drafts', {
        title,
        content,
        mood,
        tags,
        excerpt,
        userId: user.id,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Draft saved:', response.data);
      alert('Draft saved successfully!');
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Failed to save draft.');
    }
  };

  const handlePublish = async () => {
    console.log('Publishing entry...');
    if (!user || !token) {
      console.error('User not authenticated.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/entries', {
        title,
        content,
        mood,
        tags,
        excerpt,
        date: new Date().toISOString(),
        userId: user.id,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Entry published:', response.data);
      alert('Entry published successfully!');
      // Optionally clear form or redirect
      setTitle('');
      setContent('');
      setMood('');
      setTags([]);
      setNewTag('');
      setExcerpt('');
      setEntryDate(new Date().toLocaleDateString());
    } catch (error) {
      console.error('Error publishing entry:', error);
      alert('Failed to publish entry.');
    }
  };

  const EditorView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Editor */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="vintage-card p-6 border-2 border-muted-brown/20">
          <div className="space-y-6">
            <div>
              <label className="block font-garamond text-lg text-ink-blue mb-3 font-medium">
                Entry Title
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What's on your mind today?"
                className="text-xl font-garamond bg-cream/50 border-2 border-muted-brown/30 focus:border-ink-blue"
              />
            </div>

            <div>
              <label className="block font-garamond text-lg text-ink-blue mb-3 font-medium">
                Your Story
              </label>
              <Textarea
                value={content}
                onChange={(e) => {
                  console.log('Content textarea:', e.target.value);
                  setContent(e.target.value);
                }}
                placeholder="Begin writing your story here... Let your thoughts flow freely onto the page."
                className="min-h-96 font-garamond text-base bg-cream/50 border-2 border-muted-brown/30 focus:border-ink-blue resize-none leading-relaxed"
                style={{
                  backgroundImage: 'repeating-linear-gradient(transparent, transparent 1.5rem, #8B7355 1.5rem, #8B7355 calc(1.5rem + 1px))',
                  backgroundSize: '100% 1.6rem',
                  opacity: '0.1'
                }}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="border-2 border-muted-brown/30 text-muted-brown hover:bg-muted-brown/10">
                <Image className="w-4 h-4 mr-2" />
                Add Image
              </Button>
              <Button variant="outline" className="border-2 border-muted-brown/30 text-muted-brown hover:bg-muted-brown/10">
                <Save className="w-4 h-4 mr-2" />
                Auto-save: On
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Mood Selector */}
        <Card className="vintage-card p-6 border-2 border-muted-brown/20">
          <div className="flex items-center gap-3 mb-4">
            <Smile className="w-5 h-5 text-ink-blue" />
            <h3 className="font-garamond text-lg font-bold text-ink-blue">How are you feeling?</h3>
          </div>
          <Select value={mood} onValueChange={setMood}>
            <SelectTrigger className="bg-cream/50 border-2 border-muted-brown/30 font-garamond">
              <SelectValue placeholder="Select your mood" />
            </SelectTrigger>
            <SelectContent className="bg-cream border-2 border-muted-brown/20">
              {moods.map((moodOption) => (
                <SelectItem key={moodOption} value={moodOption} className="font-garamond">
                  {moodOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        {/* Tags */}
        <Card className="vintage-card p-6 border-2 border-muted-brown/20">
          <div className="flex items-center gap-3 mb-4">
            <Tag className="w-5 h-5 text-ink-blue" />
            <h3 className="font-garamond text-lg font-bold text-ink-blue">Tags</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                className="bg-cream/50 border-2 border-muted-brown/30 font-garamond text-sm"
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
              />
              <Button onClick={addTag} size="sm" className="bg-ink-blue text-cream">
                Add
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="font-garamond border-muted-brown/30 cursor-pointer hover:bg-red-50 hover:border-red-300"
                  onClick={() => removeTag(tag)}
                >
                  {tag} ×
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* Excerpt */}
        <Card className="vintage-card p-6 border-2 border-muted-brown/20">
          <h3 className="font-garamond text-lg font-bold text-ink-blue mb-4">Excerpt</h3>
          <Textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Write a brief summary of this entry..."
            className="bg-cream/50 border-2 border-muted-brown/30 font-garamond text-sm resize-none"
            rows={3}
          />
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button 
            onClick={() => setIsPreview(!isPreview)}
            variant="outline" 
            className="w-full border-2 border-muted-brown/30 text-muted-brown hover:bg-muted-brown/10 font-garamond"
          >
            <Eye className="w-4 h-4 mr-2" />
            {isPreview ? 'Edit' : 'Preview'}
          </Button>
          
          <Button 
            onClick={handleSaveDraft}
            variant="outline" 
            className="w-full border-2 border-ink-blue/30 text-ink-blue hover:bg-ink-blue/10 font-garamond"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          
          <Button 
            onClick={handlePublish}
            className="w-full vintage-button text-cream font-garamond"
          >
            <Send className="w-4 h-4 mr-2" />
            Publish Entry
          </Button>
        </div>
      </div>
    </div>
  );

  const PreviewView = () => (
    <Card className="vintage-card p-8 border-2 border-muted-brown/20 max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-garamond font-bold text-ink-blue mb-4">
            {title || 'Untitled Entry'}
          </h1>
          <div className="flex items-center justify-center gap-4 text-muted-brown font-garamond">
            <span>{new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(entryDate))}</span>
            {mood && (
              <Badge className="bg-blue-100 text-blue-800">
                {mood}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="ornamental-divider"></div>
        
        <div className="prose prose-lg max-w-none">
          <p className="font-garamond text-lg leading-relaxed text-muted-brown whitespace-pre-wrap">
            {content || 'Start writing to see your preview...'}
          </p>
        </div>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-6 border-t border-muted-brown/20">
            {tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="font-garamond border-muted-brown/30">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-garamond font-bold text-ink-blue mb-2">Write New Entry</h2>
        <p className="text-muted-brown font-garamond italic">
          "Every page holds a memory, every word tells a story"
        </p>
      </div>
      
      <div className="ornamental-divider"></div>
      
      {isPreview ? <PreviewView /> : <EditorView />}
    </div>
  );
};

export default WriteEditor;
