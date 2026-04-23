import React from "react";
import { Card, CardContent } from "@/components/ui/card";

/**
 * MetricCard - Reusable metric display component
 * Used across all dashboards for stats and KPIs
 */
export function MetricCard({ label, value, sub, icon: Icon, className = "" }) {
  return (
    <Card className={`rounded-2xl border-slate-200 shadow-sm ${className}`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
              {value}
            </p>
            <p className="mt-1 text-xs text-slate-500">{sub}</p>
          </div>
          <div className="rounded-2xl bg-slate-100 p-3">
            <Icon className="h-5 w-5 text-slate-700" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
