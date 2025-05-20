import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-lg border-b border-white/10"
          : "py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-2">
              <div className="h-9 w-9 rounded-full bg-primary glow flex items-center justify-center">
                <span className="font-bold text-lg text-primary-foreground">P</span>
              </div>
              <span className="text-xl font-bold">Probo</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-sm text-foreground/80 hover:text-primary transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-foreground/80 hover:text-primary transition-colors">
              How it works
            </a>
            <a href="#community" className="text-sm text-foreground/80 hover:text-primary transition-colors">
              Community
            </a>
            <a href="#faq" className="text-sm text-foreground/80 hover:text-primary transition-colors">
              FAQ
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" size="sm">
              Log in
            </Button>
            <Button size="sm">Get Started</Button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-white/10 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <a href="#features" className="text-sm text-foreground/80 hover:text-primary transition-colors py-2">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-foreground/80 hover:text-primary transition-colors py-2">
              How it works
            </a>
            <a href="#community" className="text-sm text-foreground/80 hover:text-primary transition-colors py-2">
              Community
            </a>
            <a href="#faq" className="text-sm text-foreground/80 hover:text-primary transition-colors py-2">
              FAQ
            </a>
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="outline" size="sm">
                Log in
              </Button>
              <Button size="sm">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;