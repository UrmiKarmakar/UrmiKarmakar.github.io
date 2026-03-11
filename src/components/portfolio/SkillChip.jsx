import React from "react";

const colorMap = {
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20 hover:border-purple-500/50",
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20 hover:border-blue-500/50",
  pink: "bg-pink-500/10 text-pink-400 border-pink-500/30 hover:bg-pink-500/20 hover:border-pink-500/50",
  cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-500/50",
  violet: "bg-violet-500/10 text-violet-400 border-violet-500/30 hover:bg-violet-500/20 hover:border-violet-500/50",
};

export default function SkillChip({ label, color = "purple" }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium border transition-all duration-300 cursor-default hover:shadow-lg ${colorMap[color] || colorMap.purple}`}
      style={{ transition: "all 0.3s ease, box-shadow 0.3s ease" }}
    >
      {label}
    </span>
  );
}