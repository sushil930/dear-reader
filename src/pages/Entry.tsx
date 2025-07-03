import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import * as React from "react";
import ReactMarkdown from 'react-markdown';
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import axios from 'axios';
import VintageLoading from "@/components/ui/vintage-loading";
import { useAuth } from '@/context/AuthContext';

interface EntryData {
  id: string;
  slug: string;
  title: string;
  content: string;
  date: string;
  mood?: string;
  readTime?: number;
  excerpt?: string;
  tags: string[];
  bannerImage?: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author?: { name: string };
  wordCount?: number;
}

const Entry = () => {
  const { user } = useAuth();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [entry, setEntry] = useState<EntryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntry = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        // Try protected route first
        const privateRes = await axios.get(`/api/entries/${slug}`, { withCredentials: true });
        setEntry(privateRes.data);
        console.log("Fetched private entry:", privateRes.data);
      } catch (error: any) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          // Fallback to public route
          try {
            const publicRes = await axios.get(`/api/entries/public/${slug}`);
            setEntry(publicRes.data);
            console.log("Fetched public entry:", publicRes.data);
          } catch (pubError) {
            console.error("Error fetching public entry:", pubError);
            setEntry(null);
          }
        } else {
          console.error("Error fetching entry:", error);
          setEntry(null);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchEntry();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <VintageLoading message="Retrieving your diary entry..." size="lg" />
      </div>
    );
  }

  if (!entry) {
    return <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-garamond text-ink-blue">Entry Not Found</h1>
          <Button onClick={() => navigate('/')} variant="outline" className="border-muted-brown text-muted-brown hover:bg-sepia/20">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Diary
          </Button>
        </div>
      </div>;
  }

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "Reflective":
        return "bg-forest-green/20 text-forest-green border-forest-green/30";
      case "Nostalgic":
        return "bg-muted-brown/20 text-muted-brown border-muted-brown/30";
      case "Still":
        return "bg-ink-blue/20 text-ink-blue border-ink-blue/30";
      default:
        return "bg-soft-gray/20 text-soft-gray border-soft-gray/30";
    }
  };

  return <div className="min-h-screen bg-cream relative">
      {/* Decorative elements */}
      <div className="ink-blot absolute top-20 left-20 opacity-15"></div>
      <div className="ink-blot absolute top-40 right-32 opacity-10"></div>
      
      {/* Navigation Header */}
      <header className="border-b border-muted-brown/20 bg-cream/95 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button 
            onClick={() => user ? navigate('/profile') : navigate('/entries')} 
            variant="ghost" 
            className="text-muted-brown hover:text-ink-blue hover:bg-sepia/20 font-inter"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Entries
          </Button>
          
          <div className="hidden md:flex items-center">
            <nav className="text-sm font-inter text-soft-gray flex items-center gap-2">
              <span 
                className="hover:text-ink-blue cursor-pointer transition-colors whitespace-nowrap truncate" 
                onClick={() => navigate('/')}
              >
                Home
              </span>
              <span className="text-muted-brown/50">/</span>
              <span className="text-muted-brown whitespace-nowrap">Entry</span>
              <span className="text-muted-brown/50">/</span>
              <span className="text-ink-blue font-medium whitespace-nowrap truncate">
                {entry.title}
              </span>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-4 gap-16">
        {/* Main Content */}
        <article className="lg:col-span-3 space-y-10">
          {/* Entry Header */}
          <header className="space-y-8 pb-10 border-b border-muted-brown/15">
            <div className="flex items-center gap-6 text-sm font-inter text-muted-brown">
              <time dateTime={entry.createdAt} className="tracking-wide">{entry.date}</time>
               <span className="tracking-wide">by {entry.author?.name}</span>
              <Badge variant="outline" className={`${getMoodColor(entry.mood)} px-4 py-1`}>
                {entry.mood}
              </Badge>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="tracking-wide">{entry.readTime ?? 'N/A'}</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-garamond font-medium text-ink-blue leading-tight drop-cap">
              {entry.title}
            </h1>
            
            <p className="text-2xl font-garamond text-soft-gray leading-relaxed italic handwritten">
              {entry.excerpt ?? ''}
            </p>
          </header>

          {/* Entry Image */}
          {entry.bannerImage && (
            <div className="mb-8">
              <img src={entry.bannerImage} alt={entry.title ?? 'Entry Banner'} className="w-full h-auto rounded-lg shadow-md" />
            </div>
          )}

          {/* Entry Content */}
          <div className="prose prose-lg max-w-none font-garamond text-soft-gray">
            {entry.content ? <ReactMarkdown>{entry.content}</ReactMarkdown> : <p>No content available.</p>}
          </div>

          {/* Entry Footer */}
          <footer className="space-y-8">
            <div className="ornamental-divider"></div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-3 items-center">
              <Tag className="w-5 h-5 text-muted-brown" />
              {(entry.tags ?? []).map(tag => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="border-muted-brown/30 text-muted-brown hover:bg-sepia/20 px-3 py-1 font-inter text-sm cursor-pointer"
                  onClick={() => navigate(`/entries?topic=${tag}`)}
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Entry Stats */}
            <div className="flex items-center gap-8 text-sm font-inter text-soft-gray">
              <span className="tracking-wide">{entry.wordCount ?? 'N/A'} words</span>
              <span className="tracking-wide">Published {entry.createdAt ? new Date(entry.createdAt).toLocaleDateString() : 'Invalid Date'}</span>
            </div>
          </footer>
        </article>

        {/* Sidebar */}
        <aside className="space-y-10">
          {/* Related Entries - Placeholder for future implementation. The related entries section is commented out because it is not yet implemented. */}

          {/* Reading Stats */}
          <Card className="vintage-card border-muted-brown/20">
            <CardContent className="p-8 space-y-4">
              <h3 className="font-garamond font-medium text-ink-blue text-lg">About This Entry</h3>
              <div className="space-y-3 text-sm font-inter">
                <div className="flex justify-between">
                  <span className="text-soft-gray tracking-wide">Reading time:</span>
                  <span className="text-muted-brown font-medium">{entry.readTime ?? 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-soft-gray tracking-wide">Word count:</span>
                  <span className="text-muted-brown font-medium">{entry.wordCount ?? 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-soft-gray tracking-wide">Mood:</span>
                  <span className="text-muted-brown font-medium">{entry.mood ?? 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-soft-gray tracking-wide">Topics:</span>
                  <span className="text-muted-brown font-medium">{(entry.tags ?? []).length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>;
};

export default Entry;
