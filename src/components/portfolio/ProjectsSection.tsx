import { ExternalLink, Github, Shield, Database, Cloud, Users, X, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useCallback, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

// Function to highlight important words with green theme - only exact words from the image
const highlightKeywords = (text: string) => {
  // Escape HTML to prevent XSS
  const escapeHtml = (str: string) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

  const escapedText = escapeHtml(text);

  // Define ONLY the exact keywords shown in the image (longest first to avoid partial matches)
  const keywords = [
    // Multi-word terms first (most specific)
    { pattern: /HIPAA-compliant/gi },
    { pattern: /3-tier RBAC/gi },
    { pattern: /PBKDF2-SHA256/gi },
    { pattern: /finite state machine/gi },
    { pattern: /MongoDB transactions/gi },
    { pattern: /Real-Time/g }, // Capital T
    { pattern: /real-time/gi }, // lowercase
    { pattern: /128-bit/gi },
    
    // Single word technical terms
    { pattern: /\bMongoDB\b/gi },
    { pattern: /\bRBAC\b/gi },
    { pattern: /\bOWASP\b/gi },
    { pattern: /\bJWT\b/gi },
    { pattern: /\bOTP\b/gi },
    { pattern: /\bSHA\b/gi },
    { pattern: /\bCloudinary\b/gi },
    { pattern: /\bWPM\b/gi },
    { pattern: /\bCPM\b/gi },
    
    // Numbers with units (exact matches only)
    { pattern: /\b85%/g },
    { pattern: /\b100K\b/g },
  ];

  let highlightedText = escapedText;
  
  // Process each keyword - replace with highlighted version
  keywords.forEach(({ pattern }) => {
    highlightedText = highlightedText.replace(
      pattern,
      (match, offset, string) => {
        // Check if already inside a span tag by looking at the text before this match
        const beforeMatch = string.substring(0, offset);
        const openSpans = (beforeMatch.match(/<span[^>]*>/g) || []).length;
        const closeSpans = (beforeMatch.match(/<\/span>/g) || []).length;
        
        // If already inside a span, don't highlight again
        if (openSpans > closeSpans) {
          return match;
        }
        
        return `<span class="text-primary font-semibold">${match}</span>`;
      }
    );
  });

  return highlightedText;
};

const projects = [
  {
    title: "G1Card",
    subtitle: "Unified Medical Records Platform",
    description: "Built an enterprise-grade healthcare platform enabling seamless medical data interoperability across hospitals, patients, and administrators with HIPAA-compliant security standards.",
    highlights: [
      "HIPAA-compliant platform with 3-tier RBAC (Admin → Hospital → Patient)",
      "Optimized MongoDB aggregation pipelines, reducing query execution time by 85% with indexed pagination",
      "Implemented PBKDF2-SHA256 authentication (100K iterations, 128-bit salt) exceeding OWASP standards",
      "Built a finite state machine for hospital approval workflow (PENDING → APPROVED/REJECTED) with MongoDB transactions",
    ],
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Redis", "Role-Based Access Control (RBAC)", "Server-Side Pagination", "Cryptographic Hashing"],
    icon: Shield,
    gradient: "from-primary to-primary/50",
    liveUrl: "https://g1card.vercel.app",
    githubUrl: "https://github.com/kshitij162005/G1Card",
    carouselFolder: "g1card",
    imageCount: 12,
    status: "in-development" as const,
  },
  {
    title: "Kiki Testimonial",
    subtitle: "Customer Testimonial Management Platform (SaaS)",
    description: "Developed a full-stack web app for businesses to collect, manage, and display text & video testimonials via customizable forms and branded spaces. Integrated secure JWT auth, Cloudinary uploads, and an analytics dashboard.",
    highlights: [
      "User Authentication: Secure signup and login using JWT with SHA salting methods for password protection",
      "OTP-Based Authentication: Ensures security during password reset",
      "Real-Time Feedback Tracking: Monitors and displays counts for text and video feedback submissions",
      "User-Friendly Interface: Ensures smooth navigation and management of feedback",
    ],
    tech: ["React", "Tailwind CSS","Node.js", "Express.js", "MongoDB", "JWT", "Cloudinary", "SHA256"],
    icon: Users,
    gradient: "from-secondary to-secondary/50",
    liveUrl: "https://kiki-testimonial-client.vercel.app/",
    githubUrl: "https://github.com/kshitij162005/KiKi_Testimonial",
    carouselFolder: "kiki",
    imageCount: 10,
    status: "completed" as const,
  },
  {
    title: "TypeRacer",
    subtitle: "A Typing Game",
    description: "A competitive typing game with real-time WPM and CPM tracking, allowing users to race against each other with an interactive and thrilling design.",
    highlights: [
      "Live WPM and CPM Tracking: Displays real-time Words Per Minute (WPM) and Characters Per Minute (CPM) metrics",
      "Competitive Gameplay: Allows users to race against each other, enhancing engagement and fun",
      "Exciting User Interface: Interactive and thrilling design with exciting background music (BGM)",
      "Real-time performance metrics and competitive leaderboard",
    ],
    tech: ["HTML", "Vanilla CSS", "JavaScript"],
    icon: Cloud,
    gradient: "from-emerald-500 to-teal-500",
    liveUrl: "https://6562550e143ed16d009488f9--boisterous-biscuit-0164c9.netlify.app/",
    githubUrl: "https://github.com/kshitij162005/CA2-FEWD?tab=readme-ov-file",
    carouselFolder: "typeracer",
    imageCount: 4,
    status: "completed" as const,
  },
];

// Mini carousel component with page indicator
function ProjectCarousel({ 
  project, 
  onExpand 
}: { 
  project: typeof projects[0]; 
  onExpand: () => void;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="relative w-full bg-muted/20 group/carousel">
      <Carousel className="w-full" opts={{ loop: true }} setApi={setApi}>
        <CarouselContent>
          {Array.from({ length: project.imageCount }, (_, i) => (
            <CarouselItem key={i}>
              <div 
                className="relative aspect-video w-full overflow-hidden bg-muted/30 cursor-pointer"
                onClick={onExpand}
              >
                <img
                  src={`/Corousal/${project.carouselFolder}/${i + 1}.png`}
                  alt={`${project.title} screenshot ${i + 1}`}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/carousel:scale-105"
                  loading="lazy"
                />
                {/* Expand hint overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover/carousel:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 border-primary/20 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300" />
        <CarouselNext className="right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 border-primary/20 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300" />
      </Carousel>
      
      {/* Page indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border border-primary/20">
        <span className="text-xs font-medium text-foreground">
          <span className="text-primary">{current + 1}</span>
          <span className="text-muted-foreground"> / {project.imageCount}</span>
        </span>
      </div>
    </div>
  );
}

// Full screen modal carousel
function ExpandedCarousel({ 
  project, 
  onClose,
  initialSlide = 0
}: { 
  project: typeof projects[0]; 
  onClose: () => void;
  initialSlide?: number;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(initialSlide);

  useEffect(() => {
    if (!api) return;
    
    api.scrollTo(initialSlide, true);
    setCurrent(api.selectedScrollSnap());
    
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api, initialSlide]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/95 backdrop-blur-md" />
      
      {/* Content */}
      <div 
        className="relative w-full max-w-[95vw] sm:max-w-[90vw] lg:max-w-[70vw] xl:max-w-[60vw] animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 px-2 sm:px-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${project.gradient} flex items-center justify-center flex-shrink-0`}>
              <project.icon className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm sm:text-lg text-foreground truncate">{project.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">{project.subtitle}</p>
            </div>
          </div>
          
          {/* Close button */}
          <Button
            variant="outline"
            size="icon"
            onClick={onClose}
            className="rounded-full bg-background/80 backdrop-blur-sm border-primary/30 hover:bg-destructive/20 hover:border-destructive/50 hover:text-destructive transition-all duration-200 w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
        
        {/* Carousel */}
        <div className="relative rounded-xl overflow-hidden border border-primary/20 shadow-2xl shadow-primary/10">
          <Carousel className="w-full" opts={{ loop: true }} setApi={setApi}>
            <CarouselContent>
              {Array.from({ length: project.imageCount }, (_, i) => (
                <CarouselItem key={i}>
                  <div className="relative w-full aspect-video bg-muted/30">
                    <img
                      src={`/Corousal/${project.carouselFolder}/${i + 1}.png`}
                      alt={`${project.title} screenshot ${i + 1}`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 sm:left-4 h-8 w-8 sm:h-12 sm:w-12 bg-background/90 backdrop-blur-sm hover:bg-background border-primary/30 hover:border-primary transition-all duration-200" />
            <CarouselNext className="right-2 sm:right-4 h-8 w-8 sm:h-12 sm:w-12 bg-background/90 backdrop-blur-sm hover:bg-background border-primary/30 hover:border-primary transition-all duration-200" />
          </Carousel>
          
          {/* Page indicator */}
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-primary/30">
            <span className="text-xs sm:text-sm font-medium text-foreground">
              <span className="text-primary font-bold">{current + 1}</span>
              <span className="text-muted-foreground"> / {project.imageCount}</span>
            </span>
          </div>
        </div>
        
        {/* Dots indicator */}
        <div className="flex justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 flex-wrap px-4">
          {Array.from({ length: project.imageCount }, (_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                i === current 
                  ? "bg-primary w-4 sm:w-6" 
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
        
        {/* Keyboard hint - hidden on mobile */}
        <p className="hidden sm:block text-center text-xs text-muted-foreground mt-4">
          Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-primary">←</kbd> <kbd className="px-1.5 py-0.5 bg-muted rounded text-primary">→</kbd> to navigate • <kbd className="px-1.5 py-0.5 bg-muted rounded text-primary">ESC</kbd> to close
        </p>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const [expandedProject, setExpandedProject] = useState<typeof projects[0] | null>(null);

  const handleExpand = useCallback((project: typeof projects[0]) => {
    setExpandedProject(project);
  }, []);

  const handleClose = useCallback(() => {
    setExpandedProject(null);
  }, []);

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-card/30">
      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            <span className="text-gradient">Featured Projects</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Production-grade applications showcasing backend architecture, security implementation, and scalable design patterns.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div 
              key={project.title}
              className="glass rounded-xl overflow-hidden group hover:border-primary/50 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
              
              {/* Project Preview Carousel */}
              <ProjectCarousel 
                project={project} 
                onExpand={() => handleExpand(project)} 
              />
              
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${project.gradient} bg-opacity-20 flex items-center justify-center flex-shrink-0`}>
                      <project.icon className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base">{project.title}</h3>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{project.subtitle}</p>
                    </div>
                  </div>
                </div>

                <p 
                  className="text-xs sm:text-sm text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: highlightKeywords(project.description) }}
                />

                {/* Highlights */}
                <ul className="space-y-1.5 sm:space-y-2">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2 text-[10px] sm:text-xs">
                      <Database className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                      <span 
                        className="text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: highlightKeywords(highlight) }}
                      />
                    </li>
                  ))}
                </ul>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-2 pt-1 sm:pt-2">
                  <Button size="sm" variant="outline" className="flex-1 text-xs sm:text-sm h-8 sm:h-9" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" className="flex-1 text-xs sm:text-sm h-8 sm:h-9" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                      Live
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Carousel Modal */}
      {expandedProject && (
        <ExpandedCarousel 
          project={expandedProject} 
          onClose={handleClose}
        />
      )}
    </section>
  );
}
