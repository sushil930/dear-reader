
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
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

interface FormattingToolbarProps {
  onFormatText: (format: string) => void;
}

const FormattingToolbar = ({ onFormatText }: FormattingToolbarProps) => {
  return (
    <div className="bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-lg p-1 shadow-sm">
      <div className="flex flex-wrap items-center gap-1">
        <div className="flex items-center gap-1 pr-3 border-r border-slate-300">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-700 rounded-md transition-all duration-200"
            onClick={() => onFormatText('bold')}
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-700 rounded-md transition-all duration-200"
            onClick={() => onFormatText('italic')}
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-700 rounded-md transition-all duration-200"
            onClick={() => onFormatText('underline')}
          >
            <Underline className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-yellow-100 hover:text-yellow-700 rounded-md transition-all duration-200"
            onClick={() => onFormatText('highlight')}
          >
            <Highlighter className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1 pr-3 border-r border-slate-300">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-purple-100 hover:text-purple-700 rounded-md transition-all duration-200"
            onClick={() => onFormatText('h1')}
          >
            <Heading1 className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-purple-100 hover:text-purple-700 rounded-md transition-all duration-200"
            onClick={() => onFormatText('h2')}
          >
            <Heading2 className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-purple-100 hover:text-purple-700 rounded-md transition-all duration-200"
            onClick={() => onFormatText('h3')}
          >
            <Type className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1 pr-3 border-r border-slate-300">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-700 rounded-md transition-all duration-200"
            onClick={() => onFormatText('list')}
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-700 rounded-md transition-all duration-200"
            onClick={() => onFormatText('ordered-list')}
          >
            <ListOrdered className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-700 rounded-md transition-all duration-200"
            onClick={() => onFormatText('todo')}
          >
            <CheckSquare className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1 pr-3 border-r border-slate-300">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-orange-100 hover:text-orange-700 rounded-md transition-all duration-200"
            onClick={() => onFormatText('align-left')}
          >
            <AlignLeft className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-orange-100 hover:text-orange-700 rounded-md transition-all duration-200"
            onClick={() => onFormatText('align-center')}
          >
            <AlignCenter className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-orange-100 hover:text-orange-700 rounded-md transition-all duration-200"
            onClick={() => onFormatText('align-right')}
          >
            <AlignRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-indigo-100 hover:text-indigo-700 rounded-md transition-all duration-200"
            onClick={() => onFormatText('quote')}
          >
            <Quote className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-100 hover:text-gray-700 rounded-md transition-all duration-200"
            onClick={() => onFormatText('code')}
          >
            <Code className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-100 hover:text-gray-700 rounded-md transition-all duration-200"
            onClick={() => onFormatText('divider')}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-teal-100 hover:text-teal-700 rounded-md transition-all duration-200"
            onClick={() => onFormatText('link')}
          >
            <Link className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormattingToolbar;
