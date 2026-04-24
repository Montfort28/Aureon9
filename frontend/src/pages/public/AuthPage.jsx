import React, { useState } from 'react';
import { Building2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { authContent, pageCopy, participantClassOptions } from '../../data/publicSiteContent';
import { useAuth } from '../../hooks/useAuth';

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const route = location.pathname;
  const content = authContent[route];
  const copy = pageCopy[route];
  const [form, setForm] = useState({
    name: '',
    participantClassCode: 'GENERAL_MEMBER',
    email: '',
    password: '',
  });
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submitAuth = async () => {
    if (route === '/forgot-password' || route === '/verification-pending') {
      return;
    }

    try {
      setStatus({ loading: true, error: '', success: '' });

      if (route === '/register') {
        const result = await register({
          name: form.name,
          participantClassCode: form.participantClassCode,
          email: form.email,
          password: form.password,
        });
        if (!result.success) {
          throw new Error(result.error);
        }
        setStatus({ loading: false, error: '', success: 'Registration completed. Redirecting to dashboard access.' });
        navigate('/dashboard/member');
        return;
      }

      const result = await login(form.email, form.password);
      if (!result.success) {
        throw new Error(result.error);
      }

      const adminRoles = ['SUPER_ADMIN', 'EXECUTIVE', 'LEGAL_COMPLIANCE', 'QUALIFICATIONS', 'CUSTOMER_SUCCESS', 'FINANCE_TREASURY'];
      const isAdmin = adminRoles.includes(result.user?.role);

      setStatus({ loading: false, error: '', success: `Login successful. Redirecting to ${isAdmin ? 'admin' : 'member'} dashboard.` });
      navigate(isAdmin ? '/dashboard/admin-review' : '/dashboard/member');
    } catch (error) {
      const message = error.response?.data?.error || 'Unable to complete authentication';
      setStatus({ loading: false, error: message, success: '' });
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-14rem)] items-center justify-center py-8">
      <Card className="w-full max-w-xl rounded-[2rem] border-white/60 bg-white/90 shadow-2xl shadow-[rgba(10,37,64,0.10)] backdrop-blur">
        <CardContent className="space-y-6 p-6 sm:p-8">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[var(--aureon-ink)] text-white shadow-lg shadow-[rgba(10,37,64,0.20)]"><Building2 className="h-7 w-7" /></div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Authentication</p>
            <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-[var(--aureon-ink)]">{copy.title}</h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">{copy.intro}</p>
          </div>

          {route !== '/verification-pending' && (
            <div className="grid gap-4">
              {route === '/register' && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Full name" />
                  <select
                    value={form.participantClassCode}
                    onChange={(event) => updateField('participantClassCode', event.target.value)}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900"
                  >
                    {participantClassOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <Input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder="Email address" />
              {route !== '/forgot-password' && (
                <Input type="password" value={form.password} onChange={(event) => updateField('password', event.target.value)} placeholder="Password" />
              )}
            </div>
          )}

          {route === '/verification-pending' && <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800">Access remains limited until the required documents are reviewed and the verification state advances.</div>}

          {status.error && <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{status.error}</div>}
          {status.success && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{status.success}</div>}

          <Button
            className="w-full rounded-full bg-[var(--aureon-ink)] py-3 hover:bg-[#14385f]"
            onClick={() => {
              if (route === '/verification-pending') {
                navigate('/login');
                return;
              }
              if (route === '/forgot-password') {
                setStatus({ loading: false, error: '', success: 'Password reset flow is not yet connected to the backend.' });
                return;
              }
              submitAuth();
            }}
            disabled={status.loading}
          >
            {status.loading ? 'Please wait...' : content.primaryLabel}
          </Button>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
            {route !== '/login' && <button onClick={() => navigate('/login')}>Login</button>}
            {route !== '/register' && <button onClick={() => navigate('/register')}>Register</button>}
            {route !== '/forgot-password' && <button onClick={() => navigate('/forgot-password')}>Forgot Password</button>}
            {route !== '/verification-pending' && <button onClick={() => navigate('/verification-pending')}>Verification Pending</button>}
          </div>

          {route === '/login' && (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Current demo access</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">The dashboards already built in the codebase remain accessible while real auth is still unfinished.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <Button variant="outline" className="rounded-2xl border-slate-300" onClick={() => navigate('/dashboard/member')}>Member</Button>
                <Button variant="outline" className="rounded-2xl border-slate-300" onClick={() => navigate('/dashboard/admin-review')}>Admin Review</Button>
                <Button variant="outline" className="rounded-2xl border-slate-300" onClick={() => navigate('/dashboard/admin-settings')}>Admin Settings</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
