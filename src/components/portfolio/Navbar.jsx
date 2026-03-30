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

  // Handle scroll styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync active state with URL Hash
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

  // Intersection Observer for highlighting
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
    <>
      <nav 
        /* FIXED: Added 'flex justify-center' and removed 'right-0' to keep it centered and compact */
        className={`fixed top-4 left-0 right-0 z-[50] flex justify-center transition-all duration-300 pointer-events-none px-4`}
      >
        <div className={`
          /* FIXED: Changed from max-w-7xl to max-w-fit for the 'pill' look */
          max-w-fit mx-auto px-4 sm:px-6 flex items-center gap-8 h-14 
          pointer-events-auto rounded-2xl border transition-all duration-300
          ${scrolled 
            ? "bg-[#0f071a]/90 backdrop-blur-md border-purple-500/30 shadow-[0_0_20px_rgba(0,0,0,0.5)]" 
            : "bg-[#0f071a]/40 backdrop-blur-sm border-white/5"
          }
        `}>
          
          {/* Logo Section */}
          <div
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            onClick={() => scrollTo("Home")}
          >
            <div className="w-8 h-8 rounded-lg border border-purple-500/30 p-0.5 bg-black/40 overflow-hidden group-hover:border-purple-500 transition-colors">
              <img 
                src={AI_AVATAR_URL} 
                alt="Logo" 
                className="object-cover w-full h-full scale-125" 
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-mono font-bold text-xs text-purple-400">urmi@dev</span>
            </div>
          </div>

          {/* Desktop Menu - Compact gap and smaller font */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.slice(0, 5).map((item) => ( // Showing first 5 to keep it tight
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`relative px-3 py-1.5 rounded-xl text-[12px] font-medium transition-all duration-300 ${
                  active === item ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {active === item && (
                  <motion.div 
                    layoutId="activeGlow"
                    className="absolute inset-0 bg-purple-600/20 rounded-xl border border-purple-500/30"
                  />
                )}
                <span className="relative z-10">{item}</span>
              </button>
            ))}
          </div>

          {/* Mobile Toggle / More Menu */}
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
              onClick={() => setIsOpen(false)} 
            />
            
            {/* Drawer Content */}
            <motion.div 
              className="absolute right-0 top-0 bottom-0 w-[280px] bg-[#0f071a] border-l border-purple-500/20 p-6 shadow-2xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-xs font-mono text-purple-400">Navigation</span>
                <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>
        
              <div className="flex flex-col gap-1 overflow-y-auto custom-scrollbar">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollTo(item)}
                    className={`w-full text-left px-5 py-4 rounded-xl text-base font-medium transition-all ${
                      active === item
                        ? "text-purple-400 bg-purple-500/10 border-l-4 border-purple-500"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}