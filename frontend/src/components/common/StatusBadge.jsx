import React from 'react';

export interface StatusBadgeProps {
  status: string;
}

const statusStyleMap: Record<string, string> = {
  // Verification statuses
  'Pending': 'bg-amber-50 text-amber-700 border-amber-200',
  'Under Review': 'bg-blue-50 text-blue-700 border-blue-200',
  'Escalated': 'bg-rose-50 text-rose-700 border-rose-200',
  'Approved': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Rejected': 'bg-rose-50 text-rose-700 border-rose-200',
  'Suspended': 'bg-slate-100 text-slate-700 border-slate-200',

  // Document statuses
  'Received': 'bg-slate-100 text-slate-700 border-slate-200',
  'Reviewed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Pending Review': 'bg-amber-50 text-amber-700 border-amber-200',

  // Risk levels
  'Low': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Medium': 'bg-amber-50 text-amber-700 border-amber-200',
  'High': 'bg-rose-50 text-rose-700 border-rose-200',

  // Delivery & Queue statuses
  'Healthy': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Watch': 'bg-amber-50 text-amber-700 border-amber-200',
  'Escalate': 'bg-orange-50 text-orange-700 border-orange-200',
  'Critical': 'bg-rose-50 text-rose-700 border-rose-200',
  'Active': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Inactive': 'bg-slate-100 text-slate-700 border-slate-200',

  // Referral statuses
  'Qualified': 'bg-blue-50 text-blue-700 border-blue-200',
  'Controlled': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Moderate': 'bg-amber-50 text-amber-700 border-amber-200',
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styleClass = statusStyleMap[status] || 'bg-slate-100 text-slate-700 border-slate-200';
  
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${styleClass}`}>
      {status}
    </span>
  );
}
