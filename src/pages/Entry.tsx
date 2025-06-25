
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { getEntryBySlug, getRelatedEntries } from "@/data/entries";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Entry = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const entry = slug ? getEntryBySlug(slug) : null;
  
  if (!entry) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-garamond text-ink-blue">Entry Not Found</h1>
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="border-muted-brown text-muted-brown hover:bg-sepia/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Diary
          </Button>
        </div>
      </div>
    );
  }

  const relatedEntries = getRelatedEntries(entry);

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "Reflective":
        return "bg-forest-green/20 text-forest-green";
      case "Nostalgic":
        return "bg-muted-brown/20 text-muted-brown";
      case "Still":
        return "bg-ink-blue/20 text-ink-blue";
      default:
        return "bg-soft-gray/20 text-soft-gray";
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Navigation Header */}
      <header className="border-b border-muted-brown/20 bg-cream/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button 
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-muted-brown hover:text-ink-blue hover:bg-sepia/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Diary
          </Button>
          
          <nav className="text-sm font-inter text-soft-gray">
            <span className="hover:text-ink-blue cursor-pointer" onClick={() => navigate('/')}>
              Home
            </span>
            <span className="mx-2">/</span>
            <span className="text-muted-brown">Entry</span>
            <span className="mx-2">/</span>
            <span className="text-ink-blue">{entry.title}</span>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-4 gap-12">
        {/* Main Content */}
        <article className="lg:col-span-3 space-y-8">
          {/* Entry Header */}
          <header className="space-y-6 pb-8 border-b border-muted-brown/10">
            <div className="flex items-center gap-4 text-sm font-inter text-muted-brown">
              <time dateTime={entry.createdAt}>{entry.date}</time>
              <Badge variant="secondary" className={getMoodColor(entry.mood)}>
                {entry.mood}
              </Badge>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{entry.readTime}</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-garamond font-medium text-ink-blue leading-tight">
              {entry.title}
            </h1>
            
            <p className="text-xl font-garamond text-soft-gray leading-relaxed italic">
              {entry.excerpt}
            </p>
          </header>

          {/* Entry Content */}
          <div className="prose prose-lg max-w-none">
            <div className="journal-lines paper-texture p-8 rounded-lg shadow-sm">
              <div className="font-garamond text-lg leading-relaxed text-ink-blue whitespace-pre-line">
                {entry.content}
              </div>
            </div>
          </div>

          {/* Entry Footer */}
          <footer className="pt-8 border-t border-muted-brown/10 space-y-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <Tag className="w-4 h-4 text-muted-brown" />
              {entry.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="border-muted-brown/30 text-muted-brown hover:bg-sepia/20"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Entry Stats */}
            <div className="flex items-center gap-6 text-sm font-inter text-soft-gray">
              <span>{entry.wordCount} words</span>
              <span>Published {new Date(entry.createdAt).toLocaleDateString()}</span>
            </div>
          </footer>
        </article>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Related Entries */}
          {relatedEntries.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-garamond font-medium text-ink-blue">
                You Might Also Resonate With
              </h3>
              <div className="space-y-4">
                {relatedEntries.map((relatedEntry) => (
                  <Card 
                    key={relatedEntry.id}
                    className="bg-cream/50 border-muted-brown/20 hover:shadow-md transition-all duration-300 cursor-pointer"
                    onClick={() => navigate(`/entry/${relatedEntry.slug}`)}
                  >
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-inter text-muted-brown">
                          {relatedEntry.date}
                        </span>
                        <Badge variant="secondary" className={getMoodColor(relatedEntry.mood)}>
                          {relatedEntry.mood}
                        </Badge>
                      </div>
                      <h4 className="font-garamond font-medium text-ink-blue leading-tight">
                        {relatedEntry.title}
                      </h4>
                      <p className="text-sm font-garamond text-soft-gray leading-relaxed">
                        {relatedEntry.excerpt.substring(0, 100)}...
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Reading Stats */}
          <Card className="bg-sepia/20 border-muted-brown/20">
            <CardContent className="p-6 space-y-3">
              <h3 className="font-garamond font-medium text-ink-blue">About This Entry</h3>
              <div className="space-y-2 text-sm font-inter">
                <div className="flex justify-between">
                  <span className="text-soft-gray">Reading time:</span>
                  <span className="text-muted-brown">{entry.readTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-soft-gray">Word count:</span>
                  <span className="text-muted-brown">{entry.wordCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-soft-gray">Mood:</span>
                  <span className="text-muted-brown">{entry.mood}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-soft-gray">Topics:</span>
                  <span className="text-muted-brown">{entry.tags.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
};

export default Entry;
