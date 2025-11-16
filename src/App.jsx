   // Router-level navigation between pages 
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AudioProvider } from "./contexts/AudioContext";
import { FocusProvider } from "./contexts/FocusContext";
import Index from "./pages/Index";

import GoodHabits from "./pages/GoodHabits";
import InteractiveBodyMap from "./pages/InteractiveBodyMap";
import SenseSimulator from "./pages/SenseSimulator";
import EmotionMirror from "./pages/EmotionMirror";
import Games from "./pages/Games";
import BodyPartPuzzle from "./components/games/BodyPartPuzzle";
import SenseTarget from "./components/games/SenseTarget";
import MemoryMatch from "./components/games/MemoryMatch";
import EmotionDetective from "./components/games/EmotionDetective";
import MiniQuizzes from "./pages/MiniQuizzes";
import ProgressTracker from "./pages/ProgressTracker";
import ParentDashboard from "./pages/ParentDashboard";
import ParentLogin from "./pages/ParentLogin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AudioProvider>
        <FocusProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
         
            <Routes>
              <Route path="/good-habits" element={<GoodHabits />} />  
              <Route path="/" element={<Index />} /> {/* Components */}
              <Route path="/body-map" element={<InteractiveBodyMap />} />
              <Route path="/senses" element={<SenseSimulator />} />
              <Route path="/emotions" element={<EmotionMirror />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/body-puzzle" element={<BodyPartPuzzle />} />
          <Route path="/games/sense-target" element={<SenseTarget />} />
          <Route path="/games/memory-match" element={<MemoryMatch />} />
          <Route path="/games/emotion-detective" element={<EmotionDetective />} />
              <Route path="/quizzes" element={<MiniQuizzes />} />
              <Route path="/progress" element={<ProgressTracker />} />
              <Route path="/parent-login" element={<ParentLogin />} />
              <Route path="/parent-dashboard" element={<ParentDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </FocusProvider>
      </AudioProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
