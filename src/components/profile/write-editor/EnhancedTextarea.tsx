
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface EnhancedTextareaProps {
  content: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

const EnhancedTextarea = ({ content, onChange, textareaRef }: EnhancedTextareaProps) => {
  return (
    <div className="relative">
      <Textarea
        ref={textareaRef}
        value={content}
        onChange={onChange}
        placeholder="Begin writing your story here... Let your thoughts flow freely onto the page."
        className="min-h-96 font-garamond text-base text-ink-blue bg-cream/50 border-2 border-muted-brown/30 focus:border-ink-blue resize-none leading-[1.6rem] p-4 rounded-t-none relative z-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(transparent, transparent 1.5rem, rgba(139, 115, 85, 0.3) 1.5rem, rgba(139, 115, 85, 0.3) calc(1.5rem + 1px))',
          backgroundSize: '100% 1.6rem',
          backgroundPositionY: '0.75rem',
          backgroundAttachment: 'local',
          fontFamily: '"EB Garamond", serif',
          lineHeight: '1.6rem',
        }}
      />
      
      <div 
        className="absolute inset-0 pointer-events-none z-0 p-4 font-garamond text-base leading-[1.6rem] whitespace-pre-wrap overflow-hidden text-transparent"
        style={{
          backgroundImage: 'repeating-linear-gradient(transparent, transparent 1.5rem, rgba(139, 115, 85, 0.3) 1.5rem, rgba(139, 115, 85, 0.3) calc(1.5rem + 1px))',
          backgroundSize: '100% 1.6rem',
          backgroundPositionY: '0.75rem',
          backgroundAttachment: 'local',
          fontFamily: '"EB Garamond", serif',
        }}
        dangerouslySetInnerHTML={{
          __html: content
            .replace(/\*\*(.*?)\*\*/g, '<span style="font-weight: bold; color: #2563eb;">$1</span>')
            .replace(/\*(.*?)\*/g, '<span style="font-style: italic; color: #7c3aed;">$1</span>')
            .replace(/<u>(.*?)<\/u>/g, '<span style="text-decoration: underline; color: #dc2626;">$1</span>')
            .replace(/==(.*?)==/g, '<span style="background-color: #fef08a; color: #854d0e; padding: 0 2px;">$1</span>')
            .replace(/^# (.*$)/gim, '<span style="font-size: 1.5em; font-weight: bold; color: #1e40af; display: block; margin: 0.5em 0;">$1</span>')
            .replace(/^## (.*$)/gim, '<span style="font-size: 1.25em; font-weight: bold; color: #1e40af; display: block; margin: 0.4em 0;">$1</span>')
            .replace(/^### (.*$)/gim, '<span style="font-size: 1.1em; font-weight: bold; color: #1e40af; display: block; margin: 0.3em 0;">$1</span>')
            .replace(/^> (.*$)/gim, '<span style="border-left: 4px solid #6366f1; padding-left: 12px; color: #6366f1; font-style: italic; display: block; margin: 0.5em 0;">$1</span>')
            .replace(/`(.*?)`/g, '<span style="background-color: #f3f4f6; color: #374151; padding: 2px 4px; border-radius: 3px; font-family: monospace;">$1</span>')
            .replace(/^- (.*$)/gim, '<span style="color: #059669; display: block; margin: 0.2em 0;">• $1</span>')
            .replace(/^\d+\. (.*$)/gim, '<span style="color: #059669; display: block; margin: 0.2em 0;">$&</span>')
            .replace(/^- \[ \] (.*$)/gim, '<span style="color: #059669; display: block; margin: 0.2em 0;">☐ $1</span>')
            .replace(/^- \[x\] (.*$)/gim, '<span style="color: #059669; display: block; margin: 0.2em 0;">☑ $1</span>')
            .replace(/^---$/gim, '<span style="display: block; text-align: center; color: #9ca3af; margin: 1em 0;">• • •</span>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<span style="color: #0891b2; text-decoration: underline;">$1</span>')
        }}
      />
    </div>
  );
};

export default EnhancedTextarea;
