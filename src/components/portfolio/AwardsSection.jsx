import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, Star, Users, Eye, Image as ImageIcon } from "lucide-react";
import ImageModal from "./ImageModal";

const AWARDS = [
  {
    icon: Award,
    title: "Dean's List / Dean's Honorable Mention",
    org: "Department of Computer Science, Faculty of Science and Technology",
    detail: "Spring 2022-2023, Fall 2022-2023,Spring 2023-2024, Fall 2023-2024,Spring 2024-2025",
    description: "Recognized for outstanding academic performance maintaining CGPA 3.85 throughout the program.",
    images: [
      "/images/Dean.jpg",
      "/images/Dean1.jpg"
    ]
  },
  {
    icon: Star,
    title: "Magna Cum Laude (Silver Medals)",
    org: "Academic Honors and Awards",
    detail: "CGPA 3.85",
    description: "Graduated with high honors, earning Magna Cum Laude distinction with a cumulative GPA of 3.85, demonstrating consistent academic excellence.",
    images: [
      "/images/MagnaCum.webp"
    ]
  },
  {
    icon: Users,
    title: "General Secretary",
    org: "AIUB Community of Engineering Students (ACES)",
    detail: "Leadership Role",
    description: "Demonstrated leadership, quick learning, and effective content creation. Proficient in public speaking, organization, and delivering presentations.",
    images: [
      "/images/ACES_Top.jpg",
      "/images/ACES.jpg"
    ]
  },
];

export default function AwardsSection() {
  const [modalData, setModalData] = useState(null);

  return (
    <section id="Awards" className="py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      
      {/* Floating graphics */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <motion.div
          animate={{ y: [0, 35, 0], rotate: [0, -180, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-28 right-16 w-18 h-18 border border-accent/25 rounded-full"
        />
        <motion.div
          animate={{ x: [-18, 18, -18], rotate: [0, 90, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-12 w-14 h-14 border-2 border-primary/20"
          style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/4 w-20 h-20 bg-gradient-to-br from-pink-500/10 to-transparent rounded-lg"
        />
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-primary text-sm mb-2 block">// awards</span>
          <h2 className="text-3xl sm:text-4xl font-bold glow-text">Honors & Recognition</h2>
          <p className="text-muted-foreground mt-3 text-sm">Distinguished academic honors and leadership appointments recognizing sustained excellence in engineering and community contribution</p>
        </motion.div>

        <div className="space-y-6">
          {AWARDS.map((award, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass rounded-xl overflow-hidden neon-border group hover:glow-purple-sm transition-all duration-500"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                {/* Images */}
                <div className="md:col-span-1 p-4 flex flex-wrap md:flex-nowrap gap-2">
                  {award.images.map((img, j) => (
                    <div
                      key={j}
                      onClick={() => setModalData({ image: img, title: award.title, description: award.org })}
                      className="relative flex-1 h-32 rounded-lg overflow-hidden cursor-pointer group/img"
                    >
                      <img
                        src={img}
                        alt={`${award.title} ${j + 1}`}
                        className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-background/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                        <Eye className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Content */}
                <div className="md:col-span-2 p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                      <award.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground text-lg">{award.title}</h3>
                      <p className="text-sm text-primary font-mono mt-1">{award.org}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{award.detail}</p>
                      <p className="text-sm text-secondary-foreground mt-3 leading-relaxed">{award.description}</p>
                    </div>
                    <Star className="w-5 h-5 text-primary/30 group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ImageModal
        isOpen={!!modalData}
        onClose={() => setModalData(null)}
        image={modalData?.image}
        title={modalData?.title}
        description={modalData?.description}
      />
    </section>
  );
}