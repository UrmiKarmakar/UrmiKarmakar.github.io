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
  const messagesEndRef = useRef(null);
  
  const AVATAR_URL = "/images/UK_AI.png";

// Handle Mobile Keyboard / Viewport sizing
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

    const [viewportHeight, setViewportHeight] = useState("auto");

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
          width: 250px; height: 250px; background-image: url(${AVATAR_URL});
          background-size: contain; background-position: center; background-repeat: no-repeat;
          opacity: 0.35; z-index: -1; pointer-events: none;
        }
      `}</style>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{ height: viewportHeight }}
            className="pointer-events-auto mb-2 md:mb-4 w-full md:w-[380px] md:h-[600px] overflow-hidden rounded-t-[2rem] md:rounded-[2.5rem] border border-purple-500/30 shadow-2xl flex flex-col water-bg backdrop-blur-lg"
          >
            {/* Header */}
            <div className="p-4 border-b border-purple-500/20 bg-purple-950/40 backdrop-blur-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl border-2 border-purple-400/40 p-0.5 bg-black/40 overflow-hidden">
                  <img src={AVATAR_URL} className="w-full h-full object-cover scale-125" alt="Urmi AI" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm tracking-tight">Urmi_AI</h3>
                  <p className="text-[10px] text-purple-300 font-black uppercase tracking-widest">Online</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white">
                <X size={20} />
              </Button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex items-start gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                    msg.role === "user" ? "bg-purple-600/30 border-purple-400/40" : "bg-black/60 border-purple-500/40 overflow-hidden"
                  }`}>
                    {msg.role === "user" ? <User size={14} className="text-purple-200" /> : <img src={AVATAR_URL} className="w-full h-full object-cover scale-125" />}
                  </div>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-[13px] ${
                    msg.role === "user" ? "bg-purple-600 text-white rounded-tr-none" : "bg-black/70 text-purple-50 border border-purple-500/10 rounded-tl-none"
                  }`}>
                    <ReactMarkdown className="prose prose-invert prose-sm">{msg.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2 items-center text-purple-300 text-xs pl-10 animate-pulse">
                  <span>typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="p-4 bg-purple-950/40 border-t border-purple-500/10 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message Urmi_AI..."
                className="bg-black/40 border-purple-500/20 text-white rounded-xl h-11"
                disabled={loading}
              />
              <Button type="submit" disabled={!input.trim() || loading} className="bg-purple-600 hover:bg-purple-500 px-4 h-11">
                <Send size={18} />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          layoutId="chat-toggle"
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto w-16 h-16 rounded-2xl overflow-hidden shadow-xl border-2 border-purple-500/40 bg-[#0f071a]"
          whileHover={{ scale: 1.05 }}
        >
          <img src={AVATAR_URL} className="w-full h-full object-cover scale-125 opacity-90" />
        </motion.button>
      )}
    </div>
  );
}