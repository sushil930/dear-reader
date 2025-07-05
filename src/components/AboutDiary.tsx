

const AboutDiary = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-sepia/30">
      <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-garamond font-medium text-ink-blue px-4">
          About This Diary
        </h2>
        
        <div className="space-y-4 sm:space-y-6 text-base sm:text-lg font-garamond leading-relaxed text-soft-gray">
          <p className="max-w-3xl mx-auto px-4">
            This is not a blog. This is not a magazine. This is a diary—one that exists 
            in the liminal space between private thoughts and shared understanding.
          </p>
          
          <p className="max-w-3xl mx-auto px-4">
            Here, we explore the psychology of being human: the weight of overthinking, 
            the beauty of emotional awareness, and the gentle art of self-reflection. 
            These are the thoughts that visit us at 2 AM, the observations we make in 
            quiet moments, the patterns we notice in our minds.
          </p>
          
          <p className="max-w-2xl mx-auto italic text-muted-brown px-4">
            "For those who feel deeply, think carefully, and wonder often."
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutDiary;

