import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Star, GitFork } from "lucide-react";
import { Button } from "@/components/ui/button";

const ALL_REPOS = [
  {
    name: "AI-Hotel-IVR-Platform",
    description: "AI-Hotel-IVR-Platform is a scalable, AI-powered voice and chatbot-based system for hotel booking and guest services. It enables automated room reservations through AI voice calls, provides a 24/7 AI hotline for natural conversations, and manages hotel services, customer data, and billing through real-time database integration.",
    language: "Python",
    stars: 0,
    forks: 0,
    color: "purple",
  },
  {
    name: "Django-Restful-API-RAG-Chatbot",
    description: "Backend-only AI Chatbot powered by Django REST Framework with Retrieval-Augmented Generation (RAG), JWT authentication, chat history storage, and background task scheduling. Implements secure user login, vector-based document retrieval (FAISS), OpenAI integration, and automated housekeeping tasks",
    language: "Python",
    stars: 0,
    forks: 0,
    color: "blue",
  },
  {
    name: "Calm-AI-Meditation-App-Backend-Django",
    description: "Calm AI is a modular, AI-powered meditation app. It generates personalized meditation sessions by combining natural language generation, expressive voice synthesis, and ambient sound mixing. Designed for mobile integration, Calm AI delivers immersive, emotionally resonant audio experiences tailored to the user's mood and intention.",
    language: "Python",
    stars: 1,
    forks: 0,
    color: "pink",
  },
  {
    name: "Leukemia-Classification-with-Deep-Learning-Model",
    description: "Deep learning model classifying six leukemia types (MM, Healthy, CML, CLL, AML, ALL) using custom CNN, VGG16, and ResNet50 models. It includes data preprocessing, model training, and evaluation with accuracy, precision, recall, F1-score, and confusion matrix metrics.",
    language: "Jupyter Notebook",
    stars: 0,
    forks: 0,
    color: "cyan",
  },
  {
    name: "Image-Preprocessing-Cat",
    description: "A comprehensive collection of image preprocessing techniques tailored for enhancing, filtering, and transforming images. This repository includes color manipulation, normalization, thresholding, and more, making it ideal for machine learning and computer vision applications.",
    language: "Jupyter Notebook",
    stars: 0,
    forks: 0,
    color: "purple",
  },
  {
    name: "Heart-Disease-Dataset-Correlation-Analysis-and-Visualization",
    description: "Explores correlations in Heart Disease Dataset using Pearson and Chi-Squared methods,The analysis includes data preprocessing, correlation calculation, and insightful visualizations",
    language: "R",
    stars: 0,
    forks: 0,
    color: "blue",
  },
  {
    name: "Skincare-Chatbot-Django-API",
    description: "Smart skincare chatbot with Django REST Framework and OpenAI API. It provides personalized skincare guidance, routine tips, and ingredient insights through an interactive AI-powered API.",
    language: "Python",
    stars: 0,
    forks: 0,
    color: "pink",
  },
  {
    name: "Breast-Cancer-Classification-and-Evaluation-with-Multiple-Machine-Learning-Models",
    description: "Breast cancer classification project using the Wisconsin dataset with multiple ML models. Includes data preprocessing, EDA, feature selection, PCA, and performance evaluation (accuracy, precision, recall, F1, AUC-ROC) to compare model effectiveness",
    language: "Jupyter Notebook",
    stars: 0,
    forks: 0,
    color: "cyan",
  },
  {
    name: "MNIST-Handwritten-Digit-Classification-with-Keras",
    description: "Neural network-based approach to classify handwritten digits using the MNIST dataset. Built with Keras and TensorFlow, it includes steps for data preprocessing, model development, training, and evaluation. The model predicts digit classes from 0-9, and the results are visualized using Matplotlib",
    language: "Python",
    stars: 0,
    forks: 0,
    color: "purple",
  },
  {
    name: "Restaurant-Data-Analysis-Predictive-Modeling",
    description: "Comprehensive restaurant analytics and rating prediction system using EDA, geospatial analysis, feature engineering, and machine learning. Explores customer preferences, cuisines, pricing, and delivery trends with interactive visualizations and predictive models",
    language: "Jupyter Notebook",
    stars: 0,
    forks: 0,
    color: "blue",
  },
  {
    name: "Laptop-Price-Prediction-and-Classification",
    description: "Machine learning project for laptop price prediction and classification using EDA, data preprocessing, and feature engineering. Implements regression and random forest models to analyze pricing factors and categorize laptop types based on specifications",
    language: "Jupyter Notebook",
    stars: 0,
    forks: 0,
    color: "pink",
  },
  {
    name: "Evaluating-the-Robustness-of-Machine-Learning-Models-to-Adversarial-Attacks",
    description: "Adversarial robustness analysis of ML models using FGSM and PGD attacks on MNIST, with performance comparison of Logistic Regression and CNNs. Includes PCA-based optimization and defense strategies such as adversarial training and gradient masking",
    language: "Jupyter Notebook",
    stars: 0,
    forks: 0,
    color: "cyan",
  },
  {
    name: "MIRNet_CNN",
    description: "Deep learning project implementing MIRNet (Multi-Scale Image Restoration Network) with CNNs for image restoration and enhancement. Includes model training, evaluation, and visualization to improve image quality across diverse datasets",
    language: "Jupyter Notebook",
    stars: 0,
    forks: 0,
    color: "purple",
  },
  {
    name: "Apple-Leaf-Disease-Weather-Augmented-Classification",
    description: "Apple leaf disease classification system enhanced with weather metadata integration. Builds a multimodal dataset by combining leaf images with environmental features to analyze correlations and improve prediction performance",
    language: "Python",
    stars: 0,
    forks: 0,
    color: "blue",
  },
    {
    name: "Caesarian-Data-Preprocessing-in-R",
    description: "Caesarian dataset preprocessing project using R. It includes techniques for handling outliers, missing values, invalid entries, and categorical variables, imbalance data, aimed at optimizing data quality for predictive modeling and analysis",
    language: "R",
    stars: 0,
    forks: 0,
    color: "pink",
  },
];

const langColor = {
  Python: "bg-blue-400/10 text-blue-400",
  R: "bg-purple-400/10 text-purple-400",
  "Jupyter Notebook": "bg-orange-400/10 text-orange-400",
};

const borderColors = {
  purple: "border-purple-500/20 hover:border-purple-500/40",
  blue: "border-blue-500/20 hover:border-blue-500/40",
  pink: "border-pink-500/20 hover:border-pink-500/40",
  cyan: "border-cyan-500/20 hover:border-cyan-500/40",
  violet: "border-violet-500/20 hover:border-violet-500/40",
};

export default function AllProjectsSection() {
  return (
    <section id="AllProjects" className="py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      
      {/* Floating graphics */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 360] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute top-16 left-12 w-20 h-20 border border-primary/30 rounded-lg"
          style={{ transform: "rotate(30deg)" }}
        />
        <motion.div
          animate={{ x: [-20, 20, -20], y: [0, 15, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-28 left-24 w-14 h-14 border-2 border-cyan-500/25 rounded-full"
        />
        <motion.div
          animate={{ rotate: [0, -180, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-20 w-16 h-16 border-2 border-pink-500/20"
          style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-gradient-to-br from-violet-500/10 to-transparent rounded-full"
        />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-primary text-sm mb-2 block">// projects</span>
          <h2 className="text-3xl sm:text-4xl font-bold glow-text">Featured Work</h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-sm">AI, ML, and Backend Engineering projects from GitHub</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_REPOS.map((repo, i) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className={`glass rounded-xl p-5 border transition-all duration-300 hover:glow-purple-sm group ${borderColors[repo.color]}`}
            >
              <div className="flex items-start justify-between mb-3">
                <Github className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href={`https://github.com/UrmiKarmakar/${repo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Button variant="ghost" size="icon" className="w-7 h-7 text-muted-foreground hover:text-primary">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </a>
              </div>

              <h3 className="font-mono font-bold text-sm text-foreground mb-2 leading-tight group-hover:text-primary transition-colors">
                {repo.name.replace(/-/g, ' ')}
              </h3>

              <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                {repo.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className={`px-2 py-0.5 rounded-md font-mono ${langColor[repo.language] || 'bg-muted text-muted-foreground'}`}>
                    {repo.language}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {repo.stars}
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-3 h-3" />
                    {repo.forks}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="https://github.com/UrmiKarmakar" target="_blank" rel="noopener noreferrer">
            <Button className="bg-primary/90 hover:bg-primary text-primary-foreground font-medium px-6 gap-2 glow-purple-sm">
              <Github className="w-4 h-4" />
              View on GitHub
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}