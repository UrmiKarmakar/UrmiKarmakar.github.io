import React, { Suspense, useEffect } from 'react'; // Added useEffect
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "sonner";

// Internal Libs & Context
import { queryClientInstance } from '@/lib/query-client';
import { pagesConfig } from './pages.config';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import PageNotFound from './lib/PageNotFound';

// Components
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

// Destructure pages configuration
const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = Pages[mainPageKey] || (() => <></>);

/**
 * LayoutWrapper provides a consistent structure around pages
 * if a Layout component is defined in pagesConfig.
 */
const LayoutWrapper = ({ children, currentPageName }) => {
  return Layout ? (
    <Layout currentPageName={currentPageName}>{children}</Layout>
  ) : (
    <>{children}</>
  );
};

/**
 * AuthenticatedApp handles the Auth logic and Routing.
 * Optimized for fast feedback and clear error states.
 */
const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  // 2. Handle Backend/Auth Errors (e.g., HandyConnect/Pylot restrictions)
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  // 3. Main Route Rendering
  return (
    <Suspense fallback={
      <div className="h-screen w-full flex items-center justify-center bg-background animate-pulse">
        <div className="h-24 w-24 rounded-full bg-primary/10 glow-purple-sm" />
      </div>
    }>
      <Routes>
        {/* Main Entry Page (e.g., localhost:5173/) */}
        <Route 
          path="/" 
          element={
            <LayoutWrapper currentPageName={mainPageKey}>
              <MainPage />
            </LayoutWrapper>
          } 
        />

        {/* Dynamic Pages from pages.config (e.g., localhost:5173/home) */}
        {Object.entries(Pages).map(([path, Page]) => (
          <Route
            key={path}
            path={`/${path}`}
            element={
              <LayoutWrapper currentPageName={path}>
                <Page />
              </LayoutWrapper>
            }
          />
        ))}

        {/* Catch-all 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

/**
 * Root App Component
 * Wraps everything in necessary Providers for Data and Auth.
 */
function App() {
//Wake up Render Backend
  useEffect(() => {
    const wakeUpServer = async () => {
      try {
        // This pings your backend URL to wake it up from "sleep" mode
        await fetch("https://urmikarmakar-github-io.onrender.com/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "ping" }),
        });
        console.log("Backend server is awake and ready! 🚀");
      } catch (error) {
        console.error("Server wakeup failed, but that's okay:", error);
      }
    };

    wakeUpServer();
  }, []);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        
        <Toaster 
          position="bottom-center" 
          richColors 
          closeButton 
          theme="dark"
          expand={false}
          toastOptions={{
            style: {
              background: 'hsl(230, 25%, 10%)',
              border: '1px solid rgba(168, 85, 247, 0.2)',
              color: 'white',
            },
          }}
        />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;