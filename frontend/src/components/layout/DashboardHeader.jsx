import React from 'react';
import { Search, Filter, Bell, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export interface DashboardHeaderProps {
  subtitle: string;
  title: string;
  searchPlaceholder?: string;
  showSearch?: boolean;
  showFilters?: boolean;
  showNotifications?: boolean;
  showSave?: boolean;
  primaryButtonText?: string;
  onSearchChange?: (value: string) => void;
  onFilterClick?: () => void;
  onPrimaryButtonClick?: () => void;
  onSaveClick?: () => void;
}

export default function DashboardHeader({
  subtitle,
  title,
  searchPlaceholder = 'Search...',
  showSearch = true,
  showFilters = true,
  showNotifications = false,
  showSave = false,
  primaryButtonText = 'Request Access',
  onSearchChange,
  onFilterClick,
  onPrimaryButtonClick,
  onSaveClick,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 px-5 py-4 backdrop-blur">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Title Section */}
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{subtitle}</p>
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-3 flex-wrap">
          {showSearch && (
            <div className="relative w-full lg:w-80">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                className="rounded-2xl border-slate-200 pl-9"
                placeholder={searchPlaceholder}
                onChange={(e) => onSearchChange?.(e.target.value)}
              />
            </div>
          )}

          {showFilters && (
            <Button variant="outline" className="rounded-2xl border-slate-200" onClick={onFilterClick}>
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
          )}

          {showNotifications && (
            <Button variant="outline" className="rounded-2xl border-slate-200">
              <Bell className="mr-2 h-4 w-4" /> Notifications
            </Button>
          )}

          {showSave && (
            <Button className="rounded-2xl bg-[#0A2540] hover:bg-[#14385f]" onClick={onSaveClick}>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          )}

          {!showSave && primaryButtonText && (
            <Button className="rounded-2xl bg-[#0A2540] hover:bg-[#14385f]" onClick={onPrimaryButtonClick}>
              {primaryButtonText}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
