import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { base44 } from "@/api/base44Client";
import ReactMarkdown from "react-markdown";

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
      {/* Floating button with enhanced design */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            {/* Pulsing rings */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-primary/30 blur-md"
            />
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute inset-0 rounded-full bg-accent/30 blur-md"
            />
            
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center shadow-2xl cursor-pointer overflow-hidden"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
              
              <div className="relative">
                <MessageCircle className="w-7 h-7 text-white drop-shadow-lg" />
              </div>
              
              {/* Status indicator */}
              <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500 border-2 border-background shadow-lg"></span>
              </span>
            </motion.button>
            
            {/* "Ask Me" tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="absolute right-20 top-1/2 -translate-y-1/2 bg-background/95 backdrop-blur-sm px-3 py-2 rounded-lg border border-primary/20 shadow-xl whitespace-nowrap"
            >
              <p className="text-xs font-medium text-foreground">Ask me anything! 💬</p>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-background/95 border-r border-t border-primary/20" />
            </motion.div>
          </motion.div>
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
            <div className="glass rounded-2xl overflow-hidden border-2 border-primary/30 shadow-2xl flex flex-col relative" style={{ height: "550px" }}>
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-accent to-primary opacity-20 blur-xl animate-pulse" />
              
              {/* Header */}
              <div className="relative bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 p-4 border-b border-primary/30 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden border border-primary/40">
                      <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b0fd830c520e68e043e4d9/8aebf79f3_generated_b9d18692.png" alt="Urmi" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-sm text-foreground">Virtual Urmi</span>
                        <Bot className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
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
              <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ scrollbarWidth: "thin" }}>
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "assistant" && (
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot className="w-3 h-3 text-primary" />
                      </div>
                    )}
                    <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-secondary/80 text-secondary-foreground rounded-bl-sm"
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
                      <div className="w-6 h-6 rounded-full bg-primary/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <User className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-2 items-center">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3 h-3 text-primary" />
                    </div>
                    <div className="bg-secondary/80 rounded-2xl rounded-bl-sm px-4 py-3">
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-border/50">
                <form
                  onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
                  className="flex items-center gap-2"
                >
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about my skills, projects..."
                    className="flex-1 bg-secondary/50 border-border/50 text-sm font-mono placeholder:text-muted-foreground/50 focus-visible:ring-primary/50"
                    disabled={loading}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={loading || !input.trim()}
                    className="bg-primary hover:bg-primary/80 w-9 h-9 rounded-xl"
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