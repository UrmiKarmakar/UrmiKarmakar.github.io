import React, { useState } from "react";
import { Github, Linkedin, Mail, Copy, Check, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("urmi16kk@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="py-12 px-4 sm:px-6 border-t border-border/50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <a href="https://github.com/UrmiKarmakar" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon" className="border-primary/20 hover:bg-primary/10 hover:border-primary/50 rounded-full w-10 h-10">
              <Github className="w-4 h-4" />
            </Button>
          </a>
          <a href="https://www.linkedin.com/in/urmi-karmakar-ananna/" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon" className="border-primary/20 hover:bg-primary/10 hover:border-primary/50 rounded-full w-10 h-10">
              <Linkedin className="w-4 h-4" />
            </Button>
          </a>
          <Button
            variant="outline"
            onClick={copyEmail}
            className="border-primary/20 hover:bg-primary/10 hover:border-primary/50 gap-2 rounded-full px-4 h-10"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            <span className="text-xs font-mono">{copied ? "Copied!" : "urmi16kk@gmail.com"}</span>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
          Built with <Heart className="w-3 h-3 text-primary" /> by Urmi Karmakar © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}