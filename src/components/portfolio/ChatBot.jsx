import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini with your .env key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const URMI_CONTEXT = `You are "Virtual Urmi", an AI assistant for Urmi Karmakar's portfolio. 
Urmi is an AI & Backend Developer. Be professional, friendly, and concise. 
Answer only about Urmi's skills, projects (like Pylot and Calm AI), and experience.

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
    { role: "assistant", content: "Hi! I'm Virtual Urmi. How can I help you today?" }
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

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `${URMI_CONTEXT}\n\nUser: ${userMsg}\nAssistant:`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: "assistant", content: text }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: "assistant", content: "I'm having trouble connecting to my brain. Please check the API key!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 w-auto h-auto z-[9999] p-4 md:p-6 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="pointer-events-auto mb-4 w-[90vw] max-w-[380px] h-[550px] overflow-hidden rounded-3xl border border-slate-200 shadow-2xl flex flex-col bg-white/90 backdrop-blur-xl"
          >
            {/* PROFESSIONAL SQUARE GRID BACKGROUND */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" 
                 style={{ backgroundImage: `linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)`, backgroundSize: '20px 20px' }} 
            />

            {/* Header */}
            <div className="relative z-10 p-4 border-b border-slate-200 bg-white/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 overflow-hidden">
                    <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b0fd830c520e68e043e4d9/8aebf79f3_generated_b9d18692.png" alt="Avatar" className="object-cover" />
                  </div>
                  {/* GREEN ACTIVE DOT */}
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white shadow-sm"></span>
                </div>
                <div>
                  <h3 className="text-slate-900 font-bold text-sm tracking-tight">Virtual Urmi</h3>
                  <p className="text-[10px] text-green-600 font-semibold uppercase tracking-widest">Online</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 rounded-full">
                <X size={20} />
              </Button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 relative z-10">
              {messages.map((msg, i) => (
                <div key={i} className={`flex items-start gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${msg.role === "user" ? "bg-purple-100 border-purple-200" : "bg-blue-100 border-blue-200"}`}>
                    {msg.role === "user" ? <User size={14} className="text-purple-600" /> : <Bot size={14} className="text-blue-600" />}
                  </div>
                  
                  <div className={`max-w-[80%] p-3 rounded-2xl text-[13px] shadow-sm ${
                    msg.role === "user" 
                    ? "bg-slate-900 text-white rounded-tr-none" 
                    : "bg-white text-slate-700 border border-slate-200 rounded-tl-none"
                  }`}>
                    <ReactMarkdown className="prose prose-sm prose-slate">{msg.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2">
                   <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="p-4 bg-white/80 border-t border-slate-200 flex gap-2 z-10">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me something..."
                className="bg-slate-50 border-slate-200 text-slate-900 rounded-xl"
                disabled={loading}
              />
              <Button type="submit" disabled={!input.trim() || loading} className="bg-slate-900 hover:bg-slate-800 rounded-xl shrink-0">
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
          className="pointer-events-auto w-16 h-16 rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white group relative"
          whileHover={{ scale: 1.05 }}
        >
          <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b0fd830c520e68e043e4d9/8aebf79f3_generated_b9d18692.png" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/40">
            <Sparkles className="text-slate-900 w-6 h-6" />
          </div>
          <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white shadow-sm"></span>
        </motion.button>
      )}
    </div>
  );
}