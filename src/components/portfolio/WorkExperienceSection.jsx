import React from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";

const EXPERIENCE = [
  {
    title: "Jr. AI & Backend Developer",
    company: "Sparktech IT Limited (Betopia Group)",
    location: "Dhaka, Bangladesh",
    period: "Oct 2025 – Present",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80",
    points: [
      "Developing AI-driven features and backend components using Django, DRF, and Python",
      "Implementing scalable AI models and integrating them into production systems",
      "Ensuring data quality, model performance, and system reliability",
      "Supporting API development, integration, and deployment workflows",
    ],
  },
  {
    title: "AI Research & Backend Development Intern",
    company: "The NexGenix Ltd., IT Business Incubator, CUET",
    location: "Chittagong, Bangladesh",
    period: "Mar 2025 – Sep 2025",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80",
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
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
    points: [
      "Cleaned, explored, and preprocessed datasets for ML pipelines",
      "Engineered features and performed EDA to extract actionable insights",
      "Collaborated on translating business requirements into data solutions",
    ],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

export default function WorkExperienceSection() {
  return (
    <section id="Experience" className="py-24 px-4 sm:px-6 relative">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div {...fadeUp} className="text-center mb-16">
          <span className="font-mono text-primary text-sm mb-2 block">// work_experience</span>
          <h2 className="text-3xl sm:text-4xl font-bold glow-text">Professional Journey</h2>
        </motion.div>

        <div className="space-y-8">
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.15 }}
              className="glass rounded-xl overflow-hidden neon-border group hover:glow-purple-sm transition-all duration-500"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-1">{exp.title}</h3>
                    <p className="text-sm text-primary font-mono">{exp.company}</p>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground bg-muted px-3 py-1 rounded-full whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {exp.location}
                  </div>
                </div>

                <ul className="space-y-2">
                  {exp.points.map((point, j) => (
                    <li key={j} className="text-sm text-secondary-foreground flex items-start gap-2.5">
                      <span className="text-primary mt-1.5 text-xs flex-shrink-0">▸</span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}