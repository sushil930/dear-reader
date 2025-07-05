

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const Subscribe = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-cream/50 border-muted-brown/20">
          <CardContent className="p-6 sm:p-8 md:p-12 text-center space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-garamond font-medium text-ink-blue px-4">
              Stay Connected
            </h2>
            
            <p className="text-base sm:text-lg font-garamond text-soft-gray max-w-2xl mx-auto leading-relaxed px-4">
              Get notified when a new entry is added to the diary. 
              No noise, no clutter—just gentle reminders for quiet souls.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto px-4">
              <Input 
                type="email" 
                placeholder="your.email@example.com" 
                className="font-inter bg-cream border-muted-brown/30 focus:border-forest-green h-12 text-base"
              />
              <Button 
                className="bg-forest-green hover:bg-forest-green/90 text-cream font-inter font-medium whitespace-nowrap h-12 px-6 min-h-[48px]"
              >
                Subscribe
              </Button>
            </div>
            
            <p className="text-xs sm:text-sm font-inter text-muted-brown px-4">
              Or <span className="underline cursor-pointer hover:text-forest-green transition-colors min-h-[44px] inline-flex items-center">write to me</span> directly
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Subscribe;

