import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Choose a market",
      description: "Browse through various prediction markets across politics, sports, entertainment and more."
    },
    {
      number: "02",
      title: "Analyze the odds",
      description: "Review the current odds, community sentiment, and historical data before making your decision."
    },
    {
      number: "03",
      title: "Back your opinion",
      description: "Put your Probo coins behind your prediction – Yes or No – based on your knowledge and research."
    },
    {
      number: "04",
      title: "Collect rewards",
      description: "When the event outcome is determined, collect your rewards if your prediction was correct."
    }
  ];
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-gradient-to-b from-background to-background/95 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="text-gradient">Probo</span> Works
          </h2>
          <p className="text-foreground/70">
            Probo makes opinion trading simple. Follow these steps to start trading and earning rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="glass-card p-6 relative">
              <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-background border border-white/10 flex items-center justify-center">
                <span className="text-primary font-bold">{step.number}</span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-foreground/70 text-sm">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 -mr-3 transform translate-x-full">
                  <ArrowRight className="h-6 w-6 text-primary/50" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center glass-card p-8">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-4">Ready to put your knowledge to the test?</h3>
            <p className="text-foreground/70 mb-6">
              Start trading with 1000 free Probo coins when you sign up today. Join India's biggest prediction community.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button>
                Sign Up Now
              </Button>
              <Button variant="outline">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="w-full max-w-xs aspect-[9/16] glass-card overflow-hidden">
              <div className="p-4 border-b border-white/10 flex justify-between items-center">
                <div className="h-2 w-10 rounded-full bg-primary"></div>
                <div className="h-6 w-6 rounded-full bg-white/10"></div>
              </div>
              <div className="p-4 space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 bg-white/5 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;