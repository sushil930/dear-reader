import React, { useState, useCallback, memo, Dispatch, SetStateAction, ChangeEvent, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { IDraft, IEntry } from '@/context/AuthContext';
import { Card, Input, Textarea, Button, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Badge } from '@/components/ui';
import { 
  Image as ImageComponent, 
  Save, 
  Smile, 
  Tag, 
  Eye, 
  Send, 
  Bold, 
  Italic, 
  Underline, 
  List, 
  Quote, 
  Heading1, 
  Heading2, 
  Link,
  ListOrdered,
  Code,
  Minus,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Highlighter,
  CheckSquare
} from 'lucide-react';

interface EditorViewProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  content: string;
  handleContentChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  mood: string;
  setMood: Dispatch<SetStateAction<string>>;
  moods: string[];
  newTag: string;
  setNewTag: Dispatch<SetStateAction<string>>;
  addTag: () => void;
  tags: string[];
  removeTag: (tagToRemove: string) => void;
  excerpt: string;
  setExcerpt: Dispatch<SetStateAction<string>>;
  isPreview: boolean;
  setIsPreview: Dispatch<SetStateAction<boolean>>;
  handleSaveDraft: () => Promise<void>;
  handlePublish: () => Promise<void>;
  handleImageUpload: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  handleFormatText: (format: string) => void;
}

interface PreviewViewProps {
  title: string;
  content: string;
  tags: string[];
  entryDate: string;
  mood: string;
}

const EditorView = memo(({ title, setTitle, content, handleContentChange, mood, setMood, moods, newTag, setNewTag, addTag, tags, removeTag, excerpt, setExcerpt, isPreview, setIsPreview, handleSaveDraft, handlePublish, handleImageUpload, textareaRef, handleFormatText }: EditorViewProps) => (

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
            
            {/* Enhanced Formatting Toolbar */}
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-lg p-1 shadow-sm">
              {/* Text Formatting Row */}
              <div className="flex flex-wrap items-center gap-1">
                <div className="flex items-center gap-1 pr-3 border-r border-slate-300">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-700 rounded-md transition-all duration-200"
                    onClick={() => handleFormatText('bold')}
                  >
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-700 rounded-md transition-all duration-200"
                    onClick={() => handleFormatText('italic')}
                  >
                    <Italic className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-700 rounded-md transition-all duration-200"
                    onClick={() => handleFormatText('underline')}
                  >
                    <Underline className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-yellow-100 hover:text-yellow-700 rounded-md transition-all duration-200"
                    onClick={() => handleFormatText('highlight')}
                  >
                    <Highlighter className="w-4 h-4" />
                  </Button>
                </div>

                {/* Headings */}
                <div className="flex items-center gap-1 pr-3 border-r border-slate-300">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-purple-100 hover:text-purple-700 rounded-md transition-all duration-200"
                    onClick={() => handleFormatText('h1')}
                  >
                    <Heading1 className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-purple-100 hover:text-purple-700 rounded-md transition-all duration-200"
                    onClick={() => handleFormatText('h2')}
                  >
                    <Heading2 className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-purple-100 hover:text-purple-700 rounded-md transition-all duration-200"
                    onClick={() => handleFormatText('h3')}
                  >
                    <Type className="w-4 h-4" />
                  </Button>
                </div>

                {/* Lists */}
                <div className="flex items-center gap-1 pr-3 border-r border-slate-300">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-700 rounded-md transition-all duration-200"
                    onClick={() => handleFormatText('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-700 rounded-md transition-all duration-200"
                    onClick={() => handleFormatText('ordered-list')}
                  >
                    <ListOrdered className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-700 rounded-md transition-all duration-200"
                    onClick={() => handleFormatText('todo')}
                  >
                    <CheckSquare className="w-4 h-4" />
                  </Button>
                </div>

                {/* Text Alignment */}
                <div className="flex items-center gap-1 pr-3 border-r border-slate-300">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-orange-100 hover:text-orange-700 rounded-md transition-all duration-200"
                    onClick={() => handleFormatText('align-left')}
                  >
                    <AlignLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-orange-100 hover:text-orange-700 rounded-md transition-all duration-200"
                    onClick={() => handleFormatText('align-center')}
                  >
                    <AlignCenter className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-orange-100 hover:text-orange-700 rounded-md transition-all duration-200"
                    onClick={() => handleFormatText('align-right')}
                  >
                    <AlignRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Special Elements */}
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-indigo-100 hover:text-indigo-700 rounded-md transition-all duration-200"
                    onClick={() => handleFormatText('quote')}
                  >
                    <Quote className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-gray-100 hover:text-gray-700 rounded-md transition-all duration-200"
                    onClick={() => handleFormatText('code')}
                  >
                    <Code className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-gray-100 hover:text-gray-700 rounded-md transition-all duration-200"
                    onClick={() => handleFormatText('divider')}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-teal-100 hover:text-teal-700 rounded-md transition-all duration-200"
                    onClick={() => handleFormatText('link')}
                  >
                    <Link className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Textarea
              ref={textareaRef}
              value={content}
              onChange={handleContentChange}
              placeholder="Begin writing your story here... Let your thoughts flow freely onto the page."
              className="min-h-96 font-garamond text-base text-ink-blue bg-cream/50 border-2 border-muted-brown/30 focus:border-ink-blue resize-none leading-[1.6rem] p-4 rounded-t-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 1.5rem, rgba(139, 115, 85, 0.3) 1.5rem, rgba(139, 115, 85, 0.3) calc(1.5rem + 1px))',
                backgroundSize: '100% 1.6rem',
                backgroundPositionY: '0.75rem',
                backgroundAttachment: 'local',
              }}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <input
              type="file"
              accept="image/*"
              id="image-upload"
              className="hidden"
              onChange={handleImageUpload}
            />
            <Button
              variant="outline"
              className="border-2 border-muted-brown/30 text-muted-brown hover:bg-muted-brown/10"
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              <ImageComponent className="w-4 h-4 mr-2" />
              Add Image
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
));

const PreviewView = memo(({ title, content, tags, entryDate, mood }: PreviewViewProps) => (

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
));

const WriteEditor = () => {
  const { user, token, addDraftToUser, addEntryToUser } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [entryDate, setEntryDate] = useState(new Date().toLocaleDateString());
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const moods = ['Peaceful', 'Excited', 'Contemplative', 'Joyful', 'Melancholy', 'Reflective', 'Energetic', 'Calm', 'Anxious', 'Hopeful'];

  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }, []);

  const addTag = useCallback(() => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(prev => [...prev, newTag.trim()]);
      setNewTag('');
    }
  }, [newTag, tags]);

  const removeTag = useCallback((tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  }, []);

  const handleFormatText = useCallback((format: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    let formattedText = '';
    let newCursorPos = start;

    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        newCursorPos = selectedText ? start + formattedText.length : start + 2;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        newCursorPos = selectedText ? start + formattedText.length : start + 1;
        break;
      case 'underline':
        formattedText = `<u>${selectedText}</u>`;
        newCursorPos = selectedText ? start + formattedText.length : start + 3;
        break;
      case 'highlight':
        formattedText = `==${selectedText}==`;
        newCursorPos = selectedText ? start + formattedText.length : start + 2;
        break;
      case 'h1':
        formattedText = `# ${selectedText}`;
        newCursorPos = selectedText ? start + formattedText.length : start + 2;
        break;
      case 'h2':
        formattedText = `## ${selectedText}`;
        newCursorPos = selectedText ? start + formattedText.length : start + 3;
        break;
      case 'h3':
        formattedText = `### ${selectedText}`;
        newCursorPos = selectedText ? start + formattedText.length : start + 4;
        break;
      case 'list':
        formattedText = `- ${selectedText}`;
        newCursorPos = selectedText ? start + formattedText.length : start + 2;
        break;
      case 'ordered-list':
        formattedText = `1. ${selectedText}`;
        newCursorPos = selectedText ? start + formattedText.length : start + 3;
        break;
      case 'todo':
        formattedText = `- [ ] ${selectedText}`;
        newCursorPos = selectedText ? start + formattedText.length : start + 6;
        break;
      case 'quote':
        formattedText = `> ${selectedText}`;
        newCursorPos = selectedText ? start + formattedText.length : start + 2;
        break;
      case 'code':
        formattedText = `\`${selectedText}\``;
        newCursorPos = selectedText ? start + formattedText.length : start + 1;
        break;
      case 'divider':
        formattedText = `\n---\n`;
        newCursorPos = start + formattedText.length;
        break;
      case 'link':
        formattedText = `[${selectedText || 'link text'}](url)`;
        newCursorPos = selectedText ? start + formattedText.length - 5 : start + 1;
        break;
      case 'align-left':
        formattedText = `<div align="left">${selectedText}</div>`;
        newCursorPos = selectedText ? start + formattedText.length : start + 17;
        break;
      case 'align-center':
        formattedText = `<div align="center">${selectedText}</div>`;
        newCursorPos = selectedText ? start + formattedText.length : start + 19;
        break;
      case 'align-right':
        formattedText = `<div align="right">${selectedText}</div>`;
        newCursorPos = selectedText ? start + formattedText.length : start + 18;
        break;
      default:
        return;
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);

    // Set cursor position after state update
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  }, [content]);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5000/api/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      const imageUrl = response.data.imageUrl;
      const imageMarkdown = `\n![${file.name}](${imageUrl})\n`;

      setContent(prevContent => prevContent + imageMarkdown);
      alert('Image uploaded and added to content!');
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Failed to upload image.');
    }
  };

  const handleSaveDraft = async () => {
    if (!user || !token) {
      return;
    }
    try {
      const response = await axios.post<IDraft>('http://localhost:5000/api/drafts', {
        title,
        content,
        mood,
        tags,
        excerpt,
        userId: user.id,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      addDraftToUser(response.data);
      alert('Draft saved successfully!');
    } catch (error) {
      alert('Failed to save draft.');
    }
  };

  const handlePublish = async () => {
    if (!user || !token) {
      return;
    }
    try {
      const response = await axios.post<IEntry>('http://localhost:5000/api/entries', {
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
      addEntryToUser(response.data);
      alert('Entry published successfully!');
      // Clear form
      setTitle('');
      setContent('');
      setMood('');
      setTags([]);
      setNewTag('');
      setExcerpt('');
      setEntryDate(new Date().toLocaleDateString());
    } catch (error) {
      alert('Failed to publish entry.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-garamond font-bold text-ink-blue mb-2">Write New Entry</h2>
        <p className="text-muted-brown font-garamond italic">
          "Every page holds a memory, every word tells a story"
        </p>
      </div>
      
      <div className="ornamental-divider"></div>
      
      {isPreview ? 
        <PreviewView 
          title={title}
          content={content}
          tags={tags}
          entryDate={entryDate}
          mood={mood}
        /> 
        : 
        <EditorView
          title={title}
          setTitle={setTitle}
          content={content}
          handleContentChange={handleContentChange}
          mood={mood}
          setMood={setMood}
          moods={moods}
          newTag={newTag}
          setNewTag={setNewTag}
          addTag={addTag}
          tags={tags}
          removeTag={removeTag}
          excerpt={excerpt}
          setExcerpt={setExcerpt}
          setIsPreview={setIsPreview}
          handleSaveDraft={handleSaveDraft}
          handlePublish={handlePublish}
          handleImageUpload={handleImageUpload}
          textareaRef={textareaRef}
          handleFormatText={handleFormatText}
          isPreview={isPreview}
        />
      }
    </div>
  );
};

export default WriteEditor;
