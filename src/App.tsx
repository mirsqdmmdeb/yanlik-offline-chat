import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ChatProvider } from "./contexts/ChatContext";
import CookieConsent from "./components/CookieConsent";
import PageTracker from "./components/PageTracker";
import AIDisclaimerModal from "./components/AIDisclaimerModal";
import AgeGate from "./components/AgeGate";
import ExternalLinkWarning from "./components/ExternalLinkWarning";
import OnboardingTour from "./components/OnboardingTour";
import AnnouncementBar from "./components/AnnouncementBar";
import "./lib/i18n";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Licenses from "./pages/Licenses";
import FAQ from "./pages/FAQ";
import Roadmap from "./pages/Roadmap";
import Status from "./pages/Status";
import Developer from "./pages/Developer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <ChatProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AgeGate />
            <AIDisclaimerModal />
            <CookieConsent />
            <OnboardingTour />
            <ExternalLinkWarning>
              <AnnouncementBar />
              <BrowserRouter>
                <PageTracker />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/licenses" element={<Licenses />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/roadmap" element={<Roadmap />} />
                  <Route path="/status" element={<Status />} />
                  <Route path="/developer" element={<Developer />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </ExternalLinkWarning>
          </TooltipProvider>
        </ChatProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
