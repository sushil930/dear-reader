
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RecentEntries = () => {
  const entries = [
    {
      id: 1,
      date: "June 25, 2025",
      title: "The Noise Outside",
      mood: "Reflective",
      excerpt: "Sometimes the world feels too loud, and I wonder if the noise is outside or within...",
      readTime: "4 min read"
    },
    {
      id: 2,
      date: "June 22, 2025",
      title: "On Feeling Everything",
      mood: "Nostalgic",
      excerpt: "There's a particular ache that comes with feeling too much, too often...",
      readTime: "6 min read"
    },
    {
      id: 3,
      date: "June 20, 2025",
      title: "The Space Between Thoughts",
      mood: "Still",
      excerpt: "In the quiet moments between one thought and the next, I found something unexpected...",
      readTime: "3 min read"
    }
  ];

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
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-garamond font-medium text-ink-blue mb-4">
            Recent Entries
          </h2>
          <p className="text-lg font-garamond text-soft-gray max-w-2xl mx-auto">
            Glimpses into recent thoughts, observations, and quiet revelations
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {entries.map((entry, index) => (
            <Card 
              key={entry.id} 
              className="bg-cream/50 border-muted-brown/20 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{ animationDelay: `${index * 0.2}s` }}
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
