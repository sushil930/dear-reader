import { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth, IEntry } from "@/context/AuthContext";
import axios from 'axios';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import VintageLoading from "@/components/ui/vintage-loading";

const Entries = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [entries, setEntries] = useState<IEntry[]>([]);

  useEffect(() => {
    if (user && user.entries) {
      setEntries(user.entries);
    } else {
      const fetchEntries = async () => {
        try {
          const response = await axios.get('/api/entries/all');
          setEntries(response.data);
        } catch (error) {
          console.error('Error fetching all entries:', error);
        }
      };
      fetchEntries();
    }
  }, [user]);

  

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const topicParam = queryParams.get('topic');
    if (topicParam) {
      setSelectedTopic(topicParam);
    }
  }, [location.search]);

  // Get all unique topics from entries
  const allTopics = useMemo(() => {
    const topics = new Set<string>();
    entries.forEach(entry => {
      entry.tags.forEach(tag => topics.add(tag));
    });
    return Array.from(topics).sort();
  }, [entries]);

  // Filter entries based on selected topic
  const filteredEntries = useMemo(() => {
    if (selectedTopic === "all") {
      return entries;
    }
    return entries.filter(entry => entry.tags.includes(selectedTopic));
  }, [selectedTopic, entries]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <VintageLoading message="Gathering your diary entries..." size="lg" />
      </div>
    );
  }

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

  const handleEntryClick = (slug: string) => {
    navigate(`/entry/${slug}`);
  };

  const clearFilter = () => {
    setSelectedTopic("all");
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="border-b border-muted-brown/20 bg-cream/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
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
            <span className="text-ink-blue">All Entries</span>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-garamond font-medium text-ink-blue mb-4">
            All Diary Entries
          </h1>
          <p className="text-xl font-garamond text-soft-gray leading-relaxed italic max-w-2xl mx-auto">
            A collection of thoughts, reflections, and quiet revelations from the depths of contemplation
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-brown" />
              <span className="text-sm font-inter text-muted-brown">Filter by topic:</span>
            </div>
            
            <Select value={selectedTopic} onValueChange={setSelectedTopic}>
              <SelectTrigger className="w-48 border-muted-brown/30 text-ink-blue">
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Topics</SelectItem>
                {allTopics.map((topic) => (
                  <SelectItem key={topic} value={topic}>
                    {topic}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedTopic !== "all" && (
              <Button
                onClick={clearFilter}
                variant="ghost"
                size="sm"
                className="text-muted-brown hover:text-ink-blue"
              >
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </div>

          <div className="text-sm font-inter text-soft-gray">
            {filteredEntries.length} {filteredEntries.length === 1 ? 'entry' : 'entries'} found
          </div>
        </div>

        {/* Active Filter Display */}
        {selectedTopic !== "all" && (
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-inter text-soft-gray">Showing entries about:</span>
              <Badge 
                variant="outline" 
                className="border-muted-brown/30 text-muted-brown bg-sepia/20"
              >
                {selectedTopic}
              </Badge>
            </div>
          </div>
        )}

        {/* Entries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEntries.map((entry, index) => (
            <Card 
              key={entry.id} 
              className="bg-cream/50 border-muted-brown/20 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleEntryClick(entry.slug)}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-inter text-muted-brown">
                    {entry.date} · {entry.author?.name}
                  </p>
                  <Badge variant="secondary" className={getMoodColor(entry.mood)}>
                    {entry.mood}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-garamond font-medium text-ink-blue leading-tight group-hover:text-forest-green transition-colors">
                  {entry.title}
                </h3>
                
                <p className="text-soft-gray font-garamond leading-relaxed text-sm">
                  {entry.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {entry.tags.slice(0, 3).map((tag) => (
                    <Badge 
                      key={tag}
                      variant="outline" 
                      className="text-xs border-muted-brown/20 text-muted-brown/80 hover:bg-sepia/10 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click from firing
                        setSelectedTopic(tag);
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                  {entry.tags.length > 3 && (
                    <Badge 
                      variant="outline" 
                      className="text-xs border-muted-brown/20 text-muted-brown/60"
                    >
                      +{entry.tags.length - 3}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-inter text-muted-brown">
                    {entry.readTime}
                  </span>
                  <span className="text-sm font-inter text-forest-green group-hover:underline">
                    Read Entry →
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredEntries.length === 0 && (
          <div className="text-center py-12">
            <div className="space-y-4">
              <h3 className="text-xl font-garamond text-ink-blue">No entries found</h3>
              <p className="text-soft-gray font-garamond">
                No entries match the selected topic. Try selecting a different filter or view all entries.
              </p>
              <Button 
                onClick={clearFilter}
                variant="outline"
                className="border-muted-brown text-muted-brown hover:bg-sepia/20"
              >
                View All Entries
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Entries;
