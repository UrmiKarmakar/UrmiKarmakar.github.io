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
  const [isHovered, setIsHovered] = useState(false); 
  const [active, setActive] = useState("Home");

  const AI_AVATAR_URL = "/images/UK_AI.png"; 

  // 1. Handle background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Sync active state with URL Hash
  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace("#", "");
      const matched = NAV_ITEMS.find(item => item.toLowerCase() === hash.toLowerCase());
      if (matched) setActive(matched);
    };
    
    window.addEventListener("hashchange", syncHash);
    syncHash();
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  // 3. Update active state based on section visibility
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", 
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

  // 4. Smooth scroll function
  const scrollTo = (id) => {
    const element = document.getElementById(id) || document.getElementById(id.toLowerCase());
    
    if (element) {
      setActive(id);
      setIsOpen(false); 
      setIsHovered(false);

      // Increased offset to 100 to account for navbar height
      const offset = 100; 
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
    <>
      {/* Invisible trigger area for hover effects */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 z-[10001]" 
        onMouseEnter={() => setIsHovered(true)} 
      />

      <nav 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed top-0 left-0 w-full transition-all duration-300 pointer-events-auto z-[10000]
          ${(scrolled || isHovered) 
            ? "bg-[#0f071a]/90 backdrop-blur-xl border-b border-purple-500/20 shadow-2xl py-2" 
            : "bg-transparent py-4"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo and Dev Name */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => scrollTo("Home")}
            >
              <div className="w-10 h-10 rounded-xl border border-purple-500/30 p-0.5 bg-black/40 overflow-hidden group-hover:border-purple-500 transition-colors">
                <img 
                  src={AI_AVATAR_URL} 
                  alt="Urmi AI Logo" 
                  className="object-cover w-full h-full scale-125" 
                />
              </div>
              
              <div className="block">
                <span className="font-mono font-bold text-sm text-purple-400">urmi@dev</span>
                <span className="text-gray-400 font-mono text-sm">:~$</span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/5">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className={`relative px-4 py-2 rounded-xl text-[12px] font-medium transition-all duration-300 ${
                    active === item ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {active === item && (
                    <motion.div 
                      layoutId="activeGlow"
                      className="absolute inset-0 bg-purple-600/20 rounded-xl border border-purple-500/30 shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                    />
                  )}
                  <span className="relative z-10">{item}</span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-white focus:outline-none z-[10005]"
            >
              {isOpen ? <X className="w-7 h-7 text-purple-400" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Sidebar */}
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[10001] lg:hidden overflow-hidden">
              {/* Overlay / Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
                onClick={() => setIsOpen(false)} 
              />

              {/* Sidebar Content */}
              <motion.div 
                className="absolute right-0 top-0 bottom-0 w-[300px] bg-[#0f071a] border-l border-purple-500/20 p-8 flex flex-col shadow-2xl z-[10002]"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
              >
                <div className="flex items-center gap-2 mb-10 pb-4 border-b border-white/5">
                  <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                  <span className="font-mono font-bold text-purple-400 text-xs tracking-widest">URMI_MENU</span>
                </div>
          
                {/* List-wise Navigation */}
                <div className="flex flex-col gap-3 overflow-y-auto flex-grow pr-2 custom-scrollbar">
                  {NAV_ITEMS.map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollTo(item)}
                      className={`w-full text-left px-6 py-4 rounded-2xl text-[15px] font-bold transition-all duration-300 flex items-center justify-between group ${
                        active === item
                          ? "text-purple-400 bg-purple-500/10 border-l-2 border-purple-500"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span>{item}</span>
                      <span className="text-[10px] opacity-0 group-hover:opacity-50 transition-opacity font-mono">/0{NAV_ITEMS.indexOf(item) + 1}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-auto pt-8 border-t border-white/5">
                   <p className="text-[10px] font-mono text-gray-500 text-center uppercase tracking-widest">
                     Ready to build the future
                   </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}