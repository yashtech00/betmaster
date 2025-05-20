import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-16 md:py-20 border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="h-9 w-9 rounded-full bg-primary glow flex items-center justify-center">
                <span className="font-bold text-lg text-primary-foreground">P</span>
              </div>
              <span className="text-xl font-bold ml-2">Probo</span>
            </div>
            <p className="text-foreground/60 mb-6 max-w-md">
              India's biggest opinion trading platform. Trade your knowledge, earn rewards, and join the prediction revolution.
            </p>
            <div className="flex space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <a
                  key={i}
                  href="#"
                  className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center"
                >
                  <span className="text-xs">{i}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              {["Features", "Markets", "Rewards", "Leaderboard", "Probo Pro"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-foreground/60 hover:text-primary transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {["About Us", "Careers", "Press", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-foreground/60 hover:text-primary transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              {["Terms of Service", "Privacy Policy", "Cookie Policy", "Guidelines", "FAQ"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-foreground/60 hover:text-primary transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/60 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Probo. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5 text-primary" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;