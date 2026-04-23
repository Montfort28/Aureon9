import React from 'react';
import { HashRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
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

function DashboardFrame({ children }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="fixed right-4 top-4 z-50 flex gap-2">
        <button onClick={() => navigate('/login')} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/95 px-4 py-2 text-sm font-medium text-slate-700 shadow-lg backdrop-blur hover:bg-white">
          <ArrowLeft className="h-4 w-4" />Access
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
    <HashRouter>
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
        <Route path="/dashboard/member" element={<DashboardFrame><MemberDashboard /></DashboardFrame>} />
        <Route path="/dashboard/admin-review" element={<DashboardFrame><AdminReviewModule /></DashboardFrame>} />
        <Route path="/dashboard/admin-settings" element={<DashboardFrame><AdminSettingsDashboard /></DashboardFrame>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
