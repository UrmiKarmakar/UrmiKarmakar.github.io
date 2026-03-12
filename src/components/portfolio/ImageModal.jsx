import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ImageModal({ isOpen, onClose, image, title, description }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop - High Blur for Focus */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative max-w-4xl w-full bg-card/90 rounded-2xl overflow-hidden border border-primary/20 shadow-2xl z-[101]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50 bg-secondary/30">
            <div className="flex items-center gap-2">
              <ZoomIn className="w-4 h-4 text-primary" />
              <div>
                <h3 className="font-bold text-sm text-foreground leading-none">{title}</h3>
                {description && <p className="text-[11px] text-muted-foreground mt-1">{description}</p>}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Image Display - Optimized for Certificates */}
          <div className="relative bg-black/40 flex justify-center items-center">
            <img
              src={image}
              alt={title}
              className="w-full h-auto max-h-[75vh] object-contain select-none"
            />
          </div>

          {/* Footer */}
          <div className="p-3 bg-secondary/30 border-t border-border/50 flex justify-end gap-3">
             <Button variant="ghost" size="sm" onClick={onClose} className="text-xs">
                Close
             </Button>
            <a href={image} target="_blank" rel="noopener noreferrer">
              <Button variant="default" size="sm" className="gap-2 text-xs h-8">
                <ExternalLink className="w-3.5 h-3.5" />
                View Full Resolution
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}