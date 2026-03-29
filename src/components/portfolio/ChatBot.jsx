import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Send, User } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: "assistant", 
      content: "Hey I'm **Urmi_AI**. Ready to gossip about tech or walk you through Urmi's amazing portfolio? ✨" 
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewportHeight, setViewportHeight] = useState("auto");
  const messagesEndRef = useRef(null);
  
  const AVATAR_URL = "/images/UK_AI.png";

  useEffect(() => {
    if (!isOpen) return;
    const handleResize = () => {
      if (window.visualViewport) {
        setViewportHeight(`${window.visualViewport.height}px`);
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    };
    window.visualViewport?.addEventListener("resize", handleResize);
    handleResize();
    return () => window.visualViewport?.removeEventListener("resize", handleResize);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const response = await fetch("https://urmikarmakar-github-io.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      if (!response.ok) throw new Error("Connection failed");
      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "My server is waking up ✨ Give me about 30 seconds to warm up circuits and try again." 
      }]);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="fixed bottom-0 right-0 w-full md:w-auto h-auto z-[9999] p-3 md:p-6 pointer-events-none flex flex-col items-end">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(147, 51, 234, 0.5); border-radius: 10px; }
        .water-bg { position: relative; background-color: #0f071a; z-index: 1; }
        .water-bg::before {
          content: ""; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 180px; height: 180px; background-image: url(${AVATAR_URL});
          background-size: contain; background-position: center; background-repeat: no-repeat;
          opacity: 0.15; z-index: -1; pointer-events: none;
        }
      `}</style>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{ height: viewportHeight }}
            className="pointer-events-auto mb-2 md:mb-4 w-full md:w-[350px] md:h-[420px] max-h-[80vh] overflow-hidden rounded-[1.5rem] border border-purple-500/30 shadow-2xl flex flex-col water-bg backdrop-blur-lg"
          >
            {/* Header */}
            <div className="p-3 border-b border-purple-500/20 bg-purple-950/40 backdrop-blur-md flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full border border-purple-400/40 p-0.5 bg-black/40">
                  <img src={AVATAR_URL} className="w-full h-full object-cover rounded-full scale-110" alt="Urmi AI" />
                  {/* Green dot 1: Top Right of Header Icon */}
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#0f071a] animate-pulse shadow-[0_0_8px_#22c55e]"></span>
                </div>
                <div className="flex flex-col text-left">
                  <h3 className="text-white font-bold text-sm tracking-tight leading-tight">Urmi_AI</h3>
                  {/* Enhanced Subtitle with Gradient Animation */}
                  <span className="text-[9px] font-black uppercase tracking-[0.1em] bg-gradient-to-r from-green-400 via-purple-300 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
                    Urmi’s Digital Shadow
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white hover:bg-white/5 h-8 w-8">
                <X size={18} />
              </Button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex items-start gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
                    msg.role === "user" ? "bg-purple-600/30 border-purple-400/40" : "bg-black/60 border-purple-500/40 overflow-hidden"
                  }`}>
                    {msg.role === "user" ? <User size={12} className="text-purple-200" /> : <img src={AVATAR_URL} className="w-full h-full object-cover scale-110" />}
                  </div>
                  <div className={`max-w-[85%] p-2.5 rounded-xl text-[12px] leading-relaxed ${
                    msg.role === "user" ? "bg-purple-600 text-white rounded-tr-none" : "bg-black/70 text-purple-50 border border-purple-500/10 rounded-tl-none shadow-sm"
                  }`}>
                    <ReactMarkdown className="prose prose-invert prose-sm">{msg.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2 items-center text-purple-300 text-[10px] pl-9 animate-pulse font-mono uppercase italic">
                  <span>Processing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="p-3 bg-purple-950/40 border-t border-purple-500/10 flex gap-2 shrink-0">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Talk to me..."
                className="bg-black/40 border-purple-500/20 text-white rounded-lg h-9 text-xs focus:border-purple-500/50"
                disabled={loading}
              />
              <Button type="submit" disabled={!input.trim() || loading} className="bg-purple-600 hover:bg-purple-500 px-3 h-9 transition-transform active:scale-95">
                <Send size={14} />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          layoutId="chat-toggle"
          onClick={() => setIsOpen(true)}
          // Standardized size for the button bubble
          className="relative pointer-events-auto w-14 h-14 rounded-full shadow-2xl border-2 border-purple-500/40 bg-[#0f071a]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src={AVATAR_URL} className="w-full h-full object-cover rounded-full scale-110 opacity-90" />
          {/* Green dot 2: Top Right of Floating Button */}
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0f071a] animate-pulse shadow-[0_0_10px_#22c55e]"></span>
        </motion.button>
      )}
    </div>
  );
}