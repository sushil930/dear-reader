
import React from 'react';
import { Card, Badge } from '@/components/ui';

interface PreviewViewProps {
  title: string;
  content: string;
  tags: string[];
  entryDate: string;
  mood: string;
}

const PreviewView = ({ title, content, tags, entryDate, mood }: PreviewViewProps) => {
  return (
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
};

export default PreviewView;
