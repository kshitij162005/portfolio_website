import { useState, useEffect } from "react";
import { Menu, X, Terminal, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Experience", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-3" : "py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <Terminal className="w-5 h-5 text-primary" />
          <span className="font-semibold">KK</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
            >
              {link.label}
            </button>
          ))}
          <Button
            size="sm"
            variant="outline"
            className="ml-2 border-primary/30 hover:border-primary hover:bg-primary/10"
            asChild
          >
            <a href="/Kshitij_Kotecha_Resume.pdf" download="Kshitij_Kotecha_Resume.pdf">
              <Download className="w-4 h-4 mr-2" />
              Resume
            </a>
          </Button>
          <Button
            size="sm"
            className="ml-2"
            onClick={() => scrollToSection("#contact")}
          >
            Hire Me
          </Button>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass mt-2 mx-4 rounded-lg p-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="block w-full text-left px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
            >
              {link.label}
            </button>
          ))}
          <Button
            variant="outline"
            className="w-full mt-2 border-primary/30 hover:border-primary hover:bg-primary/10"
            asChild
          >
            <a href="/Kshitij_Kotecha_Resume.pdf" download="Kshitij_Kotecha_Resume.pdf">
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </a>
          </Button>
          <Button
            className="w-full mt-2"
            onClick={() => scrollToSection("#contact")}
          >
            Hire Me
          </Button>
        </div>
      )}
    </nav>
  );
}
