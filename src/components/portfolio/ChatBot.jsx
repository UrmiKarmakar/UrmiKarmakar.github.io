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
    { role: "assistant", content: "Hi Urmi! I've updated my look. Since there is no API key yet, I am running in **Demo Mode**. How do I look?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    // DEMO MODE: This simulates an AI response since you don't have an API key yet
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I'm currently in **Demo Mode** because no API key is detected. To make me smart, you'll need to add a Gemini or OpenAI key to your .env file!" 
      }]);
      setLoading(false);
    }, 1000);
  };

  return (
    /* wrapper: w-auto ensures it doesn't block the whole screen */
    <div className="fixed bottom-0 right-0 w-auto h-auto z-[9999] p-4 md:p-6 pointer-events-none">
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="pointer-events-auto mb-4 w-[90vw] max-w-[380px] h-[550px] overflow-hidden rounded-3xl border border-white/20 shadow-2xl flex flex-col bg-slate-900/95 backdrop-blur-xl"
          >
            {/* PROFESSIONAL SQUARE GRID BACKGROUND */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
                 style={{ backgroundImage: `linear-gradient(#ffffff10 1px, transparent 1px), linear-gradient(90deg, #ffffff10 1px, transparent 1px)`, backgroundSize: '20px 20px' }} 
            />

            {/* Header */}
            <div className="relative z-10 p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/50 overflow-hidden">
                    <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b0fd830c520e68e043e4d9/8aebf79f3_generated_b9d18692.png" alt="Avatar" className="object-cover" />
                  </div>
                  {/* GREEN ACTIVE DOT */}
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-900 shadow-[0_0_10px_#22c55e]"></span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm tracking-tight">Virtual Urmi</h3>
                  <p className="text-[10px] text-green-400 font-medium uppercase tracking-widest">Online</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white rounded-full">
                <X size={20} />
              </Button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 relative z-10 custom-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  {/* ROLE ICONS */}
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${msg.role === "user" ? "bg-purple-500/20 border-purple-500/40" : "bg-primary/20 border-primary/40"}`}>
                    {msg.role === "user" ? <User size={14} className="text-purple-400" /> : <Bot size={14} className="text-primary" />}
                  </div>
                  
                  <div className={`max-w-[80%] p-3 rounded-2xl text-[13px] shadow-sm ${
                    msg.role === "user" 
                    ? "bg-primary text-white rounded-br-none" 
                    : "bg-white/10 text-slate-100 border border-white/10 rounded-bl-none"
                  }`}>
                    <ReactMarkdown className="prose prose-invert prose-sm">{msg.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="p-4 bg-white/5 border-t border-white/10 flex gap-2 z-10">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me something..."
                className="bg-black/20 border-white/10 text-white rounded-xl placeholder:text-slate-500"
              />
              <Button type="submit" disabled={!input.trim()} className="bg-primary hover:bg-primary/80 rounded-xl shrink-0">
                <Send size={16} />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher Button */}
      {!isOpen && (
        <motion.button
          layoutId="chat-toggle"
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto w-16 h-16 rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/50 bg-slate-900 group relative"
          whileHover={{ scale: 1.05 }}
        >
          <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b0fd830c520e68e043e4d9/8aebf79f3_generated_b9d18692.png" className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-primary/20">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          {/* GREEN DOT ON LAUNCHER */}
          <span className="absolute top-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></span>
        </motion.button>
      )}
    </div>
  );
}