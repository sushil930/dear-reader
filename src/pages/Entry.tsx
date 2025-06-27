import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { getEntryBySlug, getRelatedEntries } from "@/data/entries";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";

const Entry = () => {
  const {
    slug
  } = useParams<{
    slug: string;
  }>();
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const entry = slug ? getEntryBySlug(slug) : null;
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
  const relatedEntries = getRelatedEntries(entry);
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
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <Button onClick={() => navigate('/')} variant="ghost" className="text-muted-brown hover:text-ink-blue hover:bg-sepia/20 font-inter">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Diary
          </Button>
          
          <nav className="text-sm font-inter text-soft-gray">
            <span className="hover:text-ink-blue cursor-pointer transition-colors" onClick={() => navigate('/')}>
              Home
            </span>
            <span className="mx-2 text-muted-brown/50">•</span>
            <span className="text-muted-brown">Entry</span>
            <span className="mx-2 text-muted-brown/50">•</span>
            <span className="text-ink-blue font-medium">{entry.title}</span>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-4 gap-16">
        {/* Main Content */}
        <article className="lg:col-span-3 space-y-10">
          {/* Entry Header */}
          <header className="space-y-8 pb-10 border-b border-muted-brown/15">
            <div className="flex items-center gap-6 text-sm font-inter text-muted-brown">
              <time dateTime={entry.createdAt} className="tracking-wide">{entry.date}</time>
              <Badge variant="outline" className={`${getMoodColor(entry.mood)} px-4 py-1`}>
                {entry.mood}
              </Badge>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="tracking-wide">{entry.readTime}</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-garamond font-medium text-ink-blue leading-tight drop-cap">
              {entry.title}
            </h1>
            
            <p className="text-2xl font-garamond text-soft-gray leading-relaxed italic handwritten">
              {entry.excerpt}
            </p>
          </header>

          {/* Entry Image */}
          {entry.imageUrl && (
            <div className="mb-8">
              <img src={entry.imageUrl} alt={entry.title} className="w-full h-auto rounded-lg shadow-md" />
            </div>
          )}

          {/* Entry Content */}
          <div className="prose prose-lg max-w-none font-garamond text-soft-gray">
            {entry.content}
          </div>

          {/* Entry Footer */}
          <footer className="pt-10 space-y-8">
            <div className="ornamental-divider"></div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-3 items-center">
              <Tag className="w-5 h-5 text-muted-brown" />
              {entry.tags.map(tag => <Badge key={tag} variant="outline" className="border-muted-brown/30 text-muted-brown hover:bg-sepia/20 px-3 py-1 font-inter text-sm">
                  {tag}
                </Badge>)}
            </div>

            {/* Entry Stats */}
            <div className="flex items-center gap-8 text-sm font-inter text-soft-gray">
              <span className="tracking-wide">{entry.wordCount} words</span>
              <span className="tracking-wide">Published {new Date(entry.createdAt).toLocaleDateString()}</span>
            </div>
          </footer>
        </article>

        {/* Sidebar */}
        <aside className="space-y-10">
          {/* Related Entries */}
          {relatedEntries.length > 0 && <div className="space-y-6">
              <h3 className="text-xl font-garamond font-medium text-ink-blue elegant-heading">
                You Might Also Resonate With
              </h3>
              <div className="space-y-6">
                {relatedEntries.map(relatedEntry => <Card key={relatedEntry.id} className="vintage-card hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => navigate(`/entry/${relatedEntry.slug}`)}>
                    <CardContent className="p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-inter text-muted-brown tracking-wide">
                          {relatedEntry.date}
                        </span>
                        <Badge variant="outline" className={`${getMoodColor(relatedEntry.mood)} text-xs`}>
                          {relatedEntry.mood}
                        </Badge>
                      </div>
                      <h4 className="font-garamond font-medium text-ink-blue leading-tight group-hover:text-forest-green transition-colors">
                        {relatedEntry.title}
                      </h4>
                      <p className="text-sm font-garamond text-soft-gray leading-relaxed">
                        {relatedEntry.excerpt.substring(0, 100)}...
                      </p>
                    </CardContent>
                  </Card>)}
              </div>
            </div>}

          {/* Reading Stats */}
          <Card className="vintage-card border-muted-brown/20">
            <CardContent className="p-8 space-y-4">
              <h3 className="font-garamond font-medium text-ink-blue text-lg">About This Entry</h3>
              <div className="space-y-3 text-sm font-inter">
                <div className="flex justify-between">
                  <span className="text-soft-gray tracking-wide">Reading time:</span>
                  <span className="text-muted-brown font-medium">{entry.readTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-soft-gray tracking-wide">Word count:</span>
                  <span className="text-muted-brown font-medium">{entry.wordCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-soft-gray tracking-wide">Mood:</span>
                  <span className="text-muted-brown font-medium">{entry.mood}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-soft-gray tracking-wide">Topics:</span>
                  <span className="text-muted-brown font-medium">{entry.tags.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>;
};

export default Entry;
