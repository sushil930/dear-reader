import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { FileText, Search, Clock, Edit, Trash2, Send } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DraftManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { user, token, setUser, addEntryToUser } = useAuth();
  const navigate = useNavigate();
  const drafts = user?.drafts ? user.drafts : [];

  const filteredDrafts = drafts.filter(draft =>
    draft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    draft.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    draft.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (draft.tags && draft.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const handleContinueWriting = (draftId: string) => {
    console.log('Continue writing draft:', draftId);
    navigate(`/write?draftId=${draftId}`);
  };

  const handlePublishDraft = async (draftId: string) => {
    if (!user || !token) {
      console.error('User not authenticated.');
      return;
    }
    try {
      const response = await axios.post(`/api/drafts/publish/${draftId}`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newEntry = response.data;

      // Remove draft from user's drafts
      setUser(prevUser => {
        if (prevUser) {
          return { ...prevUser, drafts: prevUser.drafts.filter(draft => draft.id !== draftId) };
        }
        return prevUser;
      });

      // Add new entry to user's entries
      addEntryToUser(newEntry);

      console.log('Draft published successfully:', newEntry);
      // Optionally navigate to the new entry page
      navigate(`/entry/${newEntry.slug}`);
    } catch (error) {
      console.error('Failed to publish draft:', error);
    }
  };

  const handleDeleteDraft = async (draftId: string) => {
    if (!user || !token) {
      console.error('User not authenticated.');
      return;
    }
    try {
      await axios.delete(`/api/drafts/${draftId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Update user's drafts in AuthContext after successful deletion
      setUser(prevUser => {
        if (prevUser) {
          return { ...prevUser, drafts: prevUser.drafts.filter(draft => draft.id !== draftId) };
        }
        return prevUser;
      });
      console.log('Draft deleted successfully:', draftId);
    } catch (error) {
      console.error('Failed to delete draft:', error);
    }
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Yesterday';
    return `${diffInDays} days ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-garamond font-bold text-ink-blue mb-2">Draft Entries</h2>
        <p className="text-muted-brown font-garamond italic">
          "Ideas taking shape, stories waiting to be told"
        </p>
      </div>
      
      <div className="ornamental-divider"></div>

      {/* Search */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-brown w-4 h-4" />
          <Input
            placeholder="Search drafts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-cream/50 border-2 border-muted-brown/30 font-garamond focus:border-ink-blue"
          />
        </div>
      </div>

      {/* Drafts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrafts.map((draft) => (
          <Card key={draft.id} className="vintage-card p-6 border-2 border-muted-brown/20 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-ink-blue" />
                <Badge variant="secondary" className="font-garamond text-xs">
                  Draft
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-brown font-garamond">
                <Clock className="w-3 h-3" />
                {formatRelativeTime(draft.lastModified)}
              </div>
            </div>

            <h3 className="text-xl font-garamond font-bold text-ink-blue mb-3 line-clamp-2">
              {draft.title || 'Untitled Draft'}
            </h3>

            <p className="text-muted-brown font-garamond mb-4 line-clamp-3 text-sm leading-relaxed">
              {draft.excerpt}
            </p>

            <div className="space-y-4">
              {/* Tags */}
              {draft.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {draft.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs font-garamond border-muted-brown/30">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-muted-brown font-garamond">
                <span>{draft.wordCount} words</span>
                <span>{draft.lastModified.split(' ')[0]}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  onClick={() => handleContinueWriting(draft.id)}
                  className="flex-1 vintage-button text-cream font-garamond text-sm py-2"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Continue
                </Button>
                
                <Button
                  onClick={() => handlePublishDraft(draft.id)}
                  variant="outline"
                  size="sm"
                  className="border-2 border-green-300 text-green-700 hover:bg-green-50"
                >
                  <Send className="w-4 h-4" />
                </Button>
                
                <Button
                  onClick={() => handleDeleteDraft(draft.id)}
                  variant="outline"
                  size="sm"
                  className="border-2 border-red-300 text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredDrafts.length === 0 && searchTerm === '' && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-muted-brown/50 mx-auto mb-4" />
          <h3 className="text-xl font-garamond font-bold text-ink-blue mb-2">No drafts yet</h3>
          <p className="text-muted-brown font-garamond mb-6">
            Start writing to save your thoughts as drafts
          </p>
          <Button className="vintage-button text-cream font-garamond">
            Start Writing
          </Button>
        </div>
      )}

      {/* Quick Stats */}
      <Card className="vintage-card p-6 border-2 border-muted-brown/20 bg-cream/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-garamond font-bold text-ink-blue mb-2">{filteredDrafts.length}</div>
            <div className="text-sm font-garamond text-muted-brown">Total Drafts</div>
          </div>
          <div>
            <div className="text-3xl font-garamond font-bold text-ink-blue mb-2">
              {filteredDrafts.reduce((sum, draft) => sum + draft.wordCount, 0)}
            </div>
            <div className="text-sm font-garamond text-muted-brown">Total Words</div>
          </div>
          <div>
            <div className="text-3xl font-garamond font-bold text-ink-blue mb-2">
              {filteredDrafts.filter(draft => {
                const modified = new Date(draft.lastModified);
                const today = new Date();
                return modified.toDateString() === today.toDateString();
              }).length}
            </div>
            <div className="text-sm font-garamond text-muted-brown">Modified Today</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DraftManager;
