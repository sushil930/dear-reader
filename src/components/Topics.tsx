
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
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-sepia/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-garamond font-medium text-ink-blue mb-3 sm:mb-4 px-4">
            Topics We Write About
          </h2>
          <p className="text-base sm:text-lg font-garamond text-soft-gray max-w-2xl mx-auto px-4">
            Themes that weave through our thoughts and find their way onto these pages
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {topics.map((topic, index) => (
            <div 
              key={topic.title}
              className="text-center space-y-3 sm:space-y-4 p-4 sm:p-6 rounded-lg hover:bg-cream/50 transition-all duration-300 cursor-pointer group min-h-[120px] flex flex-col justify-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-center">
                <topic.icon 
                  size={28} 
                  className="text-muted-brown group-hover:text-forest-green transition-colors duration-300 sm:w-8 sm:h-8" 
                />
              </div>
              <h3 className="text-lg sm:text-xl font-garamond font-medium text-ink-blue">
                {topic.title}
              </h3>
              <p className="text-center text-soft-gray font-garamond text-sm sm:text-base leading-relaxed px-2">
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
