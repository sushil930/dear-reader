
import React, { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { IDraft, IEntry } from '@/context/AuthContext';
import EditorView from './write-editor/EditorView';
import PreviewView from './write-editor/PreviewView';

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

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  }, [content]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
          isPreview={isPreview}
          setIsPreview={setIsPreview}
          handleSaveDraft={handleSaveDraft}
          handlePublish={handlePublish}
          handleImageUpload={handleImageUpload}
          textareaRef={textareaRef}
          handleFormatText={handleFormatText}
        />
      }
    </div>
  );
};

export default WriteEditor;
