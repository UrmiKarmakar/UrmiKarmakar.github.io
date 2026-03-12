import React, { useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Eye } from "lucide-react";
import ImageModal from "./ImageModal";

const CERTIFICATES = [
  { 
    title: "Introduction to Generative AI", 
    issuer: "Google", 
    color: "purple",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80"
  },
  { 
    title: "Data Science Intern", 
    issuer: "Cognifyz Technologies", 
    color: "blue",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
  },
  { 
    title: "AI Research & Backend Dev Intern", 
    issuer: "NexGenix", 
    color: "pink",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80"
  },
  { 
    title: "AI & Machine Learning With Python", 
    issuer: "ITBI, CUET", 
    color: "violet",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80"
  },
  { 
    title: "Arduino MKR Family & IoT Dev Boards", 
    issuer: "Code-19 Workshop", 
    color: "cyan",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80"
  },
  { 
    title: "Introduction to Python Programming", 
    issuer: "Bohubrihi", 
    color: "purple",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&q=80"
  },
  { 
    title: "Coding Problem Solving", 
    issuer: "Ostad", 
    color: "blue",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80"
  },
  { 
    title: "Data Science Fundamentals", 
    issuer: "Ostad", 
    color: "pink",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
  },
  { 
    title: "Basics of Machine Learning Algorithms", 
    issuer: "Uniathena", 
    color: "violet",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80"
  },
  { 
    title: "Getting Started with ML Algorithms", 
    issuer: "Simplilearn | Skillup", 
    color: "cyan",
    image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=600&q=80"
  },
  { 
    title: "Python Libraries for Data Science", 
    issuer: "Simplilearn | Skillup", 
    color: "purple",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80"
  },
];

const dotColor = {
  purple: "bg-purple-400",
  blue: "bg-blue-400",
  pink: "bg-pink-400",
  cyan: "bg-cyan-400",
  violet: "bg-violet-400",
};

const borderColor = {
  purple: "border-purple-500/20 hover:border-purple-500/40",
  blue: "border-blue-500/20 hover:border-blue-500/40",
  pink: "border-pink-500/20 hover:border-pink-500/40",
  cyan: "border-cyan-500/20 hover:border-cyan-500/40",
  violet: "border-violet-500/20 hover:border-violet-500/40",
};

export default function CertificatesSection() {
  const [modalData, setModalData] = useState(null);

  return (
    <section id="Certificates" className="py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      
      {/* Floating graphics */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <motion.div
          animate={{ rotate: [0, 360], y: [0, -25, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-16 w-16 h-16 border border-violet-500/25 rounded-lg"
          style={{ transform: "rotate(45deg)" }}
        />
        <motion.div
          animate={{ x: [-12, 12, -12], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-24 right-20 w-12 h-12 border-2 border-cyan-500/20"
          style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.35, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-1/4 w-22 h-22 bg-gradient-to-br from-accent/10 to-transparent rounded-full"
        />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-primary text-sm mb-2 block">// certificates</span>
          <h2 className="text-3xl sm:text-4xl font-bold glow-text">Certifications</h2>
          <p className="text-muted-foreground mt-3 text-sm">Click any certificate to view</p>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {CERTIFICATES.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setModalData(cert)}
              className={`glass rounded-xl overflow-hidden break-inside-avoid border transition-all duration-300 hover:glow-purple-sm group cursor-pointer ${borderColor[cert.color]}`}
            >
              <div className="relative h-32 overflow-hidden">
                <img 
                  src={cert.image} 
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                <div className="absolute top-2 right-2 p-2 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-3.5 h-3.5 text-primary" />
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0">
                    <BadgeCheck className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm leading-snug">{cert.title}</h4>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${dotColor[cert.color]}`} />
                      <span className="text-xs text-muted-foreground font-mono">{cert.issuer}</span>
                    </div>
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
        description={modalData?.issuer}
      />
    </section>
  );
}