
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

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-garamond font-medium text-ink-blue mb-4">
            Recent Entries
          </h2>
          <p className="text-lg font-garamond text-soft-gray max-w-2xl mx-auto mb-8">
            Glimpses into recent thoughts, observations, and quiet revelations
          </p>
          <Button 
            onClick={() => navigate('/entries')}
            variant="outline"
            className="border-muted-brown text-muted-brown hover:bg-sepia/20 hover:text-ink-blue"
          >
            View All Entries
          </Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {entries.map((entry, index) => (
            <Card 
              key={entry.id} 
              className="bg-cream/50 border-muted-brown/20 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => handleEntryClick(entry.slug)}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-inter text-muted-brown">
                    {entry.date}
                  </p>
                  <Badge variant="secondary" className={getMoodColor(entry.mood)}>
                    {entry.mood}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-garamond font-medium text-ink-blue leading-tight">
                  {entry.title}
                </h3>
                
                <p className="text-soft-gray font-garamond leading-relaxed">
                  {entry.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-inter text-muted-brown">
                    {entry.readTime}
                  </span>
                  <span className="text-sm font-inter text-forest-green hover:underline">
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
