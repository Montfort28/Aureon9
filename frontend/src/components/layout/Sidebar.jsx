import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/Avatar';

export interface SidebarNavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface SidebarProps {
  logo: string;
  logoText: string;
  subtitle: string;
  navItems: SidebarNavItem[];
  activeNavId: string;
  onNavItemClick: (id: string) => void;
  userCard?: {
    initials: string;
    name: string;
    subtitle: string;
    progressLabel?: string;
    progressValue?: number;
    description?: string;
  };
  statusCard?: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
  };
}

export default function Sidebar({
  logo,
  logoText,
  subtitle,
  navItems,
  activeNavId,
  onNavItemClick,
  userCard,
  statusCard,
}: SidebarProps) {
  return (
    <aside className="border-r border-slate-200 bg-white px-4 py-5 min-h-screen overflow-y-auto">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3 px-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0A2540] text-white">
          {typeof logo === 'string' ? (
            <span>{logo}</span>
          ) : (
            React.createElement(logo, { className: 'h-5 w-5' })
          )}
        </div>
        <div>
          <p className="text-sm font-medium tracking-wide text-slate-500">Powered By ODIEBOARD</p>
          <h1 className="text-lg font-semibold">{logoText}</h1>
        </div>
      </div>

      {/* User/Status Card */}
      {userCard && (
        <div className="mb-5 px-2">
          <div className="rounded-2xl bg-gradient-to-br from-[#0A2540] to-[#0F4C81] p-4 text-white shadow-sm">
            <div className="flex items-center gap-3">
              <Avatar className="h-11 w-11 border border-white/20">
                <AvatarFallback className="bg-white/10 text-white">{userCard.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{userCard.name}</p>
                <p className="text-xs text-white/75">{userCard.subtitle}</p>
              </div>
            </div>
            {userCard.progressLabel && userCard.progressValue !== undefined && (
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-white/80">
                  <span>{userCard.progressLabel}</span>
                  <span>{userCard.progressValue}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/15 overflow-hidden">
                  <div
                    className="h-full bg-white/40 rounded-full"
                    style={{ width: `${userCard.progressValue}%` }}
                  />
                </div>
              </div>
            )}
            {userCard.description && (
              <div className="mt-4 rounded-2xl bg-white/10 px-3 py-2 text-xs text-white/85">
                {userCard.description}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.id === activeNavId;
          return (
            <button
              key={item.id}
              onClick={() => onNavItemClick(item.id)}
              className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm transition ${
                active ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Status/Info Card */}
      {statusCard && (
        <>
          <div className="my-5 border-t border-slate-200" />
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
            <div className="flex items-start gap-3">
              {React.createElement(statusCard.icon, { className: 'mt-0.5 h-4 w-4 text-slate-700' })}
              <div>
                <p className="font-medium text-slate-900">{statusCard.title}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{statusCard.description}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
