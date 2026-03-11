import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ImageModal({ isOpen, onClose, image, title, description }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/95 backdrop-blur-xl"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative max-w-4xl w-full glass rounded-2xl overflow-hidden border border-primary/20 glow-purple"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50 bg-card/50">
            <div>
              <h3 className="font-bold text-foreground">{title}</h3>
              {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Image */}
          <div className="relative bg-muted/30">
            <img
              src={image}
              alt={title}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          </div>

          {/* Footer */}
          <div className="p-4 bg-card/50 border-t border-border/50 flex justify-end">
            <a href={image} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-2">
                <ExternalLink className="w-3.5 h-3.5" />
                Open Full Size
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}