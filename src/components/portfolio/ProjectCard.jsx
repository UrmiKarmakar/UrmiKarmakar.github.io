import React, { useState } from "react";
import { ExternalLink, Github, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const colorAccent = {
  purple: "border-purple-500/30 hover:border-purple-500/50",
  blue: "border-blue-500/30 hover:border-blue-500/50",
  pink: "border-pink-500/30 hover:border-pink-500/50",
  cyan: "border-cyan-500/30 hover:border-cyan-500/50",
  violet: "border-violet-500/30 hover:border-violet-500/50",
};

const tagColor = {
  purple: "bg-purple-500/10 text-purple-400",
  blue: "bg-blue-500/10 text-blue-400",
  pink: "bg-pink-500/10 text-pink-400",
  cyan: "bg-cyan-500/10 text-cyan-400",
  violet: "bg-violet-500/10 text-violet-400",
};

export default function ProjectCard({ project }) {
  const [showArch, setShowArch] = useState(false);
  const c = project.color || "purple";

  return (
    <div className={`glass rounded-xl p-5 border transition-all duration-500 hover:glow-purple-sm group h-full flex flex-col ${colorAccent[c]}`}>
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
          className="flex items-center gap-1 text-xs font-mono text-primary hover:text-accent transition-colors"
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
  );
}
