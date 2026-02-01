import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";

// Public pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import OnboardingPage from "./pages/OnboardingPage";

// User dashboard pages
import UserDashboard from "./pages/dashboard/UserDashboard";
import TrainingDayPage from "./pages/dashboard/TrainingDayPage";
import CalendarPage from "./pages/dashboard/CalendarPage";
import EvolutionPage from "./pages/dashboard/EvolutionPage";
import SimuladosPage from "./pages/dashboard/SimuladosPage";
import VideoUploadPage from "./pages/dashboard/VideoUploadPage";
import FeedbackPage from "./pages/dashboard/FeedbackPage";
import ProfilePage from "./pages/dashboard/ProfilePage";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            
            {/* Onboarding */}
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute>
                  <OnboardingPage />
                </ProtectedRoute>
              }
            />

            {/* User Dashboard routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={['USER', 'COACH', 'ADMIN']}>
                  <DashboardLayout>
                    <UserDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/treinos"
              element={
                <ProtectedRoute allowedRoles={['USER', 'COACH', 'ADMIN']}>
                  <DashboardLayout>
                    <TrainingDayPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/calendario"
              element={
                <ProtectedRoute allowedRoles={['USER', 'COACH', 'ADMIN']}>
                  <DashboardLayout>
                    <CalendarPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/evolucao"
              element={
                <ProtectedRoute allowedRoles={['USER', 'COACH', 'ADMIN']}>
                  <DashboardLayout>
                    <EvolutionPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/simulados"
              element={
                <ProtectedRoute allowedRoles={['USER', 'COACH', 'ADMIN']}>
                  <DashboardLayout>
                    <SimuladosPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/enviar-video"
              element={
                <ProtectedRoute allowedRoles={['USER', 'COACH', 'ADMIN']}>
                  <DashboardLayout>
                    <VideoUploadPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/feedback"
              element={
                <ProtectedRoute allowedRoles={['USER', 'COACH', 'ADMIN']}>
                  <DashboardLayout>
                    <FeedbackPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/perfil"
              element={
                <ProtectedRoute allowedRoles={['USER', 'COACH', 'ADMIN']}>
                  <DashboardLayout>
                    <ProfilePage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Coach routes placeholder */}
            <Route path="/coach" element={<Navigate to="/dashboard" replace />} />
            <Route path="/coach/*" element={<Navigate to="/dashboard" replace />} />

            {/* Admin routes placeholder */}
            <Route path="/admin" element={<Navigate to="/dashboard" replace />} />
            <Route path="/admin/*" element={<Navigate to="/dashboard" replace />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
