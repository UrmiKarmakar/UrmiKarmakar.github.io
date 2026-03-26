import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const PROJECTS = [
  {
    title: "Calm AI",
    description: "AI-powered meditation app combining natural language generation, expressive voice synthesis, and ambient sound mixing for personalized sessions.",
    tags: ["Python", "Django", "NLP", "Voice Synthesis", "AI"],
    architecture: "Client → Django REST → LLM Engine → TTS → Audio Mixer → Response",
    github: "https://github.com/UrmiKarmakar/Calm-AI-Meditation-App-Backend-Django",
    color: "purple",
  },
  {
    title: "NexMail AI",
    description: "AI-powered cold email assistant with NLP capabilities for personalized, context-aware email generation and campaign management.",
    tags: ["Python", "Django", "NLP", "OpenAI", "REST API"],
    architecture: "User Input → NLP Pipeline → Template Engine → Email API → Analytics",
    github: "https://github.com/UrmiKarmakar",
    link: "https://nexmail-ai.thenexgenix.com/",
    color: "pink",
  },
  {
    title: "Breast Cancer Classification",
    description: "ML project using SVM for classifying breast cancer data with comprehensive preprocessing and model evaluation with accuracy measurement.",
    tags: ["Python", "scikit-learn", "SVM", "Jupyter", "ML"],
    architecture: "Dataset → Preprocessing → Feature Engineering → SVM Model → Evaluation",
    github: "https://github.com/UrmiKarmakar/Breast-Cancer-Classification-and-Evaluation-with-Multiple-Machine-Learning-Models",
    color: "blue",
  },
  {
    title: "AI Chatbot RAG Backend",
    description: "Backend-only AI Chatbot with RAG pipeline, JWT authentication, chat history storage, and background task scheduling.",
    tags: ["Django REST", "RAG", "JWT", "PostgreSQL", "AI"],
    architecture: "Auth → Query → RAG Retriever → LLM → Response Cache → History",
    github: "https://github.com/UrmiKarmakar/AI-Chatbot-Rag-Backend",
    color: "violet",
  },
  {
    title: "Leukemia Classification",
    description: "Deep learning model classifying six leukemia types using custom CNN, VGG16, and ResNet50 with comprehensive evaluation.",
    tags: ["TensorFlow", "CNN", "VGG16", "ResNet50", "Medical AI"],
    architecture: "Images → Augmentation → CNN/VGG16/ResNet50 → Softmax → Classification",
    github: "https://github.com/UrmiKarmakar/Leukemia-Classification-with-Deep-Learning-Model",
    color: "cyan",
  },
  {
    title: "Skincare Chatbot API",
    description: "Smart skincare chatbot built with Django REST Framework and OpenAI API providing personalized skincare guidance and routine tips.",
    tags: ["Django REST", "OpenAI", "Python", "REST API"],
    architecture: "User Query → Intent Detection → OpenAI → Skincare DB → Response",
    github: "https://github.com/UrmiKarmakar/Skincare-Chatbot-Django-API",
    color: "pink",
  },
];

export default function ProjectsSection() {
  return (
    <section id="Projects" className="py-24 px-4 sm:px-6 relative">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-primary text-sm mb-2 block">// projects</span>
          <h2 className="text-3xl sm:text-4xl font-bold glow-text">Featured Work</h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-sm">
            A selection of AI, ML, and backend engineering projects with real-world impact
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}