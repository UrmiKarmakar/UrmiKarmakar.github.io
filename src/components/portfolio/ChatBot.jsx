import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, Loader2, Sparkles, User } from "lucide-react";
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
    { role: "assistant", content: "Hey! I'm Virtual Urmi 👋 Ask me anything!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

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
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `${URMI_CONTEXT}\nUser: ${userMsg}\nUrmi:`,
      });
      setMessages(prev => [...prev, { role: "assistant", content: typeof response === "string" ? response : JSON.stringify(response) }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    /* CRITICAL FIX: Ensure the outer div is NOT blocking clicks on the rest of the site */
    <div className="fixed bottom-0 right-0 w-auto h-auto z-[9999] p-6 pointer-events-none">
      
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            /* pointer-events-auto ensures ONLY the chat window catches clicks */
            className="pointer-events-auto mb-4 w-[90vw] max-w-[400px] h-[600px] overflow-hidden rounded-3xl border border-white/10 shadow-2xl flex flex-col relative bg-[#0a0a0f]"
          >
            {/* --- ANIMATED BACKGROUND --- */}
            <div className="absolute inset-0 z-0 opacity-20">
               <motion.div 
                 animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }} 
                 transition={{ duration: 10, repeat: Infinity }}
                 className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/30 to-transparent blur-3xl" 
               />
               <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '20px 20px' }} />
            </div>

            {/* Header */}
            <div className="relative z-10 p-4 border-b border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full border border-primary/50 overflow-hidden">
                    <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b0fd830c520e68e043e4d9/8aebf79f3_generated_b9d18692.png" alt="Avatar" />
                  </div>
                  {/* GREEN DOT */}
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0a0a0f] shadow-[0_0_5px_#22c55e]"></div>
                </div>
                <span className="text-white font-bold text-sm">Virtual Urmi</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
                <X size={18} />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10 custom-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  {/* CHAT ICONS */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${msg.role === "user" ? "bg-accent/20 border-accent/30" : "bg-primary/20 border-primary/30"}`}>
                    {msg.role === "user" ? <User size={14} className="text-accent" /> : <Bot size={14} className="text-primary" />}
                  </div>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === "user" ? "bg-primary text-white rounded-tr-none" : "bg-white/10 text-slate-100 rounded-tl-none border border-white/10"}`}>
                    <ReactMarkdown className="prose prose-invert prose-sm leading-tight">{msg.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="p-4 bg-black/60 border-t border-white/10 relative z-10 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="bg-white/5 border-white/10 text-white"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/80">
                <Send size={16} />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher */}
      {!isOpen && (
        <motion.button
          layoutId="chat-toggle"
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto w-16 h-16 rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/50 relative"
        >
          <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b0fd830c520e68e043e4d9/8aebf79f3_generated_b9d18692.png" className="w-full h-full object-cover" />
          <div className="absolute top-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
        </motion.button>
      )}
    </div>
  );
}