import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Initialize API Safely
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ""; 

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

const URMI_CONTEXT = `You are "Virtual Urmi", an AI assistant for Urmi Karmakar's portfolio. 
Urmi is an AI & Backend Developer. Be professional, friendly, and concise. 
Answer only about Urmi's skills, projects (like Pylot, Calm AI, and HandyConnect), and experience.

USER INFO FOR CONTEXT:
NAME: Urmi Karmakar
ROLE: Jr. AI & Backend Developer at Sparktech IT Limited (Betopia Group)
EDUCATION: BSc in CSE from AIUB (2022-2025), CGPA: 3.85
SKILLS: Python, Django, FastAPI, TensorFlow, PyTorch, n8n, Docker, Flutter.
PROJECTS: 
- Pylot: AI-integrated task management app (FastAPI/Django/Supabase).
- HandyConnect: Service marketplace with OTP/JWT auth.
- Calm AI: Meditation app backend.
- Thesis: Dual-Domain Segmentation Framework for Class Imbalance.

RULES: 
- ALWAYS be helpful and brief. 
- If asked about unrelated topics, say: "I'd love to chat more, but I'm here to discuss Urmi's professional work!"`;

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hey! I'm Virtual Urmi. Ask me anything about my work or experience!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Ensure this image exists in your /public/images/ folder
  const AVATAR_URL = "/images/UK_AI.png";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    if (!genAI) {
      setMessages(prev => [...prev, 
        { role: "user", content: input.trim() },
        { role: "assistant", content: "I'm currently offline. Please try again later!" }
      ]);
      return;
    }

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const fullPrompt = `${URMI_CONTEXT}\n\nUser: ${userMsg}\nAssistant:`;

      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      setMessages(prev => [...prev, { role: "assistant", content: response.text() }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I'm having trouble connecting to my brain right now. Please check your API key or connection!" 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 w-full md:w-auto h-auto z-[9999] p-4 md:p-6 pointer-events-none flex flex-col items-end">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #9333ea; border-radius: 10px; }

        .water-bg {
          position: relative;
          background-color: #0f071a;
          z-index: 1; /* Ensures container is the stack base */
        }

        .water-bg::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%); /* This centers the avatar perfectly */
          width: 280px; /* Adjust size so it's not "too big" */
          height: 280px;
          background-image: url(${AVATAR_URL});
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.15; /* Keeps it subtle so you can read the chat */
          z-index: -1; /* This moves it BEHIND the messages */
          pointer-events: none;
        }
      `}</style>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="pointer-events-auto mb-4 w-full max-w-[380px] h-[80vh] md:h-[600px] overflow-hidden rounded-[2.5rem] border border-purple-500/30 shadow-[0_0_50px_rgba(147,51,234,0.3)] flex flex-col water-bg backdrop-blur-xl"
          >
            {/* Header */}
            <div className="relative z-10 p-5 border-b border-purple-500/20 bg-purple-950/40 backdrop-blur-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl border-2 border-purple-400/50 p-0.5 bg-black/40">
                    <img src={AVATAR_URL} alt="Urmi AI" className="object-cover w-full h-full rounded-xl" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-[3px] border-[#0f071a] shadow-[0_0_10px_#22c55e]"></span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-base tracking-tight">Virtual Urmi</h3>
                  <p className="text-[10px] text-purple-300 font-black uppercase tracking-[0.2em]">Active Now</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white hover:bg-white/10 rounded-full">
                <X size={20} />
              </Button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 relative z-10 custom-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                    msg.role === "user" ? "bg-purple-600/30 border-purple-400/40" : "bg-black/60 border-purple-500/40 overflow-hidden"
                  }`}>
                    {msg.role === "user" ? <User size={14} className="text-purple-200" /> : <img src={AVATAR_URL} className="w-full h-full object-cover" />}
                  </div>
                  
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                    msg.role === "user" 
                    ? "bg-purple-600/90 text-white rounded-tr-none" 
                    : "bg-black/70 text-purple-50 border border-purple-500/20 rounded-tl-none backdrop-blur-md"
                  }`}>
                    <ReactMarkdown className="prose prose-invert prose-sm">{msg.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-3 animate-pulse">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20" />
                  <div className="h-8 w-20 bg-purple-500/20 rounded-xl" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <form onSubmit={sendMessage} className="p-4 bg-purple-950/40 border-t border-purple-500/20 backdrop-blur-md flex gap-2 z-10">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my projects..."
                className="bg-black/40 border-purple-500/30 text-white rounded-xl placeholder:text-purple-300/40 focus:ring-purple-500/50"
                disabled={loading}
              />
              <Button type="submit" disabled={!input.trim() || loading} className="bg-purple-600 hover:bg-purple-500 text-white rounded-xl px-4 shadow-lg shadow-purple-600/20">
                <Send size={18} />
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
          className="pointer-events-auto group relative w-16 h-16 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(147,51,234,0.4)] border-2 border-purple-500/50 bg-[#0f071a]"
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src={AVATAR_URL} alt="Open Chat" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent" />
          <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#0f071a] z-20"></span>
        </motion.button>
      )}
    </div>
  );
}