import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, Award, Presentation, Heart, Eye, Lightbulb, 
  Cpu, Zap, Glasses, UserCheck
} from "lucide-react";
import ImageModal from "./ImageModal";

const ACTIVITIES = [
  {
    icon: Lightbulb,
    title: "Capstone Project Completion",
    org: "Faculty of Engineering, AIUB",
    description: "Successfully tackled complex real-world problems through advanced data analysis and machine learning. Involved comprehensive data preprocessing, model development, optimization, and deployment.",
    images: ["/images/capstone1.jpg", "/images/capstone2.jpg"],
    color: "blue",
  },
  {
    icon: Cpu,
    title: "4th ICREST'25 Conference",
    org: "International Conference on Robotics, Electrical, and Signal Processing",
    description: "Participated in the 4th International Conference on Robotics, Electrical, and Signal Processing Techniques, engaging with global research and innovative technical trends.",
    images: ["/images/icrest1.jpg", "/images/icrest2.jpg"],
    color: "cyan",
  },
  {
    icon: Glasses,
    title: "Cha Adda with Dark Kak Team",
    org: "Dark Kak & AR/VR Community",
    description: "Engaged in technical discussions and gained hands-on experience with cutting-edge AR/VR technologies alongside the Dark Kak team.",
    images: ["/images/darkkak1.jpg", "/images/darkkak2.jpg"],
    color: "purple",
  },
  {
    icon: Zap,
    title: "Industrial Visit to DESCO",
    org: "Faculty of Engineering & ACES",
    description: "Participated in an organized industrial visit to DESCO to gain practical insights into large-scale electrical systems and engineering management.",
    images: ["/images/desco1.jpg", "/images/desco2.jpg"],
    color: "pink",
  },
  {
    icon: UserCheck,
    title: "Newcomer Orientation & Volunteering",
    org: "Orientation Club & AIUB Community",
    description: "Served as a volunteer and club member for newcomer orientations, assisting in campus navigation, event coordination, and welcoming new students.",
    images: ["/images/volunteer1.jpg", "/images/volunteer2.jpg"],
    color: "violet",
  },
  {
    icon: Users,
    title: "Interview Coordinator",
    org: "Programee Dev Team 3",
    description: "Served as an Interview Coordinator for Programee Dev Team 3, managing candidate screenings, scheduling, and technical team coordination.",
    images: ["/images/coordinator1.png", "/images/coordinator2.png"],
    color: "indigo",
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
    <section id="Extracurricular" className="py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div {...fadeUp} className="text-center mb-16">
          <span className="font-mono text-primary text-sm mb-2 block">// extracurricular_activities</span>
          <h2 className="text-3xl sm:text-4xl font-bold glow-text">Beyond Code</h2>
          <p className="text-muted-foreground mt-3 text-sm">Leadership, teamwork, and community engagement</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ACTIVITIES.map((activity, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl overflow-hidden neon-border group hover:glow-purple-sm transition-all duration-500"
            >
              {/* Images */}
              <div className="grid grid-cols-2 gap-2 p-4">
                {activity.images.map((img, j) => (
                  <div
                    key={j}
                    onClick={() => setModalData({ image: img, title: activity.title, description: activity.org })}
                    className="relative h-32 rounded-lg overflow-hidden cursor-pointer group/img"
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