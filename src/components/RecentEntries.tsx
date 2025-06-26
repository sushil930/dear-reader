
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { sampleEntries } from "@/data/entries";

const RecentEntries = () => {
  const navigate = useNavigate();
  
  // Use the sample entries from our data
  const entries = sampleEntries;

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

  const handleEntryClick = (slug: string) => {
    navigate(`/entry/${slug}`);
  };

  return (
    <section className="py-24 px-6 relative">
      {/* Decorative ink blots */}
      <div className="ink-blot absolute top-12 left-12 opacity-20"></div>
      <div className="ink-blot absolute top-32 right-16 opacity-15"></div>
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="elegant-heading text-4xl md:text-5xl font-garamond font-medium text-ink-blue mb-6">
            Recent Entries
          </h2>
          <p className="text-xl font-garamond text-soft-gray max-w-2xl mx-auto mb-10 leading-relaxed">
            Glimpses into recent thoughts, observations, and quiet revelations
          </p>
          <Button 
            onClick={() => navigate('/entries')}
            variant="outline"
            className="vintage-button border-muted-brown text-muted-brown hover:bg-sepia/20 hover:text-ink-blue px-8 py-3 rounded-full font-inter font-medium"
          >
            View All Entries
          </Button>
        </div>
        
        <div className="ornamental-divider mb-16"></div>
        
        <div className="grid md:grid-cols-3 gap-10">
          {entries.map((entry, index) => (
            <Card 
              key={entry.id} 
              className="vintage-card hover:shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer group"
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => handleEntryClick(entry.slug)}
            >
              <CardContent className="p-8 space-y-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-inter text-muted-brown tracking-wide">
                    {entry.date}
                  </p>
                  <Badge variant="outline" className={`${getMoodColor(entry.mood)} font-inter text-xs px-3 py-1`}>
                    {entry.mood}
                  </Badge>
                </div>
                
                <h3 className="text-2xl font-garamond font-medium text-ink-blue leading-tight group-hover:text-forest-green transition-colors duration-300">
                  {entry.title}
                </h3>
                
                <p className="text-soft-gray font-garamond leading-relaxed text-base text-justify">
                  {entry.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-muted-brown/10">
                  <span className="text-sm font-inter text-muted-brown tracking-wide">
                    {entry.readTime}
                  </span>
                  <span className="text-sm font-inter text-forest-green group-hover:underline transition-all duration-300">
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
