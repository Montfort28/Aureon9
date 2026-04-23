import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "./StatusBadge";

/**
 * ChannelConfigRow - Channel configuration component for notification settings
 */
export function ChannelConfigRow({ channel, enabled, provider, deliveryRate, retryWindow, onToggle }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-semibold">{channel}</p>
          <p className="mt-1 text-sm text-slate-500">
            Provider: {provider} · Delivery rate: {deliveryRate}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">Enable</span>
          <Switch checked={enabled} onCheckedChange={onToggle} />
        </div>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <Input className="rounded-2xl border-slate-200" defaultValue={provider} />
        <Input className="rounded-2xl border-slate-200" defaultValue={retryWindow} />
        <Select>
          <SelectTrigger className="rounded-2xl border-slate-200">
            <SelectValue placeholder="Priority rule" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="primary">Primary</SelectItem>
            <SelectItem value="fallback">Fallback</SelectItem>
            <SelectItem value="disabled">Disabled</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

/**
 * TemplateRow - Template configuration display in table format
 */
export function TemplateRow({ code, channel, active, owner, lastUpdated }) {
  return (
    <tr className="border-b border-slate-200 transition hover:bg-slate-50">
      <td className="px-6 py-4 font-medium">{code}</td>
      <td className="px-6 py-4">{channel}</td>
      <td className="px-6 py-4">
        <StatusBadge status={active ? "Active" : "Inactive"} />
      </td>
      <td className="px-6 py-4">{owner}</td>
      <td className="px-6 py-4">{lastUpdated}</td>
    </tr>
  );
}

/**
 * QueueAgingRow - Displays aging distribution of queue items
 */
export function QueueAgingRow({ band, count, status }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span>{band}</span>
        <span>{count} cases</span>
      </div>
      <Progress value={Math.min(count * 2, 100)} className="h-2" />
      <div className="mt-1">
        <StatusBadge status={status} />
      </div>
    </div>
  );
}

/**
 * EventAnalyticsRow - Analytics row for event delivery performance
 */
export function EventAnalyticsRow({ event, sent, delivered, failed, rate }) {
  return (
    <tr className="border-b border-slate-200 transition hover:bg-slate-50">
      <td className="px-6 py-4 font-medium">{event}</td>
      <td className="px-6 py-4">{sent.toLocaleString()}</td>
      <td className="px-6 py-4">{delivered.toLocaleString()}</td>
      <td className="px-6 py-4">{failed.toLocaleString()}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-28">
            <Progress value={rate} className="h-2" />
          </div>
          <span className="text-sm">{rate}%</span>
        </div>
      </td>
    </tr>
  );
}

/**
 * GovDeliveryToggle - Reusable toggle for governance delivery settings
 */
export function GovDeliveryToggle({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
      <span className="text-sm">{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
