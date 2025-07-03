import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Entry from "./pages/Entry";
import Entries from "./pages/Entries";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import WriteEditor from "./components/profile/WriteEditor";
import WritePageLayout from "./components/WritePageLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Index />} />
          <Route path="/entries" element={<Entries />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/entry/:slug" element={<Entry />} />
          <Route path="/write" element={<PrivateRoute><WritePageLayout><WriteEditor /></WritePageLayout></PrivateRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
