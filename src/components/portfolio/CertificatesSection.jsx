import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BadgeCheck, Eye, ExternalLink, Award } from "lucide-react";
import ImageModal from "./ImageModal";

const CERTIFICATES = [
  // Coursera
  { 
    title: "IBM Generative AI Engineer Professional Certificate", 
    issuer: "IBM | Coursera", 
    color: "purple",
    image: "/images/Coursera_IBM RAG and Agentic AI_Professional.jpg"
  },
  { 
    title: "Django Web Framework", 
    issuer: "Meta | Coursera", 
    color: "blue",
    image: "/images/Coursera_Meta_Django.jpg"
  },

  // Internships & Training
  { 
    title: "AI Research & Backend Developer Internship Completion Certificate", 
    issuer: "Aspire Internship Program (ITBI, CUET), The NexGenix Company",  
    color: "green",
    image: "/images/ITBI_Internship.jpg"
  },
  { 
    title: "Data Science Internship Completion Certificate", 
    issuer: "Cognifyz Technologies", 
    color: "cyan",
    image: "/images/Cognifyz_Internship_DataScience.jpg"
  },
  { 
    title: "AI & Machine Learning with Python Training Program", 
    issuer: "IT Bussiness Incubator,CUET", 
    color: "purple",
    image: "/images/ITBI_AI_ML_Training Program.jpg"
  },
  { 
    title: "Executive (Leadership)", 
    issuer: "AIUB Community Of Engineering Students (ACES)", 
    color: "blue",
    image: "/images/ACES_Executive.jpg"
  },
  { 
    title: "Volunteer", 
    issuer: "AIUB Community Of Engineering Students (ACES)", 
    color: "green",
    image: "/images/ACES_Volunteer.jpg"
  },
  { 
    title: "Science Poster Contest (Physics)", 
    issuer: "American International University - Bangladesh (AIUB)", 
    color: "cyan",
    image: "/images/AIUB_Physics.jpg"
  },
  { 
    title: "Agentic AI with LangChain and LangGraph", 
    issuer: "IBM | Coursera", 
    color: "purple",
    image: "/images/Coursera_IBM_Agentic AI with LangChain and LangGraph.jpg"
  },
  { 
    title: "Advanced RAG with Vector Databases and Retrievers", 
    issuer: "IBM | Coursera", 
    color: "blue",
    image: "/images/Coursera_IBM_Advanced RAG with Vector Databases and Retrievers.jpg"
  },
  { 
    title: "Code-19 Arduino & IoT Workshop", 
    issuer: "ACES | Code-19", 
    color: "green",
    image: "/images/ACES_Code19.jpg"
  },
  { 
    title: "Offshore Wind Energy Webinar", 
    issuer: "AIUB Community of Engineering Students (ACES)",  
    color: "cyan",
    image: "/images/ACES_Webinar.jpg"
  },
  { 
    title: "Robotics Localization & Manipulation Workshop", 
    issuer: "AIUB Community of Engineering Students (ACES)",  
    color: "purple",
    image: "/images/ACES_Workshop.jpg",
  },
  { 
    title: "Soft Skills for Success: Communication, Teamwork & Time Management Seminar", 
    issuer: "Aspire Internship Program (ITBI, CUET)", 
    color: "blue",
    image: "/images/ITBI_Seminar Soft Skills.jpg",
  },
  { 
    title: "Research Methodology: From Idea to Publication Workshop", 
    issuer: "AIUB Research and Development Club (AIUB R&DC)",  
    color: "green",
    image: "/images/R&D_Workshop_Research.jpg"
  },
  { 
    title: "Road to Erasmus Mundus Scholarship", 
    issuer: "AIUB Research and Development Club (AIUB R&DC)", 
    color: "cyan",
    image: "/images/R&D_Webinar_Erasmus Mundus.jpg",
  },  
  // Other Specialized Training
  { 
    title: "Deep Learning", 
    issuer: "SimpliLearn| SkillUP", 
    color: "purple",
    image: "/images/SimpliLearn_Deep Learning.jpg"
  },
  { 
    title: "Getting Started with Machine Learning Algorithms", 
    issuer: "SimpliLearn| SkillUP", 
    color: "blue",
    image: "/images/SimpliLearn_Machine Learning Algorithms.jpg"
  },
  { 
    title: "Basics of Python", 
    issuer: "Uniathena", 
    color: "green",
    image: "/images/Uniathena_Python.jpg"
  },
  { 
    title: "Basics of Machine Learning Algorithms", 
    issuer: "Uniathena", 
    color: "cyan",
    image: "/images/Uniathena_Machine Learning Algorithms.jpg"
  },
  { 
    title: "Coding Problem Solving", 
    issuer: "Ostad", 
    color: "purple",
    image: "/images/Ostad_Coding.jpg"
  },
  { 
    title: "Data Science Fundamentals", 
    issuer: "Ostad", 
    color: "blue",
    image: "/images/Ostad_Data Science.jpg"
  },
  { 
    title: "Pathway to Software Engineering", 
    issuer: "Bohubrihi", 
    color: "green",
    image: "/images/Bohubrihi_Software Engineering.jpg"
  },
  { 
    title: "Introduction to Data Analytics", 
    issuer: "Bohubrihi", 
    color: "cyan",
    image: "/images/Bohubrihi_Data Analytics.jpg"
  },
  { 
    title: "Introduction to Neural Network", 
    issuer: "SimpliLearn| SkillUP", 
    color: "purple",
    image: "/images/SimpliLearn_Neural Network.jpg"
  },
  { 
    title: "R Programming for Beginners", 
    issuer: "SimpliLearn| SkillUP", 
    color: "blue",
    image: "/images/SimpliLearn_R.jpg"
  },
  { 
    title: "Introduction to Generative AI", 
    issuer: "Google Cloud", 
    color: "green",
    image: "/images/Introduction to Generative AI.png",
    link: "https://www.skills.google/public_profiles/350348c5-32fb-4e0d-96c3-c9afbf9a22d1/badges/8548273"
  },
  { 
    title: "Introduction to Large Language Models", 
    issuer: "Google Cloud", 
    color: "cyan",
    image: "/images/Introduction to Large Language Models.png",
    link: "https://www.skills.google/public_profiles/350348c5-32fb-4e0d-96c3-c9afbf9a22d1/badges/8548385"
  },
  { 
    title: "Introduction to Responsible AI", 
    issuer: "Google Cloud", 
    color: "purple",
    image: "/images/Introduction to Responsible AI.png",
    link: "https://www.skills.google/public_profiles/350348c5-32fb-4e0d-96c3-c9afbf9a22d1/badges/13529902"
  },
  { 
    title: "Professional Machine Learning Engineer Study Guide", 
    issuer: "Google Cloud", 
    color: "blue",
    image: "/images/Professional Machine Learning Engineer Study Guide.png",
    link: "https://www.skills.google/public_profiles/350348c5-32fb-4e0d-96c3-c9afbf9a22d1/badges/17956046"
  }
];

// Helper to ensure colors load correctly in Tailwind
const dotColorMap = {
  purple: "bg-purple-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  cyan: "bg-cyan-500",
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95 }
};

export default function CertificatesSection() {
  const [modalData, setModalData] = useState(null);

  const handleCardClick = (cert) => {
    if (cert.link) {
      window.open(cert.link, "_blank");
    } else {
      setModalData(cert);
    }
  };

return (
    <section id="Certificates" className="py-24 px-4 sm:px-6 relative bg-black/40">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* UPDATED HEADER: Matches Award Style exactly */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-primary text-sm mb-2 block tracking-widest uppercase">
            // certificates
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold glow-text">Professional Certificates</h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto mb-6 font-medium tracking-wide">
            A verified record of technical expertise and academic research, spanning 
          <span className="text-white block mt-2"> {/* 'block mt-2' forces the new line with nice spacing */}
            AI Engineering, Full-Stack Development, and Leadership.
          </span>
          </p>
        </motion.div>

        {/* GRID SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {CERTIFICATES.map((cert, i) => (
              <motion.div
                key={cert.title + i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                onClick={() => handleCardClick(cert)}
                className="group relative bg-[#0f1115] border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
              >
                {/* Image Section */}
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img 
                    src={cert.image} 
                    alt={cert.title}
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-transparent to-transparent opacity-90" />
                  
                  {/* Floating Action Button */}
                  <div className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[-10px] group-hover:translate-y-0">
                    {cert.link ? (
                      <ExternalLink className="w-5 h-5 text-primary" />
                    ) : (
                      <Eye className="w-5 h-5 text-white" />
                    )}
                  </div>

                  <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 flex items-center gap-2">
                    <BadgeCheck className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-bold text-white/90 tracking-widest uppercase">
                      {cert.link ? "Click to Verify" : "Verified Credential"}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <p className="text-[11px] font-black text-primary/80 uppercase tracking-[0.25em] mb-3">{cert.issuer}</p>
                  <h3 className="text-lg font-bold text-white leading-[1.3] group-hover:text-primary transition-colors line-clamp-2">
                    {cert.title}
                  </h3>
                  
                  <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                       <div className={`w-2.5 h-2.5 rounded-full ${dotColorMap[cert.color] || "bg-primary"}`} />
                       <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                         {cert.link ? "Public Link Available" : "Internal Record"}
                       </span>
                    </div>
                  </div>
                </div>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-all" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <ImageModal
        isOpen={!!modalData}
        onClose={() => setModalData(null)}
        image={modalData?.image}
        title={modalData?.title}
        description={modalData?.issuer}
      />
    </section>
  );
}