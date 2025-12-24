import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const skills = {
  languages: ["Python", "JavaScript", "Java"],
  backend: ["Django", "Django REST Framework", "Node.js", "Express"],
  frontend: ["React", "Vite", "Tailwind CSS"],
  databases: ["MongoDB", "SQL", "Redis"],
  systems: ["Microservices", "RBAC", "Server-Side Pagination", "REST APIs"],
  security: ["JWT", "PBKDF2-SHA256", "Cryptographic Hashing", "OWASP Standards", "SHA-256 Salting"],
  devops: ["Git", "Docker", "CI/CD", "Postman", "AWS"],
};

const experience = [
  {
    title: "Backend Engineer",
    company: "Rolling Arrays (Internship)",
    period: "May 2025 - Present",
    description: "Optimized REST APIs handling 10K+ daily transactions, reducing response time by 30% using Django microservices. Designed validation logic to prevent data loss and duplication, ensuring 99.9% data integrity in SAP SuccessFactors sync.",
    highlights: [
      "Built and maintained scalable microservices architecture using Django, Python, and SQL",
      "Streamlined API testing and versioning using Postman and Bruno",
      "30% response time reduction through optimization",
      "99.9% data integrity in production systems",
    ],
  },
];

const education = {
  degree: "B.Tech (Software Product Engineering)",
  institution: "MIT-ADT (Pune) x Kalvium",
  period: "2023 - 2027",
  gpa: "8.40/10",
};

export function SkillsSection() {
  return (
    <section id="skills" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            <span className="text-gradient">Skills & Experience</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            A comprehensive toolkit built through hands-on experience with production systems.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Experience & Education */}
          <div className="space-y-6 sm:space-y-8">
            {/* Experience */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary" />
                </div>
                Experience
              </h3>

              {experience.map((exp, index) => (
                <div key={index} className="glass rounded-lg p-4 sm:p-5 border-l-2 border-primary">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-1">
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base">{exp.title}</h4>
                      <p className="text-xs sm:text-sm text-primary">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                    {exp.description}
                  </p>
                  <ul className="space-y-1">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="text-[10px] sm:text-xs text-muted-foreground flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
                </div>
                Education
              </h3>

              <div className="glass rounded-lg p-4 sm:p-5 border-l-2 border-secondary">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-1">
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base">{education.degree}</h4>
                    <p className="text-xs sm:text-sm text-secondary">{education.institution}</p>
                  </div>
                  <Badge variant="secondary" className="self-start text-[10px] sm:text-xs">{education.gpa}</Badge>
                </div>
                <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {education.period}
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-mono text-xs sm:text-sm">&lt;/&gt;</span>
              </div>
              Technical Stack
            </h3>

            <div className="space-y-3 sm:space-y-4">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="glass rounded-lg p-3 sm:p-4">
                  <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-2 sm:mb-3">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {items.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="outline"
                        className="hover:bg-primary/20 hover:border-primary transition-colors text-[10px] sm:text-xs px-2 py-0.5"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
