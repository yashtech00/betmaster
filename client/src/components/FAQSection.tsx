import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const faqs: FAQ[] = [
    {
      question: "What is opinion trading?",
      answer: "Opinion trading is a way to predict outcomes of future events by buying shares in possible outcomes. If your prediction is correct, you earn rewards based on the odds at the time of your trade."
    },
    {
      question: "How do I get started on Probo?",
      answer: "Download the Probo app from the App Store or Google Play, sign up with your mobile number, and you'll receive 1000 free Probo coins to start trading immediately."
    },
    {
      question: "Is it legal to trade opinions in India?",
      answer: "Yes, Probo operates within the legal framework of India. We don't facilitate real money gambling but instead use a virtual currency system for trading opinions."
    },
    {
      question: "How do I earn real rewards?",
      answer: "You earn Probo coins by making correct predictions. These coins can be exchanged for various rewards including gift cards, exclusive merchandise, and experiences within the app."
    },
    {
      question: "What happens if my prediction is wrong?",
      answer: "If your prediction is incorrect, you lose the Probo coins you invested in that particular trade. But don't worry, you can always earn more coins by making correct predictions in other markets."
    },
    {
      question: "What types of markets can I trade on?",
      answer: "Probo offers markets across various categories including politics, sports, entertainment, technology, finance, and more. New markets are added regularly based on current events and user interests."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-foreground/70">
            Get answers to the most common questions about Probo and opinion trading.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="mb-4 glass-card overflow-hidden transition-all duration-300"
            >
              <button
                className="w-full p-6 text-left flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-medium">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-primary" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-primary" />
                )}
              </button>
              
              <div 
                className={`px-6 transition-all duration-300 overflow-hidden ${
                  openIndex === index ? "max-h-96 pb-6" : "max-h-0"
                }`}
              >
                <p className="text-foreground/70">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;