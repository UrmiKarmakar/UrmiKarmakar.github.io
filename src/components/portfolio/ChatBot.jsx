import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, Loader2, Sparkles, User, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { base44 } from "@/api/base44Client";
import ReactMarkdown from "react-markdown";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const URMI_CONTEXT = `You are "Virtual Urmi" — a personalized AI assistant for Urmi Karmakar. 
Answer in first person. Be professional and concise. ONLY discuss Urmi's skills, projects, and education.

Here is everything about Urmi:

NAME: Urmi Karmakar
ROLE: Jr. AI & Backend Developer at Sparktech IT Limited (Betopia Group), Dhaka, Bangladesh (Oct 2025 – Present)
EMAIL: urmi16kk@gmail.com
GITHUB: https://github.com/UrmiKarmakar
PORTFOLIO: https://sites.google.com/view/urmikarmakar

EDUCATION:
- BSc in Computer Science & Engineering from AIUB (2022-2025), CGPA: 3.85
- HSC from Udayan Uchcha Madhyamik Bidyalaya (2020), GPA: 5.00
- SSC from K.L. Jubilee School & College (2018), GPA: 5.00

WORK EXPERIENCE:
1. Jr. AI & Backend Developer at Sparktech IT Limited (Oct 2025 – Present): Developing AI-driven features using Django, DRF, Python. Implementing scalable AI models.
2. AI Research & Backend Development Intern at The NexGenix Ltd., CUET (Mar 2025 – Sep 2025): Deep learning, NLP, computer vision research. Python backend with MongoDB/PostgreSQL.
3. Data Science Intern at Cognifyz Technologies, India (Dec 2024 – Jan 2025): Data preprocessing, EDA, feature engineering.

TECHNICAL SKILLS:
- AI/ML: Python, TensorFlow, PyTorch, scikit-learn, Deep Learning, NLP, Computer Vision
- Backend: Django, Django REST Framework, FastAPI, RESTful APIs, GraphQL, n8n
- Languages: Python, R, C, C++, Java, C#, JavaScript, HTML, CSS
- Databases: MySQL, PostgreSQL, MongoDB, Oracle
- Tools: Git, GitHub, Docker, Figma, Linux

KEY PROJECTS:
- Calm AI: AI-powered meditation app with voice synthesis & ambient audio (Django)
- NexMail AI: AI email assistant with NLP (Django) — https://nexmail-ai.thenexgenix.com/
- Breast Cancer Classification: ML models (SVM) for cancer detection
- AI Chatbot RAG Backend: RAG pipeline with JWT auth (Django REST)
- Leukemia Classification: Deep learning with CNN, VGG16, ResNet50
- Skincare Chatbot: Django REST API with OpenAI
- Apple Leaf Disease Classification: Weather-augmented disease prediction
- MIRNet with CNNs: Image restoration
- Heart Disease Analysis: Correlation analysis & visualization
- MNIST Digit Classification: Keras neural network
- Laptop Price Prediction: ML regression models
- Restaurant Data Analysis: EDA and predictive modeling

All projects available on GitHub: https://github.com/UrmiKarmakar

AWARDS: Dean's List/Dean's Honorable Mention, Department of Computer Science, AIUB
VOLUNTEERING: General Secretary of AIUB Community of Engineering Students (ACES)

CERTIFICATIONS: Google Generative AI, Cognifyz Data Science, NexGenix AI & Backend, AI & ML with Python (ITBI CUET), Arduino IoT (Code-19), Python Programming (Bohubrihi), Problem Solving (Ostad), Data Science Fundamentals (Ostad), ML Algorithms (Uniathena, Simplilearn), Python Libraries for DS (Simplilearn)

SOFT SKILLS: Analytical thinking, problem-solving, communication, teamwork, leadership, public speaking, quick learning
LANGUAGES: Bangla (Native), English (Fluent)

RULES:
- ONLY answer questions about Urmi Karmakar
- If asked about unrelated topics, politely redirect: "I can only share information about Urmi. What would you like to know about her skills, projects, or experience?"
- Be enthusiastic and professional
- Keep answers concise but informative`;

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hey! I'm Virtual Urmi 👋 Ask me anything about my skills, projects, or experience!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const conversationHistory = messages
        .map(m => `${m.role === "user" ? "User" : "Urmi"}: ${m.content}`)
        .join("\n");

      // Attempting API Call
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `${URMI_CONTEXT}\n\nHistory:\n${conversationHistory}\nUser: ${userMsg}\nUrmi:`,
      });

      const contentString = typeof response === "string" ? response : JSON.stringify(response);
      setMessages(prev => [...prev, { role: "assistant", content: contentString }]);
    } catch (error) {
      console.error("CRITICAL ERROR:", error);
      setMessages(prev => [...prev, { role: "assistant", content: "I encountered a connection error. Please check your internet or API key!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 w-full z-[9999] flex flex-col items-end p-6 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="pointer-events-auto mb-6 w-[95vw] max-w-[420px] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col relative bg-[#050505]"
            style={{ height: "650px" }}
          >
            {/* --- NEW FLOATING GRAPHICS BACKGROUND --- */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, 50, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-10 left-10 w-32 h-32 bg-primary/30 rounded-full blur-[60px]" 
              />
              <motion.div 
                animate={{ scale: [1, 1.5, 1], x: [0, -40, 0], y: [0, -20, 0] }}
                transition={{ duration: 12, repeat: Infinity }}
                className="absolute bottom-20 right-10 w-40 h-40 bg-purple-600/20 rounded-full blur-[80px]" 
              />
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#ffffff05 1px, transparent 1px), linear-gradient(90deg, #ffffff05 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            </div>

            {/* Header */}
            <div className="relative z-10 p-5 border-b border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-2 border-primary/50 p-0.5">
                    <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b0fd830c520e68e043e4d9/8aebf79f3_generated_b9d18692.png" className="w-full h-full rounded-full object-cover" />
                  </div>
                  {/* PULSING GREEN DOT */}
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-[3px] border-black">
                    <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold text-base leading-none">Virtual Urmi</h4>
                  <p className="text-green-400 text-[10px] font-medium tracking-widest uppercase mt-1">Active Now</p>
                </div>
              </div>
              <Button onClick={() => setIsOpen(false)} variant="ghost" size="icon" className="text-white/40 hover:text-white hover:bg-white/10 rounded-full">
                <X size={20} />
              </Button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 relative z-10 custom-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  {/* CHAT ICONS */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                    msg.role === "user" ? "bg-purple-600/20 border-purple-500/30" : "bg-primary/20 border-primary/30"
                  }`}>
                    {msg.role === "user" ? <User size={18} className="text-purple-400" /> : <Bot size={18} className="text-primary" />}
                  </div>

                  <div className={`max-w-[80%] p-4 rounded-2xl text-[14px] leading-relaxed shadow-2xl ${
                    msg.role === "user" 
                    ? "bg-primary text-white rounded-tr-none shadow-primary/20" 
                    : "bg-white/10 text-slate-100 backdrop-blur-md rounded-tl-none border border-white/10"
                  }`}>
                    <ReactMarkdown className="prose prose-invert prose-sm">{msg.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-3">
                   <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Loader2 size={18} className="text-primary animate-spin" />
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="p-4 bg-black/60 border-t border-white/10 backdrop-blur-xl z-10 flex gap-3">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Urmi a question..."
                className="bg-white/5 border-white/10 text-white rounded-xl focus-visible:ring-primary h-12"
              />
              <Button type="submit" disabled={loading || !input.trim()} className="h-12 w-12 rounded-xl bg-primary hover:bg-primary/80 shrink-0">
                <Send size={18} />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher Button */}
      {!isOpen && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                layoutId="chat-toggle"
                onClick={() => setIsOpen(true)}
                className="pointer-events-auto w-20 h-20 rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(168,85,247,0.5)] border-2 border-primary/50 bg-black group relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b0fd830c520e68e043e4d9/8aebf79f3_generated_b9d18692.png" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Sparkles className="text-white w-8 h-8 animate-pulse" />
                </div>
                {/* LAUNCHER GREEN DOT */}
                <div className="absolute top-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-black border-primary/50 text-white">
              <p>Chat with Virtual Urmi</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}