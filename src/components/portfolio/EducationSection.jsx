import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar } from "lucide-react";

const EDUCATION = [
  {
    degree: "Bachelor of Science in Computer Science & Engineering",
    school: "American International University Bangladesh (AIUB)",
    period: "2022–2025",
    grade: "CGPA: 3.85",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80",
    highlight: "Dean's List Honoree",
    details: "Specialized in AI, Machine Learning, and Backend Development",
  },
  {
    degree: "Higher Secondary Certificate (H.S.C)",
    school: "Udayan Uchcha Madhyamik Bidyalaya",
    period: "2020",
    grade: "GPA: 5.00",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80",
    highlight: "Perfect Score",
    details: "Science Group",
  },
  {
    degree: "Secondary School Certificate (S.S.C)",
    school: "K.L. Jubilee School & College",
    period: "2018",
    grade: "GPA: 5.00",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80",
    highlight: "Perfect Score",
    details: "Science Group",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

export default function EducationSection() {
  return (
    <section id="Education" className="py-24 px-4 sm:px-6 relative">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div {...fadeUp} className="text-center mb-16">
          <span className="font-mono text-primary text-sm mb-2 block">// education</span>
          <h2 className="text-3xl sm:text-4xl font-bold glow-text">Academic Background</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.12 }}
              className="glass rounded-xl overflow-hidden neon-border group hover:glow-purple-sm transition-all duration-500"
            >
              <div className="p-5">
                <div className="mb-3">
                  <div className="bg-primary/20 backdrop-blur-sm px-3 py-1 rounded-full border border-primary/30 inline-block">
                    <span className="text-xs font-mono font-bold text-primary">{edu.grade}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 mb-3">
                  <GraduationCap className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-foreground text-sm leading-snug mb-1">{edu.degree}</h3>
                    <p className="text-xs text-muted-foreground">{edu.school}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-mono text-primary">{edu.period}</span>
                </div>

                {edu.highlight && (
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-3.5 h-3.5 text-accent" />
                    <span className="text-xs font-medium text-accent">{edu.highlight}</span>
                  </div>
                )}

                <p className="text-xs text-muted-foreground leading-relaxed">{edu.details}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}