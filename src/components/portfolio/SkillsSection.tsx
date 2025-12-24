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
    <section id="skills" className="py-20 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-gradient">Skills & Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit built through hands-on experience with production systems.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Experience & Education */}
          <div className="space-y-8">
            {/* Experience */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-secondary" />
                </div>
                Experience
              </h3>

              {experience.map((exp, index) => (
                <div key={index} className="glass rounded-lg p-5 border-l-2 border-primary">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{exp.title}</h4>
                      <p className="text-sm text-primary">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {exp.description}
                  </p>
                  <ul className="space-y-1">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-accent" />
                </div>
                Education
              </h3>

              <div className="glass rounded-lg p-5 border-l-2 border-secondary">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{education.degree}</h4>
                    <p className="text-sm text-secondary">{education.institution}</p>
                  </div>
                  <Badge variant="secondary">{education.gpa}</Badge>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {education.period}
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-mono text-sm">&lt;/&gt;</span>
              </div>
              Technical Stack
            </h3>

            <div className="space-y-4">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="glass rounded-lg p-4">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="outline"
                        className="hover:bg-primary/20 hover:border-primary transition-colors"
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
