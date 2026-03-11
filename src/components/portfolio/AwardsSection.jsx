import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, Star, Users, Eye, Image as ImageIcon } from "lucide-react";
import ImageModal from "./ImageModal";

const AWARDS = [
  {
    icon: Award,
    title: "Dean's List / Dean's Honorable Mention",
    org: "Department of Computer Science, Faculty of Science and Technology",
    detail: "Spring 2022-2023 & Fall 2022-2023",
    description: "Recognized for outstanding academic performance maintaining CGPA 3.85 throughout the program.",
    images: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80"
    ]
  },
  {
    icon: Users,
    title: "General Secretary",
    org: "AIUB Community of Engineering Students (ACES)",
    detail: "Leadership Role",
    description: "Demonstrated leadership, quick learning, and effective content creation. Proficient in public speaking, organization, and delivering presentations.",
    images: [
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80"
    ]
  },
];

export default function AwardsSection() {
  const [modalData, setModalData] = useState(null);

  return (
    <section id="Awards" className="py-24 px-4 sm:px-6 relative">
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-primary text-sm mb-2 block">// awards</span>
          <h2 className="text-3xl sm:text-4xl font-bold glow-text">Honors & Recognition</h2>
          <p className="text-muted-foreground mt-3 text-sm">Click images to view in detail</p>
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
                <div className="md:col-span-1 p-4 flex gap-2">
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