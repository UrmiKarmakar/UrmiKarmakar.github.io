import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { Home, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PageNotFound() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isLoadingAuth } = useAuth();
    
    const pageName = location.pathname.substring(1) || "this page";

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background grid-bg relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-md w-full glass p-8 rounded-[2rem] relative z-10 text-center space-y-8 neon-border">
                {/* 404 Header */}
                <div className="space-y-2">
                    <h1 className="text-8xl font-black glow-text tracking-tighter text-primary">404</h1>
                    <div className="h-1 w-20 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"></div>
                </div>
                
                {/* Main Message */}
                <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                        Route Terminated
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                        The path <code className="text-primary font-mono bg-primary/10 px-2 py-0.5 rounded">/{pageName}</code> does not exist in Urmi's digital space.
                    </p>
                </div>
                
                {/* Admin Note - Styled for your theme */}
                {!isLoadingAuth && user?.role === 'admin' && (
                    <div className="p-4 bg-purple-950/30 rounded-2xl border border-primary/20 flex items-start gap-3 text-left animate-float">
                        <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-bold text-primary uppercase tracking-widest">Dev Console</p>
                            <p className="text-xs text-purple-200/70 leading-relaxed">
                                This route isn't defined in <span className="text-white font-mono">pages.config.js</span>. 
                            </p>
                        </div>
                    </div>
                )}
                
                {/* Action Button */}
                <div className="pt-4">
                    <Button 
                        onClick={() => navigate('/')} 
                        variant="outline"
                        className="w-full rounded-xl border-primary/30 hover:bg-primary/10 hover:border-primary transition-all group"
                    >
                        <Home className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                        Return to Dashboard
                    </Button>
                </div>
            </div>
        </div>
    );
}