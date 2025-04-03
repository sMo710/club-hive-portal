
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Main Pages
import Dashboard from "./pages/dashboard/Dashboard";
import EventsPage from "./pages/events/EventsPage";
import EventDetails from "./pages/events/EventDetails";
import ClubsPage from "./pages/clubs/ClubsPage";
import ClubDetails from "./pages/clubs/ClubDetails";
import ProfilePage from "./pages/profile/ProfilePage";
import NotFound from "./pages/NotFound";

// Layout
import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/:id" element={<EventDetails />} />
                <Route path="/clubs" element={<ClubsPage />} />
                <Route path="/clubs/:id" element={<ClubDetails />} />
                <Route path="/profile" element={<ProfilePage />} />
                {/* Add more protected routes as they are implemented */}
              </Route>
            </Route>
            
            {/* Redirect root to dashboard or login */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* 404 Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
