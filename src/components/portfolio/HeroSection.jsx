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
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      {/* Animated grid */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-[10%] w-2 h-2 bg-primary/40 rounded-full animate-pulse" />
        <div className="absolute top-40 right-[15%] w-1.5 h-1.5 bg-accent/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-[20%] w-1 h-1 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-[25%] w-1.5 h-1.5 bg-violet-400/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
      
      {/* Gradient orbs with animation */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent rounded-full blur-3xl" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600 rounded-full blur-3xl" 
      />
      
      {/* Geometric shapes */}
      <div className="absolute top-10 right-10 w-20 h-20 border border-primary/20 rounded-lg rotate-12 animate-pulse" />
      <div className="absolute bottom-20 left-20 w-16 h-16 border border-accent/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

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
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b0fd830c520e68e043e4d9/8aebf79f3_generated_b9d18692.png"
                alt="Urmi Karmakar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background" />
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