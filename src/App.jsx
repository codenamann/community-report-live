import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IssueProvider } from "@/context/IssueContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ReportIssue from "./pages/ReportIssue";
import Landing from "./pages/Landing";
import CitizenLogin from "./pages/citizen/Login";
import CitizenDashboard from "./pages/citizen/Dashboard";
import AuthorityLogin from "./pages/authority/Login";
import AuthorityDashboard from "./pages/authority/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <IssueProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            {/* Citizen */}
            <Route path="/citizen/login" element={<CitizenLogin />} />
            <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
            <Route path="/citizen/report" element={<ReportIssue />} />
            {/* Authority */}
            <Route path="/authority/login" element={<AuthorityLogin />} />
            <Route path="/authority/dashboard" element={<AuthorityDashboard />} />
            {/* Legacy/demo routes */}
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/report" element={<ReportIssue />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </IssueProvider>
  </QueryClientProvider>
);

export default App;
