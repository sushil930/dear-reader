

import { Feather } from "lucide-react";

const AuthorSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-sepia/30">
      <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
        <div className="flex justify-center mb-4 sm:mb-6">
          <Feather size={28} className="text-muted-brown sm:w-8 sm:h-8" />
        </div>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-garamond font-medium text-ink-blue px-4">
          A Note From the Author
        </h2>
        
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 text-base sm:text-lg font-garamond leading-relaxed text-soft-gray">
          <p className="handwritten text-lg sm:text-xl text-ink-blue px-4">
            "Dear friend,"
          </p>
          
          <p className="px-4">
            I started this diary because my thoughts needed a home. Maybe yours do too. 
            In a world that moves too fast and speaks too loud, I found myself craving 
            a place for the quiet observations, the gentle questions, the moments of 
            stillness that hold so much meaning.
          </p>
          
          <p className="px-4">
            This is for the overthinkers, the deep feelers, the ones who find poetry 
            in psychology and wisdom in their wounds. If you've ever felt too much, 
            thought too deeply, or wondered if anyone else sees the world the way you do—
            this diary is for you.
          </p>
          
          <p className="handwritten text-muted-brown px-4">
            "With gentle thoughts and steady presence,"
          </p>
        </div>
      </div>
    </section>
  );
};

export default AuthorSection;

