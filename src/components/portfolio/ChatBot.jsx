import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Send, User, MessageSquare } from "lucide-react"; 
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
  const messagesEndRef = useRef(null);
  
  const AVATAR_URL = "/images/UK_AI.png";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const BACKEND_URL = "https://urmikarmakar-github-io.onrender.com/chat";
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      if (!response.ok) throw new Error("Backend connection failed");
      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: data.response 
      }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "My server is just waking up ✨ Give me about 30 seconds to warm up my circuits and try sending your message again." 
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

        .water-bg {
          position: relative;
          background-color: #0f071a;
          z-index: 1;
          transform: translateZ(0);
        }

        .water-bg::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 240px;
          height: 240px;
          background-image: url(${AVATAR_URL});
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.12;
          z-index: -1;
          pointer-events: none;
        }
      `}</style>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="pointer-events-auto mb-2 md:mb-4 w-[94vw] md:w-[380px] h-[75vh] md:h-[600px] overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-purple-500/30 shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col water-bg backdrop-blur-lg"
          >
            {/* Header */}
            <div className="relative z-10 p-4 md:p-5 border-b border-purple-500/20 bg-purple-950/40 backdrop-blur-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {/* Avatar Zoom applied here */}
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border-2 border-purple-400/40 p-0.5 bg-black/40 overflow-hidden">
                    <img src={AVATAR_URL} alt="Urmi AI" className="object-cover object-center w-full h-full scale-125 rounded-lg md:rounded-xl" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#0f071a] rounded-full z-10">
                    <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm md:text-base tracking-tight">Urmi_AI</h3>
                  <p className="text-[9px] md:text-[10px] text-purple-300 font-black uppercase tracking-[0.15em]">Tech Bestie ✨</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white hover:bg-white/10 rounded-full h-8 w-8">
                <X size={18} />
              </Button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-5 relative z-10 custom-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex items-start gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                    msg.role === "user" ? "bg-purple-600/30 border-purple-400/40" : "bg-black/60 border-purple-500/40 overflow-hidden"
                  }`}>
                    {msg.role === "user" ? (
                      <User size={12} className="text-purple-200" />
                    ) : (
                      <img 
                        src={AVATAR_URL} 
                        className="w-full h-full object-cover object-center scale-125" 
                        alt="AI" 
                      />
                    )}
                  </div>
                  
                  <div className={`max-w-[82%] p-3 md:p-3.5 rounded-2xl text-[12px] md:text-[13px] leading-relaxed ${
                    msg.role === "user" 
                    ? "bg-purple-600/90 text-white rounded-tr-none" 
                    : "bg-black/70 text-purple-50 border border-purple-500/10 rounded-tl-none backdrop-blur-sm"
                  }`}>
                    <ReactMarkdown className="prose prose-invert prose-sm max-w-none">{msg.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-3 animate-pulse">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-purple-500/10" />
                  <div className="h-7 w-16 bg-purple-500/10 rounded-xl" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <form onSubmit={sendMessage} className="p-3 md:p-4 bg-purple-950/40 border-t border-purple-500/10 backdrop-blur-md flex gap-2 z-10">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me about Urmi ✨"
                className="bg-black/40 border-purple-500/20 text-white rounded-xl placeholder:text-purple-300/30 focus:ring-purple-500/40 h-10 md:h-11"
                disabled={loading}
              />
              <Button type="submit" disabled={!input.trim() || loading} className="bg-purple-600 hover:bg-purple-500 text-white rounded-xl px-3 md:px-4 h-10 md:h-11 shadow-lg shadow-purple-600/10 transition-all active:scale-95">
                <Send size={16} />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      {!isOpen && (
        <motion.button
          layoutId="chat-toggle"
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto relative w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden shadow-xl border-2 border-purple-500/40 bg-[#0f071a]"
          whileHover={{ scale: 1.1 }}
        >
          <img src={AVATAR_URL} className="w-full h-full object-cover scale-125 opacity-80" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-green-500 border-2 border-[#0f071a] rounded-full z-20">
            <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>
          </span>
        </motion.button>
      )}
    </div>
  );
}