import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Home, LogOut } from 'lucide-react';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import PublicLayout from './components/public/PublicLayout';
import HomePage from './pages/public/HomePage';
import MembershipPage from './pages/public/MembershipPage';
import TiersPage from './pages/public/TiersPage';
import FoundingPage from './pages/public/FoundingPage';
import OpportunitiesPage from './pages/public/OpportunitiesPage';
import PartnersPage from './pages/public/PartnersPage';
import RewardsPage from './pages/public/RewardsPage';
import VerificationPage from './pages/public/VerificationPage';
import RequestAccessPage from './pages/public/RequestAccessPage';
import AuthPage from './pages/public/AuthPage';
import MemberDashboard from './pages/MemberDashboard';
import AdminReviewModule from './pages/AdminReviewModule';
import AdminSettingsDashboard from './pages/AdminSettingsDashboard';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function DashboardFrame({ children }) {
  const navigate = useNavigate();
  const { logout, auth } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen">
      <div className="fixed right-4 top-4 z-50 flex gap-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/95 px-4 py-2 text-sm text-slate-700 shadow-lg backdrop-blur">
          <span className="font-medium">{auth?.name || 'User'}</span>
        </div>
        <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50/95 px-4 py-2 text-sm font-medium text-red-700 shadow-lg backdrop-blur hover:bg-red-100">
          <LogOut className="h-4 w-4" />Logout
        </button>
        <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 rounded-full bg-[#0A2540] px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-[#14385f]">
          <Home className="h-4 w-4" />Website
        </button>
      </div>
      {children}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/tiers" element={<TiersPage />} />
            <Route path="/founding" element={<FoundingPage />} />
            <Route path="/opportunities" element={<OpportunitiesPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/rewards" element={<RewardsPage />} />
            <Route path="/verification" element={<VerificationPage />} />
            <Route path="/request-access" element={<RequestAccessPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route path="/forgot-password" element={<AuthPage />} />
            <Route path="/verification-pending" element={<AuthPage />} />
          </Route>
          <Route path="/dashboard/member" element={<ProtectedRoute><DashboardFrame><MemberDashboard /></DashboardFrame></ProtectedRoute>} />
          <Route path="/dashboard/admin-review" element={<ProtectedRoute><DashboardFrame><AdminReviewModule /></DashboardFrame></ProtectedRoute>} />
          <Route path="/dashboard/admin-settings" element={<ProtectedRoute><DashboardFrame><AdminSettingsDashboard /></DashboardFrame></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
