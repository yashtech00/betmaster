import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden hero-gradient">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-1.5 mb-6 rounded-full border border-white/10 bg-white/5 text-xs font-medium">
              🎉 <span className="ml-2 text-primary">India's #1 Opinion Trading Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight lg:leading-tight mb-6">
              <span className="text-gradient">Trade</span> Your Opinions, <br />
              <span className="text-gradient">Earn</span> Real Rewards
            </h1>
            
            <p className="text-lg text-foreground/70 mb-8 max-w-xl mx-auto lg:mx-0">
              Join millions of Indians predicting outcomes across politics, sports, entertainment and more. Back your knowledge with Probo coins and earn real rewards.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explore Markets
              </Button>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-foreground/60">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                <span>1M+ Users</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                <span>4.8/5 Rating</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                <span>10Cr+ Opinions Traded</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="relative aspect-[4/5] w-full max-w-[320px] mx-auto">
              <div className="absolute inset-0 glow opacity-20"></div>
              <div className="glass-card h-full w-full overflow-hidden flex items-center justify-center p-2">
                <div className="bg-background rounded-lg w-full h-full overflow-hidden flex flex-col">
                  <div className="p-4 border-b border-white/5">
                    <h3 className="font-medium text-foreground">Will BJP win 2024 elections?</h3>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-foreground/60">Current odds</span>
                      <span className="text-sm font-medium text-primary">₹1.38</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Yes (72%)</span>
                          <span className="text-primary">↑ 3.2%</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full w-[72%]"></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>No (28%)</span>
                          <span className="text-destructive">↓ 3.2%</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-destructive rounded-full w-[28%]"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-2 gap-2">
                      <button className="py-2 px-4 rounded-lg bg-primary text-primary-foreground font-medium text-sm">
                        Yes
                      </button>
                      <button className="py-2 px-4 rounded-lg bg-white/5 border border-white/10 text-foreground font-medium text-sm">
                        No
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-white/10"></div>
                      <span className="text-xs">12,498 traders</span>
                    </div>
                    <span className="text-xs text-primary">View market</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 w-32 h-32 rotate-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 -rotate-12 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-xl blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
