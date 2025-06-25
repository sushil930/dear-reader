
import { Feather } from "lucide-react";

const AuthorSection = () => {
  return (
    <section className="py-20 px-6 bg-sepia/30">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="flex justify-center mb-6">
          <Feather size={32} className="text-muted-brown" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-garamond font-medium text-ink-blue">
          A Note From the Author
        </h2>
        
        <div className="max-w-3xl mx-auto space-y-6 text-lg font-garamond leading-relaxed text-soft-gray">
          <p className="handwritten text-xl text-ink-blue">
            "Dear friend,"
          </p>
          
          <p>
            I started this diary because my thoughts needed a home. Maybe yours do too. 
            In a world that moves too fast and speaks too loud, I found myself craving 
            a place for the quiet observations, the gentle questions, the moments of 
            stillness that hold so much meaning.
          </p>
          
          <p>
            This is for the overthinkers, the deep feelers, the ones who find poetry 
            in psychology and wisdom in their wounds. If you've ever felt too much, 
            thought too deeply, or wondered if anyone else sees the world the way you do—
            this diary is for you.
          </p>
          
          <p className="handwritten text-muted-brown">
            "With gentle thoughts and steady presence,"
          </p>
        </div>
      </div>
    </section>
  );
};

export default AuthorSection;
