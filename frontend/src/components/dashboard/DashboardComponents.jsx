import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "./StatusBadge";

/**
 * VerificationItemRow - Row component for displaying verification items
 * Used in member dashboard verification section
 */
export function VerificationItemRow({ item, status, owner, date }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
      <div>
        <p className="font-medium">{item}</p>
        <p className="text-xs text-slate-500">{owner}</p>
      </div>
      <div className="text-right">
        <div className="mb-2">
          <StatusBadge status={status} />
        </div>
        <p className="text-xs text-slate-500">{date}</p>
      </div>
    </div>
  );
}

/**
 * TierCard - Card component for displaying membership tiers
 * Used in member dashboard tier section
 */
export function TierCard({ name, description, isActive, className = "" }) {
  return (
    <Card
      className={`rounded-2xl border transition-all ${
        isActive ? "border-[#D4AF37] shadow-md" : "border-slate-200"
      } ${className}`}
    >
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{name}</h3>
          {isActive && (
            <span className="inline-flex items-center rounded-full bg-[#0A2540] px-2.5 py-1 text-xs font-medium text-white">
              Current
            </span>
          )}
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
      </CardContent>
    </Card>
  );
}

/**
 * OpportunityCard - Card for displaying opportunities with action
 */
export function OpportunityCard({ title, type, risk, cta, onAction }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-medium leading-6">{title}</p>
          <p className="mt-1 text-xs text-slate-500">{type}</p>
        </div>
        <StatusBadge status={risk} />
      </div>
      <button
        onClick={onAction}
        className="mt-4 w-full flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
      >
        {cta}
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="17 5 17 19 5 7" />
        </svg>
      </button>
    </div>
  );
}
