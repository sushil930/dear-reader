import { Brain, Sprout, Cloud, Eye, BookOpen, Scroll } from "lucide-react";

const Topics = () => {
  const topics = [
    {
      icon: Brain,
      title: "Psychology",
      description: "The patterns of human behavior and thought"
    },
    {
      icon: Sprout,
      title: "Self-Improvement",
      description: "Growing into who we're meant to become"
    },
    {
      icon: Cloud,
      title: "Overthinking",
      description: "When thoughts become storms"
    },
    {
      icon: Eye,
      title: "Awareness",
      description: "Seeing ourselves clearly"
    },
    {
      icon: BookOpen,
      title: "Emotions",
      description: "The language of the heart"
    },
    {
      icon: Scroll,
      title: "Thought Experiments",
      description: "What if we looked at it differently?"
    }
  ];

  return (
    <section className="py-20 px-6 bg-sepia/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-garamond font-medium text-ink-blue mb-4">
            Topics We Write About
          </h2>
          <p className="text-lg font-garamond text-soft-gray max-w-2xl mx-auto">
            Themes that weave through our thoughts and find their way onto these pages
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic, index) => (
            <div 
              key={topic.title}
              className="text-center space-y-4 p-6 rounded-lg hover:bg-cream/50 transition-all duration-300 cursor-pointer group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-center">
                <topic.icon 
                  size={32} 
                  className="text-muted-brown group-hover:text-forest-green transition-colors duration-300" 
                />
              </div>
              <h3 className="text-xl font-garamond font-medium text-ink-blue">
                {topic.title}
              </h3>
              <p className="text-soft-gray font-garamond text-sm leading-relaxed">
                {topic.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Topics;
