import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';
import { publicNav } from '../../data/publicSiteContent';

const brandLogo = 'public/images/AUREON9%E2%84%A2.png';

function NavButton({ label, to, fullWidth = false }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${fullWidth ? 'w-full justify-start' : ''} inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition ${
          isActive
            ? 'bg-[var(--aureon-ink)] text-white shadow-lg shadow-[rgba(10,37,64,0.14)]'
            : 'text-slate-600 hover:bg-white hover:text-[var(--aureon-ink)]'
        }`
      }
    >
      {label}
    </NavLink>
  );
}

export default function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[var(--aureon-bg)] text-slate-900">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-[rgba(10,37,64,0.16)] blur-3xl" />
        <div className="absolute right-[-5rem] top-40 h-80 w-80 rounded-full bg-[rgba(0,168,168,0.14)] blur-3xl" />
        <div className="absolute bottom-[-8rem] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[rgba(212,175,55,0.10)] blur-3xl" />
      </div>

      <header className="sticky top-0 z-30 border-b border-white/50 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex items-center gap-3 text-left">
            <img src={brandLogo} alt="AUREON9 logo" className="h-11 w-11 object-contain" />
            <div>
              <p className="font-heading text-lg font-semibold tracking-tight text-[var(--aureon-ink)]">AUREON9</p>
              <p className="text-xs text-slate-500">Global membership and rewards</p>
            </div>
          </NavLink>

          <nav className="hidden items-center gap-1 lg:flex">
            {publicNav.map((item) => (
              <NavButton key={item.route} label={item.label} to={item.route} />
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button asChild variant="outline" className="rounded-full border-slate-300">
              <NavLink to="/login">Login</NavLink>
            </Button>
            <Button asChild className="rounded-full bg-[var(--aureon-ink)] px-5 hover:bg-[#14385f]">
              <NavLink to="/request-access">Request Access</NavLink>
            </Button>
          </div>

          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 lg:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-200 bg-white lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6 lg:px-8">
              {publicNav.map((item) => (
                <NavButton key={item.route} label={item.label} to={item.route} fullWidth />
              ))}
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <Button asChild variant="outline" className="rounded-full border-slate-300">
                  <NavLink to="/login">Login</NavLink>
                </Button>
                <Button asChild className="rounded-full bg-[var(--aureon-ink)] hover:bg-[#14385f]">
                  <NavLink to="/request-access">Request Access</NavLink>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10">
        <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
          <Outlet />
        </section>
      </main>

      <footer className="relative z-10 mt-16 border-t border-[#14385f] bg-[var(--aureon-ink)] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
          <div className="flex items-start gap-4">
            <img src={brandLogo} alt="AUREON9 logo" className="h-14 w-14 object-contain" />
            <div>
              <p className="font-heading text-xl font-semibold text-white">AUREON9</p>
              <p className="mt-1 text-sm text-slate-200">Global membership and rewards</p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">Public Pages</p>
              <div className="mt-3 space-y-2 text-sm text-slate-200">
                {publicNav.map((item) => (
                  <NavLink key={item.route} className="block hover:text-white" to={item.route}>
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">Access</p>
              <div className="mt-3 space-y-2 text-sm text-slate-200">
                <NavLink className="block hover:text-white" to="/request-access">Request Access</NavLink>
                <NavLink className="block hover:text-white" to="/login">Login / Dashboard Access</NavLink>
                <NavLink className="block hover:text-white" to="/dashboard/member">Member Dashboard Demo</NavLink>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
