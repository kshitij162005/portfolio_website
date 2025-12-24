import { useState, useEffect } from "react";
import { ChevronDown, Github, Linkedin, Mail, Terminal, Briefcase, MapPin, Database, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const roles = [
  "Backend-Heavy Full Stack Engineer",
  "Building Secure, Scalable Systems",
  "Django & Python Specialist",
  "Security-Focused Developer",
];

export function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [sqlTime, setSqlTime] = useState(0);
  const [redisTime, setRedisTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    if (isTyping) {
      if (displayText.length < role.length) {
        const timeout = setTimeout(() => {
          setDisplayText(role.slice(0, displayText.length + 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }
    }
  }, [displayText, isTyping, currentRole]);

  const startRace = () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setHasRun(true);
    setSqlTime(0);
    setRedisTime(0);
    
    // Simulate SQL query (slower - 120ms)
    const sqlInterval = setInterval(() => {
      setSqlTime((prev) => {
        if (prev >= 100) {
          clearInterval(sqlInterval);
          return 100;
        }
        return prev + Math.random() * 6 + 2;
      });
    }, 25);

    // Simulate Redis query (faster - 15ms)
    const redisInterval = setInterval(() => {
      setRedisTime((prev) => {
        if (prev >= 100) {
          clearInterval(redisInterval);
          setTimeout(() => setIsRunning(false), 1000);
          return 100;
        }
        return prev + Math.random() * 15 + 8;
      });
    }, 25);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden px-4 sm:px-6">
      {/* Background gradient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10 pt-16 sm:pt-8 lg:pt-0">
        {/* Terminal-style intro */}
        <div className="code-block p-3 sm:p-4 mb-6 sm:mb-8 max-w-2xl opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-destructive/70" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/70" />
            <span className="text-muted-foreground text-[10px] sm:text-xs ml-2 font-mono">~/kshitij-portfolio</span>
          </div>
          <div className="font-mono text-xs sm:text-sm">
            <span className="text-primary">$</span>{" "}
            <span className="text-muted-foreground">whoami</span>
          </div>
        </div>

        {/* Main content - Two column layout */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          {/* Left Column - Main Info */}
          <div className="space-y-4 sm:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
            <span className="text-foreground">Kshitij</span>{" "}
            <span className="text-gradient">Kotecha</span>
          </h1>

          {/* Current Position */}
          <div className="glass rounded-lg px-3 sm:px-5 py-3 sm:py-3.5 inline-flex items-center gap-2.5 sm:gap-3 border border-primary/30 hover:border-primary/50 transition-colors">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2.5">
                <span className="text-xs sm:text-sm font-semibold text-foreground">
                  Backend Engineer Intern
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1.5">
                    <span className="hidden sm:inline text-primary/70">@</span>
                    <span>Rolling Arrays</span>
                    <span className="hidden sm:inline text-muted-foreground/50">·</span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-primary/70" />
                      <span>Singapore (Remote)</span>
                    </span>
                  </span>
                  {/* Current Badge with blinking dot */}
                  <Badge 
                    variant="outline" 
                    className="border-primary/50 bg-primary/10 text-primary text-[10px] px-2 py-0.5 h-5 flex items-center gap-1.5"
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                    </span>
                    <span className="font-medium">Current</span>
                  </Badge>
                </span>
              </div>
              <div className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1.5">
                <span className="text-primary/70 font-medium">May 2025</span>
                <span className="text-muted-foreground/50">—</span>
                <span className="text-primary font-medium">Present</span>
              </div>
            </div>
          </div>

          <div className="h-10 sm:h-12 flex items-center">
            <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 sm:mr-3 flex-shrink-0" />
            <span className="text-base sm:text-xl md:text-2xl font-mono text-muted-foreground truncate">
              {displayText}
              <span className="border-r-2 border-primary animate-blink ml-1">&nbsp;</span>
            </span>
          </div>

          {/* Key stats */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-4 lg:gap-6 pt-2 sm:pt-4">
            <div className="glass rounded-lg px-3 sm:px-4 py-2.5 sm:py-3">
              <div className="text-xl sm:text-2xl font-bold text-gradient">10K+</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">Daily Transactions</div>
            </div>
            <div className="glass rounded-lg px-3 sm:px-4 py-2.5 sm:py-3">
              <div className="text-xl sm:text-2xl font-bold text-gradient">30%</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">Response Time Reduced</div>
            </div>
            <div className="glass rounded-lg px-3 sm:px-4 py-2.5 sm:py-3">
              <div className="text-xl sm:text-2xl font-bold text-gradient">99.9%</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">Data Integrity</div>
            </div>
            <div className="glass rounded-lg px-3 sm:px-4 py-2.5 sm:py-3">
              <div className="text-xl sm:text-2xl font-bold text-gradient">85%</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">Query Time Reduced</div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
            <Button 
              size="lg" 
              className="glow-primary w-full sm:w-auto"
              onClick={() => scrollToSection("projects")}
            >
              View Projects
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => scrollToSection("contact")}
            >
              Schedule a Call
            </Button>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4 pt-2 sm:pt-4">
            <a 
              href="https://github.com/kshitij162005" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/kshitij-kotecha-66a0231a2/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="mailto:kotechakshitij@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
          </div>

          {/* Right Column - Speed Test & Availability */}
          <div className="space-y-4 sm:space-y-6 mt-4 lg:mt-0">
            {/* Open to New Positions Badge */}
            <div className="glass rounded-xl p-4 sm:p-5 border border-secondary/30 hover:border-secondary/50 transition-colors">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs sm:text-sm">Availability</h3>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Open to new opportunities</p>
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className="border-secondary/50 bg-secondary/10 text-secondary text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 flex-shrink-0"
                >
                  Available
                </Badge>
              </div>
            </div>

            {/* Redis vs SQL Speed Test */}
            <div className="glass rounded-xl p-4 sm:p-5 border border-border/50">
              <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Database className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs sm:text-sm">Backend Speed Test</h3>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Redis vs SQL Race</p>
                  </div>
                </div>
                <Button
                  onClick={startRace}
                  disabled={isRunning}
                  size="sm"
                  variant="outline"
                  className="border-primary/50 hover:bg-primary/10 hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all text-xs px-2 sm:px-3 flex-shrink-0"
                >
                  <Zap className="w-3 h-3 mr-1.5" />
                  {isRunning ? 'Racing...' : 'Play'}
                </Button>
              </div>

              {/* Race Track */}
              <div className="space-y-4 sm:space-y-6">
                {/* SQL Track - Green */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-xs font-semibold text-primary">SQL</span>
                      {isRunning && sqlTime < 100 && (
                        <div className="relative lightning-effect">
                          <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] sm:text-xs font-mono text-primary font-medium">
                      {sqlTime > 0 ? `${(120 * (sqlTime / 100)).toFixed(0)}ms` : '0ms'}
                    </span>
                  </div>
                  <div className="relative h-3 sm:h-4 bg-muted/50 rounded-full overflow-hidden border border-border/30">
                    <div 
                      className={`absolute left-0 top-0 h-full bg-gradient-to-r from-primary via-secondary to-primary rounded-full transition-all duration-100 ease-out track-glow-green`}
                      style={{ width: `${sqlTime}%` }}
                    >
                      {/* Animated glow effect */}
                      {isRunning && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Redis Track - Red */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-xs font-semibold text-red-400">Redis</span>
                      {isRunning && redisTime < 100 && (
                        <div className="relative lightning-effect">
                          <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] sm:text-xs font-mono text-red-400 font-semibold">
                      {redisTime > 0 ? `${(15 * (redisTime / 100)).toFixed(1)}ms` : '0ms'}
                    </span>
                  </div>
                  <div className="relative h-3 sm:h-4 bg-muted/50 rounded-full overflow-hidden border border-border/30">
                    <div 
                      className={`absolute left-0 top-0 h-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 rounded-full transition-all duration-100 ease-out track-glow-red`}
                      style={{ width: `${redisTime}%` }}
                    >
                      {/* Animated glow effect */}
                      {isRunning && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Results */}
                {hasRun && !isRunning && redisTime >= 100 && sqlTime >= 100 && (
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border/30 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] sm:text-xs text-muted-foreground">Winner: Redis</span>
                      <span className="text-xs sm:text-sm font-bold text-gradient">
                        ~8x faster
                      </span>
                    </div>
                  </div>
                )}

                {!hasRun && (
                  <div className="text-center py-3 sm:py-4">
                    <p className="text-[10px] sm:text-xs text-muted-foreground">
                      Click "Play" to start the race! 🚀
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button 
        onClick={() => scrollToSection("backend-showcase")}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-pulse hidden sm:block"
      >
        <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>
    </section>
  );
}
