import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Eye, XCircle } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

/**
 * ReviewQueueRow - Row component for review queue table
 * Used in admin review module
 */
export function ReviewQueueRow({ item, selected, onClick }) {
  return (
    <tr
      className={`cursor-pointer border-b border-slate-200 transition hover:bg-slate-50 ${
        selected ? "bg-slate-50" : ""
      }`}
      onClick={onClick}
    >
      <td className="px-6 py-4">
        <div>
          <p className="font-medium">{item.id}</p>
          <p className="text-xs text-slate-500">{item.applicant}</p>
        </div>
      </td>
      <td className="px-6 py-4">{item.participantClass}</td>
      <td className="px-6 py-4">{item.requestedLevel}</td>
      <td className="px-6 py-4">
        <StatusBadge status={item.status} />
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={item.risk} />
      </td>
    </tr>
  );
}

/**
 * ReviewCaseDetail - Detailed view of selected review case
 * Shows applicant info, verification details, and decision options
 */
export function ReviewCaseDetail({ selected, onNoteChange, onReviewerChange, onOutcomeChange }) {
  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle>Selected Review Case</CardTitle>
        <CardDescription>
          Decision console with governance notes, request actions, and approval outcomes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Case Details */}
        <div className="rounded-2xl border border-slate-200 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">Applicant</p>
              <p className="font-semibold">{selected.applicant}</p>
              <p className="mt-1 text-xs text-slate-500">{selected.email}</p>
            </div>
            <div className="text-right">
              <div className="mb-2">
                <StatusBadge status={selected.status} />
              </div>
              <p className="text-xs text-slate-500">Submitted {selected.submittedAt}</p>
            </div>
          </div>
          <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-3">
              <span className="text-slate-500">Participant Class</span>
              <p className="mt-1 font-medium">{selected.participantClass}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">
              <span className="text-slate-500">Current Tier</span>
              <p className="mt-1 font-medium">{selected.currentTier}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">
              <span className="text-slate-500">Requested Level</span>
              <p className="mt-1 font-medium">{selected.requestedLevel}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">
              <span className="text-slate-500">Assigned Reviewer</span>
              <p className="mt-1 font-medium">{selected.reviewer}</p>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Reviewer Notes</label>
          <Textarea
            className="min-h-[120px] rounded-2xl border-slate-200"
            placeholder="Add legal, compliance, qualification, or governance notes for this case..."
            onChange={onNoteChange}
          />
        </div>

        {/* Selectors */}
        <div className="grid gap-3 md:grid-cols-2">
          <Select onValueChange={onReviewerChange}>
            <SelectTrigger className="rounded-2xl border-slate-200">
              <SelectValue placeholder="Assign reviewer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="legal">Legal Compliance Desk</SelectItem>
              <SelectItem value="executive">Executive Review</SelectItem>
              <SelectItem value="qualifications">Qualifications Review</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={onOutcomeChange}>
            <SelectTrigger className="rounded-2xl border-slate-200">
              <SelectValue placeholder="Decision outcome" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="approve">Approve</SelectItem>
              <SelectItem value="reject">Reject</SelectItem>
              <SelectItem value="request-docs">Request More Documents</SelectItem>
              <SelectItem value="escalate">Escalate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="grid gap-3 md:grid-cols-3">
          <Button className="rounded-2xl bg-emerald-600 hover:bg-emerald-700">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Approve
          </Button>
          <Button variant="outline" className="rounded-2xl border-slate-200">
            <Eye className="mr-2 h-4 w-4" />
            Open Documents
          </Button>
          <Button variant="destructive" className="rounded-2xl">
            <XCircle className="mr-2 h-4 w-4" />
            Reject / Suspend
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
