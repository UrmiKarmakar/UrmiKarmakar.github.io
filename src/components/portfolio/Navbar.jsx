import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  "Home", 
  "Skills", 
  "Experience", 
  "Education", 
  "AllProjects", 
  "Awards", 
  "Certificates", 
  "Extracurricular"
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");

  const AI_AVATAR_URL = "/images/UK_AI.png"; 

  // 1. Handle scroll for glass background effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Intersection Observer to highlight the active section while scrolling
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const matchedItem = NAV_ITEMS.find(
            item => item.toLowerCase() === entry.target.id.toLowerCase()
          );
          if (matchedItem) setActive(matchedItem);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item) || document.getElementById(item.toLowerCase());
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // 3. Smooth Scroll function
  const scrollTo = (id) => {
    const element = document.getElementById(id) || document.getElementById(id.toLowerCase());
    
    if (element) {
      setActive(id);
      setIsOpen(false); // Closes the mobile menu when an item is clicked

      const offset = 80; 
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    } else {
      console.warn(`Element with id "${id}" not found.`);
    }
  };

return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 
        ${scrolled 
          ? "glass border-b border-white/5 shadow-lg" 
          : "bg-transparent hover:bg-[#0f071a]/80 hover:backdrop-blur-lg border-b border-transparent hover:border-white/5"
        }`}
    >
      {/* The 'hover' classes above ensure that as soon as your cursor 
          touches the Navbar area at the top, it becomes visible.
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => scrollTo("Home")}
          >
            <div className="w-10 h-10 rounded-xl border border-purple-500/30 p-0.5 bg-black/40 overflow-hidden group-hover:border-primary transition-colors">
              <img 
                src={AI_AVATAR_URL} 
                alt="Urmi AI Logo" 
                className="object-cover object-center w-full h-full scale-125 rounded-lg" 
              />
            </div>
            
            <div className="hidden sm:block">
              <span className="font-mono font-bold text-sm text-primary">urmi@dev</span>
              <span className="text-muted-foreground font-mono text-sm">:~$</span>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(item)}
                className={`relative px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-300 ${
                  active === item
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {item}
                {active === item && (
                  <motion.div 
                    layoutId="activeGlow"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary shadow-[0_0_10px_#8b5cf6] rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu List */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-white/5 overflow-hidden bg-[#0f071a]/95 backdrop-blur-xl"
          >
            <div className="px-4 py-6 space-y-2 flex flex-col items-center">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)} 
                  className={`block w-full text-center px-4 py-4 rounded-xl text-base font-medium transition-all ${
                    active === item
                      ? "text-primary bg-primary/20 border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}