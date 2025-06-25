
import Hero from "@/components/Hero";
import AboutDiary from "@/components/AboutDiary";
import RecentEntries from "@/components/RecentEntries";
import Topics from "@/components/Topics";
import Quotes from "@/components/Quotes";
import AuthorSection from "@/components/AuthorSection";
import Subscribe from "@/components/Subscribe";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-cream">
      <Hero />
      <AboutDiary />
      <RecentEntries />
      <Topics />
      <Quotes />
      <AuthorSection />
      <Subscribe />
      <Footer />
    </div>
  );
};

export default Index;
