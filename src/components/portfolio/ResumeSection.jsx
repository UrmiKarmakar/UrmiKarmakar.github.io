import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Code2, Database, Brain, Wrench } from "lucide-react";
import SkillChip from "./SkillChip";

const EXPERIENCE = [
  {
    title: "Jr. AI & Backend Developer",
    company: "Sparktech IT Limited (Betopia Group)",
    location: "Dhaka, Bangladesh",
    period: "Oct 2025 – Present",
    points: [
      "Developing AI-driven features and backend components using Django, DRF, and Python",
      "Implementing scalable AI models and integrating them into production systems",
      "Ensuring data quality, model performance, and system reliability",
    ],
  },
  {
    title: "AI Research & Backend Development Intern",
    company: "The NexGenix Ltd., IT Business Incubator, CUET",
    period: "Mar 2025 – Sep 2025",
    points: [
      "Researched deep learning, NLP, and computer vision to develop features",
      "Built and optimized Python backend services with MongoDB/PostgreSQL schemas",
      "Developed RESTful and GraphQL APIs and integrated third-party services",
    ],
  },
  {
    title: "Data Science Intern",
    company: "Cognifyz Technologies",
    location: "Nagpur, India",
    period: "Dec 2024 – Jan 2025",
    points: [
      "Cleaned, explored, and preprocessed datasets for ML pipelines",
      "Engineered features and performed EDA to extract actionable insights",
    ],
  },
];

const EDUCATION = [
  { degree: "BSc in Computer Science & Engineering", school: "AIUB", period: "2022–2025", grade: "CGPA: 3.85" },
  { degree: "Higher Secondary Certificate (HSC)", school: "Udayan Uchcha Madhyamik Bidyalaya", period: "2020", grade: "GPA: 5.00" },
  { degree: "Secondary School Certificate (SSC)", school: "K.L. Jubilee School & College", period: "2018", grade: "GPA: 5.00" },
];

const SKILL_CATEGORIES = [
  {
    icon: Brain,
    title: "AI / ML",
    color: "purple",
    skills: ["Python", "TensorFlow", "PyTorch", "scikit-learn", "NLP", "Computer Vision", "Deep Learning"],
  },
  {
    icon: Database,
    title: "Backend",
    color: "blue",
    skills: ["Django", "Django REST", "FastAPI", "RESTful APIs", "GraphQL", "n8n"],
  },
  {
    icon: Code2,
    title: "Languages",
    color: "pink",
    skills: ["Python", "R", "C", "C++", "Java", "C#", "JavaScript", "HTML/CSS"],
  },
  {
    icon: Wrench,
    title: "Tools & Data",
    color: "cyan",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Git", "Docker", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

export default function ResumeSection() {
  return (
    <section id="Resume" className="py-24 px-4 sm:px-6 relative">
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div {...fadeUp} className="text-center mb-16">
          <span className="font-mono text-primary text-sm mb-2 block">// resume</span>
          <h2 className="text-3xl sm:text-4xl font-bold glow-text">Experience & Skills</h2>
        </motion.div>

        {/* Skills Grid */}
        <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.title} className="glass rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <cat.icon className="w-4 h-4 text-primary" />
                <h3 className="font-mono text-sm font-semibold text-foreground">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <SkillChip key={skill} label={skill} color={cat.color} />
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Experience & Education */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="w-4 h-4 text-primary" />
              <h3 className="font-mono text-lg font-semibold">work_experience</h3>
              <span><div className="h-1.5 w-24 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" /></span>
            </div>
            <div className="space-y-6">
              {EXPERIENCE.map((exp, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-5 neon-border">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{exp.title}</h4>
                    <span className="text-xs font-mono text-primary">{exp.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{exp.company}{exp.location ? ` | ${exp.location}` : ''}</p>
                  <ul className="space-y-1.5">
                    {exp.points.map((point, j) => (
                      <li key={j} className="text-sm text-secondary-foreground flex items-start gap-2">
                        <span className="text-primary mt-1.5 text-xs">▸</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="w-4 h-4 text-primary" />
              <h3 className="font-mono text-lg font-semibold">education</h3>
            </div>
            <div className="space-y-4">
              {EDUCATION.map((edu, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-5">
                  <h4 className="font-semibold text-foreground text-sm">{edu.degree}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{edu.school}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-mono text-primary">{edu.period}</span>
                    <span className="text-xs font-mono font-bold text-accent">{edu.grade}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}