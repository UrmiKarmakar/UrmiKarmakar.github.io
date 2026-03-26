import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const TYPING_TEXT = 'Urmi Karmakar: Architecting AI & Scalable Backends.';

export default function HeroSection() {
  const [typed, setTyped] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < TYPING_TEXT.length) {
        setTyped(TYPING_TEXT.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const blinkInterval = setInterval(() => setShowCursor(prev => !prev), 530);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <section id="Home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />
      
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Geometric pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.1 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 4 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2 
            }}
            className="absolute border border-primary/30"
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 80}%`,
              borderRadius: i % 3 === 0 ? '50%' : '8px',
              transform: `rotate(${i * 15}deg)`
            }}
          />
        ))}
      </div>
      
      {/* Additional floating graphics */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/6 w-24 h-24 border-2 border-violet-500/20 rounded-lg"
          style={{ transform: "rotate(25deg)" }}
        />
        <motion.div
          animate={{
            x: [-20, 20, -20],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 right-1/5 w-16 h-16 border-2 border-pink-500/25"
          style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.3, 0.15],
            rotate: [0, -45, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-gradient-to-br from-cyan-500/15 to-transparent rounded-full"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [-360, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-2/3 right-1/3 w-28 h-28 border border-primary/20 rounded-full"
        />
        <motion.div
          animate={{
            x: [-15, 15, -15],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/5 w-14 h-14 border-2 border-accent/20"
          style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
        />
      </div>
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-primary/40 glow-purple mx-auto">
              <img
                src="/images/Urmi.jpg"
                alt="Urmi Karmakar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Terminal */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="glass rounded-xl p-4 sm:p-6 max-w-2xl mx-auto mb-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs text-muted-foreground font-mono">terminal</span>
          </div>
          <div className="text-left font-mono">
            <span className="text-green-400 text-sm">urmi@portfolio</span>
            <span className="text-muted-foreground text-sm">:</span>
            <span className="text-blue-400 text-sm">~</span>
            <span className="text-muted-foreground text-sm">$ </span>
            <span className="text-foreground text-sm sm:text-base">{typed}</span>
            <span className={`text-primary text-base ${showCursor ? 'opacity-100' : 'opacity-0'}`}>▊</span>
          </div>
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed"
        >
          Jr. AI & Backend Developer at Sparktech IT Limited. BSc in CSE from AIUB with CGPA 3.85. 
          Passionate about Deep Learning, NLP, Computer Vision & scalable backend systems.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <a href="https://github.com/UrmiKarmakar" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon" className="border-primary/30 hover:bg-primary/10 hover:border-primary/60 transition-all">
              <Github className="w-4 h-4" />
            </Button>
          </a>
          <a href="https://www.linkedin.com/in/urmi-karmakar-ananna/" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon" className="border-primary/30 hover:bg-primary/10 hover:border-primary/60 transition-all">
              <Linkedin className="w-4 h-4" />
            </Button>
          </a>
          <Button
            variant="outline"
            size="icon"
            className="border-primary/30 hover:bg-primary/10 hover:border-primary/60 transition-all"
            onClick={() => {
              navigator.clipboard.writeText("urmi16kk@gmail.com");
            }}
          >
            <Mail className="w-4 h-4" />
          </Button>
          <a href="#Skills">
            <Button className="bg-primary/90 hover:bg-primary text-primary-foreground font-medium px-6 glow-purple-sm">
              Explore Skills
            </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}