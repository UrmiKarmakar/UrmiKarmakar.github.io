import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { base44 } from "@/api/base44Client";
import ReactMarkdown from "react-markdown";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const URMI_CONTEXT = `You are "Virtual Urmi" — a personalized AI assistant that ONLY answers questions about Urmi Karmakar. You speak in first person as if you ARE Urmi. Be friendly, professional, and concise.

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
    { role: "assistant", content: "Hey! I'm Virtual Urmi 👋 Ask me anything about my skills, projects, experience, or education!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    const conversationHistory = messages.map(m => `${m.role === "user" ? "User" : "Urmi"}: ${m.content}`).join("\n");

    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `${URMI_CONTEXT}\n\nConversation so far:\n${conversationHistory}\nUser: ${userMsg}\nUrmi:`,
    });

    setMessages(prev => [...prev, { role: "assistant", content: response }]);
    setLoading(false);
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(true)}
                  className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-lg overflow-hidden shadow-2xl border-2 border-primary/40 cursor-pointer bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm relative"
                >
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b0fd830c520e68e043e4d9/8aebf79f3_generated_b9d18692.png" 
                    alt="Virtual Urmi" 
                    className="w-full h-full object-cover"
                  />
                  <span 
                    className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-background animate-pulse" 
                    style={{ boxShadow: "0 0 10px rgba(74, 222, 128, 0.9)" }}
                  />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="left" className="bg-card border-primary/30 text-foreground">
                <p className="text-xs font-medium">💬 Chat with Virtual Urmi</p>
                <p className="text-xs text-muted-foreground">Ask anything about Urmi!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-sm"
          >
            <div className="rounded-2xl overflow-hidden border-2 border-primary/30 shadow-2xl flex flex-col relative" style={{ height: "550px", background: "linear-gradient(135deg, hsl(230, 25%, 8%) 0%, hsl(260, 30%, 11%) 25%, hsl(280, 35%, 13%) 50%, hsl(260, 30%, 11%) 75%, hsl(230, 25%, 8%) 100%)" }}>
              {/* Circuit board pattern */}
              <div className="absolute inset-0 opacity-8">
                <div className="absolute inset-0" style={{ 
                  backgroundImage: 'linear-gradient(90deg, hsl(270, 80%, 65%) 1px, transparent 1px), linear-gradient(hsl(270, 80%, 65%) 1px, transparent 1px)',
                  backgroundSize: '50px 50px'
                }} />
                <div className="absolute inset-0" style={{ 
                  backgroundImage: 'radial-gradient(circle at 25px 25px, hsl(290, 70%, 55%) 2px, transparent 2px)',
                  backgroundSize: '50px 50px'
                }} />
              </div>
              
              {/* Animated gradient waves */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: "linear-gradient(45deg, transparent 30%, hsl(270, 80%, 65%) 50%, transparent 70%)",
                    backgroundSize: "200% 200%"
                  }}
                />
              </div>
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/8 pointer-events-none" />
              
              {/* Floating graphics for chatbot - new themed */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute top-20 left-8 w-10 h-10 border border-primary/25 rounded-lg"
                  style={{ transform: "rotate(30deg)" }}
                />
                <motion.div
                  animate={{
                    y: [0, 25, 0],
                    rotate: [-360, 0],
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute top-36 right-6 w-8 h-8 border border-accent/25 rounded-full"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.2, 0.35, 0.2],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute bottom-32 left-10 w-14 h-14 bg-gradient-to-br from-violet-500/20 to-transparent rounded-full"
                />
                <motion.div
                  animate={{
                    x: [-8, 8, -8],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute bottom-24 right-8 w-7 h-7 border-2 border-pink-500/25"
                  style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
                />
                <motion.div
                  animate={{
                    rotate: [0, -90, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-1/2 left-6 w-6 h-6 border border-cyan-500/25"
                  style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
                />
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.25, 0.4, 0.25],
                  }}
                  transition={{
                    duration: 16,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-2/3 right-12 w-12 h-12 border border-primary/20 rounded-lg"
                />
                <motion.div
                  animate={{
                    x: [0, 10, 0],
                    rotate: [0, 45, 0],
                  }}
                  transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-28 right-16 w-9 h-9 border-2 border-violet-500/20 rounded-lg"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.15, 0.3, 0.15],
                  }}
                  transition={{
                    duration: 11,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute bottom-40 right-20 w-11 h-11 bg-gradient-to-br from-pink-500/15 to-transparent rounded-full"
                />
              </div>
              
              {/* Header */}
              <div className="relative bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 backdrop-blur-md p-4 border-b border-primary/20 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary/50 shadow-lg">
                      <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b0fd830c520e68e043e4d9/8aebf79f3_generated_b9d18692.png" alt="Virtual Urmi" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-sm text-foreground">Virtual Urmi</span>
                        <Bot className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-muted-foreground">Online — Ask me anything</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="w-8 h-8 text-muted-foreground hover:text-foreground">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="relative flex-1 overflow-y-auto p-4 space-y-3" style={{ scrollbarWidth: "thin" }}>
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "assistant" && (
                      <div className="w-7 h-7 rounded-full overflow-hidden border border-primary/40 flex-shrink-0 mt-0.5 bg-gradient-to-br from-primary/20 to-accent/20">
                        <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b0fd830c520e68e043e4d9/8aebf79f3_generated_b9d18692.png" alt="Virtual Urmi" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm shadow-lg ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-br-sm border border-primary/30"
                        : "bg-gradient-to-br from-secondary/90 to-secondary/70 text-secondary-foreground rounded-bl-sm border border-primary/20 backdrop-blur-sm"
                    }`}>
                      {msg.role === "assistant" ? (
                        <ReactMarkdown className="prose prose-sm prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 text-sm leading-relaxed">
                          {msg.content}
                        </ReactMarkdown>
                      ) : (
                        <p className="leading-relaxed">{msg.content}</p>
                      )}
                    </div>
                    {msg.role === "user" && (
                      <div className="relative w-7 h-7 rounded-full bg-gradient-to-br from-primary via-accent to-pink-500 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg border border-white/20">
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-2 items-center">
                    <div className="w-7 h-7 rounded-full overflow-hidden border border-primary/40 flex-shrink-0 bg-gradient-to-br from-primary/20 to-accent/20">
                      <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b0fd830c520e68e043e4d9/8aebf79f3_generated_b9d18692.png" alt="Virtual Urmi" className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-gradient-to-br from-secondary/90 to-secondary/70 rounded-2xl rounded-bl-sm px-4 py-3 border border-primary/20 shadow-lg">
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="relative p-3 border-t border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-md">
                <form
                  onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
                  className="flex items-center gap-2"
                >
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about my skills, projects..."
                    className="flex-1 bg-background/60 border-primary/30 text-sm font-mono placeholder:text-muted-foreground/60 focus-visible:ring-primary/50 backdrop-blur-sm shadow-inner"
                    disabled={loading}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={loading || !input.trim()}
                    className="bg-gradient-to-br from-primary to-accent hover:from-primary/90 hover:to-accent/90 w-10 h-10 rounded-xl shadow-lg border border-primary/30"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}