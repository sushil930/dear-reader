import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth, IEntry } from "@/context/AuthContext";

const RecentEntries: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [entries, setEntries] = useState<IEntry[]>([]);

  useEffect(() => {
    if (user?.entries && user.entries.length > 0) {
      const sorted = [...user.entries]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);
      setEntries(sorted);
    } else {
      const fetchRecent = async () => {
        try {
          const response = await axios.get('/api/entries/recent');
          setEntries(response.data);
        } catch (error) {
          console.error('Error fetching public recent entries:', error);
        }
      };
      fetchRecent();
    }
  }, [user]);

  const getMoodColor = (mood?: string) => {
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

  const handleEntryClick = (slug: string) => {
    navigate(`/entry/${slug}`);
  };

  return (
    <section id="recent-entries" className="pt-12 md:pt-20 pb-16 px-6 relative">
      {/* Decorative ink blots */}
      <div className="ink-blot absolute top-8 left-12 opacity-20"></div>
      <div className="ink-blot absolute top-24 right-16 opacity-15"></div>
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="elegant-heading text-4xl md:text-5xl font-garamond font-medium text-ink-blue mb-6">
            Recent Entries
          </h2>
          <p className="text-xl font-garamond text-center text-soft-gray max-w-2xl mx-auto mb-10 leading-relaxed">
            {user ? "Glimpses into your recent thoughts" : "Glimpses into recent thoughts"}
          </p>
          <Button 
            onClick={() => user ? navigate('/profile') : navigate('/entries')}
            variant="outline"
            className="vintage-button border-muted-brown text-muted-brown hover:bg-sepia/20 hover:text-muted-brown px-8 py-3 rounded-full font-inter font-medium"
          >
            View All Entries
          </Button>
        </div>
        
        <div className="ornamental-divider mb-12"></div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {entries.map((entry, index) => (
            <Card 
              key={entry.id} 
              className="vintage-card cursor-pointer group"
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => handleEntryClick(entry.slug)}
            >
              <CardContent className="p-6 md:p-8 flex flex-col h-full text-left">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-inter text-muted-brown tracking-wide">
                    {entry.date}
                  </p>
                  <Badge variant="outline" className={`${getMoodColor(entry.mood)} font-inter text-xs px-3 py-1`}>
                    {entry.mood || "N/A"}
                  </Badge>
                </div>
                
                <h3 className="text-2xl font-garamond font-medium text-ink-blue leading-tight">
                  {entry.title}
                </h3>
                
                <p className="text-center text-soft-gray font-garamond leading-relaxed text-base text-justify flex-grow">
                  {entry.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-muted-brown/10">
                  <span className="text-sm font-inter text-muted-brown tracking-wide">
                    {entry.readTime && `${entry.readTime} min read`}
                  </span>
                  <span className="text-sm font-inter text-forest-green">
                    Open Entry →
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentEntries;
