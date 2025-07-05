

const Quotes = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-garamond font-medium text-ink-blue mb-3 sm:mb-4 px-4">
            Words That Stay With Us
          </h2>
        </div>
        
        <div className="space-y-8 sm:space-y-12">
          <blockquote className="text-center space-y-3 sm:space-y-4 p-6 sm:p-8 bg-cream/30 rounded-lg border-l-4 border-forest-green">
            <p className="text-lg sm:text-xl md:text-2xl font-garamond italic text-ink-blue leading-relaxed px-4">
              "Until you make the unconscious conscious, it will direct your life and you will call it fate."
            </p>
            <cite className="text-muted-brown font-inter text-xs sm:text-sm">
              — Carl Jung
            </cite>
          </blockquote>
          
          <blockquote className="text-center space-y-3 sm:space-y-4 p-6 sm:p-8 bg-sepia/20 rounded-lg border-l-4 border-muted-brown">
            <p className="text-lg sm:text-xl md:text-2xl font-garamond italic text-ink-blue leading-relaxed px-4">
              "The privilege of a lifetime is to become who you truly are."
            </p>
            <cite className="text-muted-brown font-inter text-xs sm:text-sm">
              — Carl Jung
            </cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Quotes;

