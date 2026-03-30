import React, { useState } from "react";
import { ExternalLink, Github, ChevronDown, ChevronUp, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageModal from "./ImageModal";

const colorAccent = {
  purple: "border-purple-500/30 hover:border-purple-500/50",
  blue: "border-blue-500/30 hover:border-blue-500/50",
  pink: "border-pink-500/30 hover:border-pink-500/50",
  cyan: "border-cyan-500/30 hover:border-cyan-500/50",
};

const tagColor = {
  purple: "bg-purple-500/10 text-purple-400",
  blue: "bg-blue-500/10 text-blue-400",
  pink: "bg-pink-500/10 text-pink-400",
  cyan: "bg-cyan-500/10 text-cyan-400",
};

export default function ProjectCard({ project }) {
  const [showArch, setShowArch] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for the popup
  const c = project.color || "purple";

  return (
    <>
      <div className={`glass rounded-xl p-5 border transition-all duration-500 hover:glow-purple-sm group h-full flex flex-col ${colorAccent[c]}`}>
        
        {/* Project Image / Thumbnail */}
        {project.image && (
          <div 
            className="relative mb-4 overflow-hidden rounded-lg aspect-video bg-black/20 cursor-zoom-in group/img"
            onClick={() => setIsModalOpen(true)}
          >
            <img 
              src={project.image} 
              alt={project.title}
              className="object-cover w-full h-full transition-transform duration-500 group-hover/img:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
               <Maximize2 className="text-white w-6 h-6" />
            </div>
          </div>
        )}

        <div className="flex items-start justify-between mb-3">
          <h3 className="font-mono font-bold text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <div className="flex gap-1.5">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="w-7 h-7 text-muted-foreground hover:text-primary">
                  <Github className="w-3.5 h-3.5" />
                </Button>
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="w-7 h-7 text-muted-foreground hover:text-primary">
                  <ExternalLink className="w-3.5 h-3.5" />
                </Button>
              </a>
            )}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-grow">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.map((tag) => (
            <span key={tag} className={`text-xs font-mono px-2 py-0.5 rounded-md ${tagColor[c]}`}>
              {tag}
            </span>
          ))}
        </div>

        {project.architecture && (
          <button
            onClick={() => setShowArch(!showArch)}
            className="flex items-center gap-1 text-xs font-mono text-primary hover:text-accent transition-colors mb-2"
          >
            {showArch ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            system_architecture
          </button>
        )}

        {showArch && (
          <div className="mt-2 bg-background/80 rounded-lg p-3 border border-border">
            <code className="text-xs font-mono text-muted-foreground leading-relaxed block">
              {project.architecture}
            </code>
          </div>
        )}
      </div>

      {/* The Popup Modal - Now renders outside the card via Portal */}
      <ImageModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        image={project.image}
        title={project.title}
        description={project.description}
      />
    </>
  );
}