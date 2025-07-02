
import React from 'react';
import { Card, Input } from '@/components/ui';
import FormattingToolbar from './FormattingToolbar';
import EnhancedTextarea from './EnhancedTextarea';
import EditorSidebar from './EditorSidebar';

interface EditorViewProps {
  title: string;
  setTitle: (title: string) => void;
  content: string;
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  mood: string;
  setMood: (mood: string) => void;
  moods: string[];
  newTag: string;
  setNewTag: (tag: string) => void;
  addTag: () => void;
  tags: string[];
  removeTag: (tagToRemove: string) => void;
  excerpt: string;
  setExcerpt: (excerpt: string) => void;
  isPreview: boolean;
  setIsPreview: (preview: boolean) => void;
  handleSaveDraft: () => Promise<void>;
  handlePublish: () => Promise<void>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  handleFormatText: (format: string) => void;
}

const EditorView = ({
  title,
  setTitle,
  content,
  handleContentChange,
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
  handleSaveDraft,
  handlePublish,
  handleImageUpload,
  textareaRef,
  handleFormatText
}: EditorViewProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
              
              <FormattingToolbar onFormatText={handleFormatText} />
              <EnhancedTextarea
                content={content}
                onChange={handleContentChange}
                textareaRef={textareaRef}
              />
            </div>
          </div>
        </Card>
      </div>

      <EditorSidebar
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
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
        onImageUpload={handleImageUpload}
      />
    </div>
  );
};

export default EditorView;
