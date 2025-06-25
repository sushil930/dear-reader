
const AboutDiary = () => {
  return (
    <section className="py-20 px-6 bg-sepia/30">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-garamond font-medium text-ink-blue">
          About This Diary
        </h2>
        
        <div className="space-y-6 text-lg font-garamond leading-relaxed text-soft-gray">
          <p className="max-w-3xl mx-auto">
            This is not a blog. This is not a magazine. This is a diary—one that exists 
            in the liminal space between private thoughts and shared understanding.
          </p>
          
          <p className="max-w-3xl mx-auto">
            Here, we explore the psychology of being human: the weight of overthinking, 
            the beauty of emotional awareness, and the gentle art of self-reflection. 
            These are the thoughts that visit us at 2 AM, the observations we make in 
            quiet moments, the patterns we notice in our minds.
          </p>
          
          <p className="max-w-2xl mx-auto italic text-muted-brown">
            "For those who feel deeply, think carefully, and wonder often."
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutDiary;
