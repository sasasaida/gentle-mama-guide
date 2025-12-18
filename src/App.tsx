import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppStore } from "@/store/appStore";
import { useState } from "react";

import { BottomNav } from "@/components/navigation/BottomNav";
import { Onboarding } from "@/components/onboarding/Onboarding";
import { Dashboard } from "@/pages/Dashboard";
import { AIAssistant } from "@/pages/AIAssistant";
import { NutritionGuide } from "@/pages/NutritionGuide";
import { SymptomChecker } from "@/pages/SymptomChecker";
import { Profile } from "@/pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const { hasCompletedOnboarding } = useAppStore();
  const [showOnboarding, setShowOnboarding] = useState(!hasCompletedOnboarding);

  if (showOnboarding) {
    return <Onboarding onComplete={() => setShowOnboarding(false)} />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/assistant" element={<AIAssistant />} />
        <Route path="/guide" element={<NutritionGuide />} />
        <Route path="/checker" element={<SymptomChecker />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BottomNav />
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
