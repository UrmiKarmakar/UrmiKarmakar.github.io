import React from "react";
import { motion } from "framer-motion";
import { Code2, Database, Brain, Wrench } from "lucide-react";
import SkillChip from "./SkillChip";

const SKILL_CATEGORIES = [
  {
    icon: Brain,
    title: "AI / ML",
    color: "purple",
    skills: ["Python", "TensorFlow", "PyTorch", "scikit-learn", "NLP", "Computer Vision", "Deep Learning", "Keras", "OpenCV"],
  },
  {
    icon: Database,
    title: "Backend & APIs",
    color: "blue",
    skills: ["Django", "Django REST Framework", "FastAPI", "RESTful APIs", "GraphQL", "n8n", "JWT", "OAuth"],
  },
  {
    icon: Code2,
    title: "Languages",
    color: "pink",
    skills: ["Python", "R", "C", "C++", "Java", "C#", "JavaScript", "HTML/CSS", "SQL"],
  },
  {
    icon: Wrench,
    title: "Tools & Databases",
    color: "cyan",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Git", "GitHub", "Docker", "Linux", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Figma"],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

export default function SkillsSection() {
  return (
    <section id="Skills" className="py-24 px-4 sm:px-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div {...fadeUp} className="text-center mb-16">
          <span className="font-mono text-primary text-sm mb-2 block">// technical_skills</span>
          <h2 className="text-3xl sm:text-4xl font-bold glow-text">Tech Stack</h2>
        </motion.div>

        <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {SKILL_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-6 neon-border hover:glow-purple-sm transition-all duration-500"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                  <cat.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-mono text-base font-semibold text-foreground">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <SkillChip key={skill} label={skill} color={cat.color} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}