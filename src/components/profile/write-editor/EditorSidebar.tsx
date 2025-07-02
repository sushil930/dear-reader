
import React from 'react';
import { Card, Input, Button, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Badge, Textarea } from '@/components/ui';
import { Smile, Tag, Eye, Save, Send, Image as ImageComponent } from 'lucide-react';

interface EditorSidebarProps {
  mood: string;
  setMood: (mood: string) => void;
  moods: string[];
  newTag: string;
  setNewTag: (tag: string) => void;
  addTag: () => void;
  tags: string[];
  removeTag: (tag: string) => void;
  excerpt: string;
  setExcerpt: (excerpt: string) => void;
  isPreview: boolean;
  setIsPreview: (preview: boolean) => void;
  onSaveDraft: () => void;
  onPublish: () => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditorSidebar = ({
  mood,
  setMood,
  moods,
  newTag,
  setNewTag,
  addTag,
  tags,
  removeTag,
  excerpt,
  setExcerpt,
  isPreview,
  setIsPreview,
  onSaveDraft,
  onPublish,
  onImageUpload
}: EditorSidebarProps) => {
  return (
    <div className="space-y-6">
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
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
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

      <div className="space-y-3">
        <input
          type="file"
          accept="image/*"
          id="image-upload"
          className="hidden"
          onChange={onImageUpload}
        />
        <Button
          variant="outline"
          className="w-full border-2 border-muted-brown/30 text-muted-brown hover:bg-muted-brown/10"
          onClick={() => document.getElementById('image-upload')?.click()}
        >
          <ImageComponent className="w-4 h-4 mr-2" />
          Add Image
        </Button>
        
        <Button 
          onClick={() => setIsPreview(!isPreview)}
          variant="outline" 
          className="w-full border-2 border-muted-brown/30 text-muted-brown hover:bg-muted-brown/10 font-garamond"
        >
          <Eye className="w-4 h-4 mr-2" />
          {isPreview ? 'Edit' : 'Preview'}
        </Button>
        
        <Button 
          onClick={onSaveDraft}
          variant="outline" 
          className="w-full border-2 border-ink-blue/30 text-ink-blue hover:bg-ink-blue/10 font-garamond"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Draft
        </Button>
        
        <Button 
          onClick={onPublish}
          className="w-full vintage-button text-cream font-garamond"
        >
          <Send className="w-4 h-4 mr-2" />
          Publish Entry
        </Button>
      </div>
    </div>
  );
};

export default EditorSidebar;
