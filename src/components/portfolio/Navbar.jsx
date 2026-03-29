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

  // 3. Update active state based on section visibility (Intersection Observer)
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
    <>
      {/* Invisible trigger area for hover effects */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 z-[10001]" 
        onMouseEnter={() => setIsHovered(true)} 
      />

      <nav 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        // Forced inline styles to override any potential CSS conflicts
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 10000 }}
        className={`transition-all duration-300 pointer-events-auto
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

            {/* Mobile Menu Toggle - Keep this one! */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-white focus:outline-none z-[10002]"
            >
              {/* Add a conditional class to the X icon so it turns purple when open */}
              {isOpen ? <X className="w-6 h-6 text-purple-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Sidebar */}
          <AnimatePresence>
            {isOpen && (
              <div className="fixed inset-0 z-[10001] lg:hidden">
                {/* Backdrop - Increased opacity to 95% to fully hide the "crashing" background items */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/95 backdrop-blur-xl" 
                  onClick={() => setIsOpen(false)} 
                />

                {/* Sidebar - Uses 100dvh to prevent mobile browser cropping */}
                <motion.div 
                  className="absolute right-0 top-0 h-[100dvh] w-[280px] bg-[#0f071a] border-l border-purple-500/20 p-6 flex flex-col shadow-2xl"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                >
                  <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                      <span className="font-mono font-bold text-purple-400 text-xs tracking-widest">MENU</span>
                    </div>
                  </div>
            
                  {/* Scrollable Items Area */}
                  <div className="flex flex-col gap-2 overflow-y-auto flex-grow pr-2 custom-scrollbar pb-20">
                    {NAV_ITEMS.map((item) => (
                      <button
                        key={item}
                        onClick={() => scrollTo(item)}
                        className={`w-full text-left px-6 py-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                          active === item
                            ? "text-purple-400 bg-purple-500/10 border-l-2 border-purple-500"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  
                  {/* Optional: Footer inside sidebar to keep it grounded */}
                  <div className="pt-6 border-t border-white/5 text-center">
                       <span className="text-[10px] font-mono text-gray-500">urmi@portfolio v2.0</span>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
      </nav>
    </>
  );
}