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

  // 1. Handle scroll effect - simplified to ensure visibility
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Intersection Observer for real-time scroll highlighting
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px", // Improved margin for better detection
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

  const scrollTo = (id) => {
    const element = document.getElementById(id) || document.getElementById(id.toLowerCase());
    
    if (element) {
      setActive(id);
      setIsOpen(false); 

      const offset = 80; 
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      window.history.pushState(null, null, `#${id}`);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 w-full
        ${scrolled 
          ? "bg-[#0f071a]/80 backdrop-blur-lg border-b border-white/10 py-3 shadow-2xl" 
          : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => scrollTo("Home")}
          >
            <div className="w-10 h-10 rounded-xl border border-purple-500/30 p-0.5 bg-black/40 overflow-hidden group-hover:border-purple-500 transition-colors">
              <img 
                src={AI_AVATAR_URL} 
                alt="Urmi AI Logo" 
                className="object-cover object-center w-full h-full scale-125 rounded-lg" 
              />
            </div>
            
            <div className="hidden xs:block">
              <span className="font-mono font-bold text-sm text-purple-400">urmi@dev</span>
              <span className="text-gray-400 font-mono text-sm">:~$</span>
            </div>
          </motion.div>

          {/* Desktop Menu - Hidden on Mobile/Tablet */}
          <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/5">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`relative px-3 py-2 rounded-xl text-[12px] font-medium transition-all duration-300 ${
                  active === item ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {active === item && (
                  <motion.div 
                    layoutId="activeGlow"
                    className="absolute inset-0 bg-purple-500/20 rounded-xl border border-purple-500/30"
                  />
                )}
                <span className="relative z-10">{item}</span>
              </button>
            ))}
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-400 hover:text-white focus:outline-none transition-colors"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] lg:hidden"
          >
            {/* Dark Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsOpen(false)} />
            
            {/* Menu Drawer */}
            <motion.div 
              className="absolute right-0 top-0 bottom-0 w-[280px] bg-[#0f071a] border-l border-white/10 p-6 flex flex-col shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex justify-end mb-8">
                <button onClick={() => setIsOpen(false)} className="p-2 text-white/70 hover:text-white">
                  <X size={32} />
                </button>
              </div>
        
              <div className="flex flex-col gap-2 overflow-y-auto custom-scrollbar">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollTo(item)}
                    className={`w-full text-left px-6 py-4 rounded-2xl text-lg font-semibold transition-all ${
                      active === item
                        ? "text-purple-400 bg-purple-500/10 border-r-4 border-purple-500"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}