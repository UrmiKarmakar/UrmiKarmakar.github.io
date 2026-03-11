import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Award, Presentation, Heart, Eye } from "lucide-react";
import ImageModal from "./ImageModal";

const ACTIVITIES = [
  {
    icon: Users,
    title: "General Secretary, ACES",
    org: "AIUB Community of Engineering Students",
    period: "2023-2024",
    description: "Led organizational activities, event planning, and team coordination. Demonstrated strong leadership and communication skills.",
    images: [
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80",
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80"
    ],
    color: "purple",
  },
  {
    icon: Presentation,
    title: "Public Speaking & Presentations",
    org: "Various Technical Events",
    period: "2022-2025",
    description: "Delivered technical presentations on AI, ML, and backend development topics. Participated in workshops and seminars.",
    images: [
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80"
    ],
    color: "blue",
  },
  {
    icon: Heart,
    title: "Content Creation & Organization",
    org: "ACES & Technical Communities",
    period: "2022-2025",
    description: "Created technical content, organized workshops, and contributed to community building initiatives.",
    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80"
    ],
    color: "pink",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

export default function ExtracurricularSection() {
  const [modalData, setModalData] = useState(null);

  return (
    <section id="Extracurricular" className="py-24 px-4 sm:px-6 relative">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div {...fadeUp} className="text-center mb-16">
          <span className="font-mono text-primary text-sm mb-2 block">// extracurricular_activities</span>
          <h2 className="text-3xl sm:text-4xl font-bold glow-text">Beyond Code</h2>
          <p className="text-muted-foreground mt-3 text-sm">Leadership, teamwork, and community engagement</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACTIVITIES.map((activity, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.15 }}
              className="glass rounded-xl overflow-hidden neon-border group hover:glow-purple-sm transition-all duration-500"
            >
              {/* Images */}
              <div className="grid grid-cols-2 gap-2 p-4">
                {activity.images.map((img, j) => (
                  <div
                    key={j}
                    onClick={() => setModalData({ image: img, title: activity.title, description: activity.org })}
                    className={`relative ${activity.images.length === 1 ? 'col-span-2' : ''} h-32 rounded-lg overflow-hidden cursor-pointer group/img`}
                  >
                    <img
                      src={img}
                      alt={`${activity.title} ${j + 1}`}
                      className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-background/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <Eye className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Content */}
              <div className="p-5 pt-2">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                    <activity.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground text-sm leading-snug">{activity.title}</h3>
                    <p className="text-xs text-primary font-mono mt-0.5">{activity.org}</p>
                  </div>
                </div>

                <span className="inline-block text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded-md mb-3">
                  {activity.period}
                </span>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {activity.description}
                </p>
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