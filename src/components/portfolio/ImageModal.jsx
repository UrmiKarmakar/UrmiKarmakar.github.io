import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ImageModal({ isOpen, onClose, image, title, description }) {
  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[11000] flex items-center justify-center p-6">
        
        {/* 1. LIGHTER BACKDROP: Reduced opacity and blur so the site stays visible */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" 
        />

        {/* 2. CONSTRAINED POPUP: Using max-w-2xl to keep it small and "popup" style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          className="relative max-w-2xl w-full bg-[#160b2e] rounded-2xl overflow-hidden border border-purple-500/30 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-[11001]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-white/5 bg-secondary/10">
            <div className="flex items-center gap-2">
              <ZoomIn className="w-4 h-4 text-purple-400" />
              <h3 className="font-bold text-xs text-white uppercase tracking-wider">{title}</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/5"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* 3. IMAGE CONTAINER: Limited height so it doesn't take over the screen */}
          <div className="relative bg-black/40 flex justify-center items-center p-2">
            <img
              src={image}
              alt={title}
              className="w-full h-auto max-h-[50vh] object-contain rounded-lg shadow-lg"
            />
          </div>

          {/* Footer */}
          {description && (
            <div className="px-4 py-2 bg-black/20">
              <p className="text-[10px] text-gray-400 font-mono italic">{description}</p>
            </div>
          )}

          <div className="p-3 bg-secondary/10 border-t border-white/5 flex justify-end gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose} 
              className="text-[10px] h-7 px-3 text-gray-400"
            >
              Close
            </Button>
            <a href={image} target="_blank" rel="noopener noreferrer">
              <Button variant="default" size="sm" className="gap-2 text-[10px] h-7 bg-purple-600 hover:bg-purple-700 text-white">
                <ExternalLink className="w-3 h-3" />
                View Full Size
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}