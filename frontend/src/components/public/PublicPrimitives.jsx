import React from 'react';
import { Card, CardContent } from '../ui/Card';

export function PageHero({ title, intro }) {
  return (
    <section className="rounded-[2rem] border border-white/60 bg-white/85 px-6 py-8 shadow-lg shadow-[rgba(10,37,64,0.08)] backdrop-blur sm:px-8 sm:py-10">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--aureon-teal)]">Public Website</p>
      <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-[var(--aureon-ink)] sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">{intro}</p>
    </section>
  );
}

export function SectionBlock({ title, description, children }) {
  return (
    <section className="space-y-5">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-[var(--aureon-ink)]">{title}</h2>
        <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-slate-600">{description}</p>
      </div>
      {children}
    </section>
  );
}

export function ShowcaseCard({ title, icon: Icon, children, compact = false }) {
  return (
    <Card className="rounded-[2rem] border-white/60 bg-white/85 shadow-lg shadow-[rgba(10,37,64,0.08)] backdrop-blur">
      <CardContent className={compact ? 'p-5' : 'p-6'}>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <p className="font-heading text-xl font-semibold tracking-tight text-[var(--aureon-ink)]">{title}</p>
        </div>
        <div className="mt-4">{children}</div>
      </CardContent>
    </Card>
  );
}

export function InfoRow({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 text-sm text-slate-700 shadow-sm">
      <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900">
        <Icon className="h-4 w-4 text-white" />
      </div>
      <span>{text}</span>
    </div>
  );
}

export function StatPanel({ icon: Icon, label, value }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 shadow-sm">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
