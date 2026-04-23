import React, { useMemo, useState } from "react";
import { ShieldCheck, Upload, Search, Filter, CheckCircle2, XCircle, Clock3, FileText, User2, BadgeCheck, AlertTriangle, Eye, ChevronDown, LayoutGrid, Users, Settings, FileCheck2, BellRing } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const nav = [
  { id: "queue", label: "Review Queue", icon: FileCheck2 },
  { id: "uploads", label: "Document Uploads", icon: Upload },
  { id: "roles", label: "Role-Based Access", icon: ShieldCheck },
  { id: "members", label: "Members", icon: Users },
  { id: "settings", label: "Governance Settings", icon: Settings },
];

const queueItems = [
  {
    id: "VR-10012",
    applicant: "Aureon Founding Architect – Kenya",
    email: "architect.ke@sample.org",
    participantClass: "Founding Member",
    requestedLevel: "Capital Verified",
    currentTier: "Executive",
    status: "Pending",
    submittedAt: "2026-04-20 09:40",
    reviewer: "Unassigned",
    risk: "Medium",
  },
  {
    id: "VR-10013",
    applicant: "ODIEXA Trade Operator – Rwanda",
    email: "operator.rw@sample.org",
    participantClass: "Third-Party Operator",
    requestedLevel: "Commercial Verified",
    currentTier: "Certified",
    status: "Under Review",
    submittedAt: "2026-04-20 10:25",
    reviewer: "Legal Compliance Desk",
    risk: "Low",
  },
  {
    id: "VR-10014",
    applicant: "Capital Syndicate Participant – Ghana",
    email: "syndicate.gh@sample.org",
    participantClass: "Capital Participant",
    requestedLevel: "Governance Approved",
    currentTier: "Strategic",
    status: "Escalated",
    submittedAt: "2026-04-20 11:12",
    reviewer: "Executive Review",
    risk: "High",
  },
];

const documentRows = [
  {
    id: "DOC-2201",
    type: "Government ID",
    owner: "Aureon Founding Architect – Kenya",
    verificationUse: "Identity Verification",
    uploadedAt: "2026-04-20 09:35",
    status: "Received",
  },
  {
    id: "DOC-2202",
    type: "Business Registration",
    owner: "ODIEXA Trade Operator – Rwanda",
    verificationUse: "Commercial Verification",
    uploadedAt: "2026-04-20 10:18",
    status: "Reviewed",
  },
  {
    id: "DOC-2203",
    type: "Capital Source Letter",
    owner: "Capital Syndicate Participant – Ghana",
    verificationUse: "Capital Review",
    uploadedAt: "2026-04-20 11:05",
    status: "Pending Review",
  },
];

const roles = [
  {
    role: "SUPER_ADMIN",
    scope: "Full platform control",
    screens: "All",
    actions: "Create, approve, suspend, audit, configure",
  },
  {
    role: "EXECUTIVE",
    scope: "Governance and escalated approvals",
    screens: "Queue, Roles, Members, Settings",
    actions: "Approve governance/capital reviews, override decisions",
  },
  {
    role: "LEGAL_COMPLIANCE",
    scope: "Verification, documents, compliance",
    screens: "Queue, Uploads, Members",
    actions: "Review, approve, reject, request documents",
  },
  {
    role: "QUALIFICATIONS",
    scope: "Tier and certification review",
    screens: "Queue, Members",
    actions: "Recommend tier movement, validate certification status",
  },
  {
    role: "CUSTOMER_SUCCESS",
    scope: "Onboarding and support visibility",
    screens: "Uploads, Members",
    actions: "Track missing items, coordinate applicants",
  },
];

function statusBadge(status: string) {
  const map: Record<string, string> = {
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    "Under Review": "bg-blue-50 text-blue-700 border-blue-200",
    Escalated: "bg-rose-50 text-rose-700 border-rose-200",
    Received: "bg-slate-100 text-slate-700 border-slate-200",
    Reviewed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Pending Review": "bg-amber-50 text-amber-700 border-amber-200",
    Low: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Medium: "bg-amber-50 text-amber-700 border-amber-200",
    High: "bg-rose-50 text-rose-700 border-rose-200",
  };
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${map[status] ?? "bg-slate-100 text-slate-700 border-slate-200"}`}>{status}</span>;
}

function Metric({ title, value, sub, icon: Icon }: { title: string; value: string; sub: string; icon: any }) {
  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-slate-500">{title}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{value}</p>
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

export default function Aureon9AdminReviewModule() {
  const [activeNav, setActiveNav] = useState("queue");
  const [selectedQueueId, setSelectedQueueId] = useState(queueItems[0].id);
  const selected = useMemo(() => queueItems.find((q) => q.id === selectedQueueId) ?? queueItems[0], [selectedQueueId]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-slate-200 bg-white px-4 py-5">
          <div className="mb-6 flex items-center gap-3 px-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0A2540] text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium tracking-wide text-slate-500">Powered By ODIEBOARD</p>
              <h1 className="text-lg font-semibold">AUREON9 Admin</h1>
            </div>
          </div>

          <div className="mb-5 px-2">
            <div className="rounded-2xl bg-gradient-to-br from-[#0A2540] to-[#0F4C81] p-4 text-white shadow-sm">
              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11 border border-white/20">
                  <AvatarFallback className="bg-white/10 text-white">LC</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Legal Compliance Desk</p>
                  <p className="text-xs text-white/75">Verification & Governance Review</p>
                </div>
              </div>
              <div className="mt-4 rounded-2xl bg-white/10 px-3 py-2 text-xs text-white/85">
                Role-controlled workflow for documents, review decisions, and escalation.
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = item.id === activeNav;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm transition ${active ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <Separator className="my-5" />

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
            <div className="flex items-start gap-3">
              <BellRing className="mt-0.5 h-4 w-4 text-slate-700" />
              <div>
                <p className="font-medium text-slate-900">Queue Priority</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  1 escalated case, 2 pending reviews, 3 document requests awaiting action.
                </p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex flex-col">
          <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 px-5 py-4 backdrop-blur">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">AUREON9 Verification, Documents & Governance Access</p>
                <h2 className="text-2xl font-semibold tracking-tight">Document Upload + Review Queue + Role-Based Admin</h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative w-full lg:w-80">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input className="rounded-2xl border-slate-200 pl-9" placeholder="Search by applicant, class, document ID..." />
                </div>
                <Button variant="outline" className="rounded-2xl border-slate-200">
                  <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
                <Button className="rounded-2xl bg-[#0A2540] hover:bg-[#14385f]">Export Review Log</Button>
              </div>
            </div>
          </header>

          <div className="space-y-6 p-5 lg:p-6">
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Metric title="Pending Cases" value="27" sub="Awaiting first-level review" icon={Clock3} />
              <Metric title="Escalated Reviews" value="4" sub="Executive or legal escalation" icon={AlertTriangle} />
              <Metric title="Documents Received" value="193" sub="This reporting cycle" icon={FileText} />
              <Metric title="Approval Rate" value="94.6%" sub="Governance-compliant approvals" icon={BadgeCheck} />
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <Card className="rounded-2xl border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Verification Review Queue</CardTitle>
                  <CardDescription>
                    Structured review workflow for Founding Members, partners, operators, capital participants, and other controlled classes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-2xl border border-slate-200">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Case</TableHead>
                          <TableHead>Participant Class</TableHead>
                          <TableHead>Requested Level</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Risk</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {queueItems.map((item) => (
                          <TableRow
                            key={item.id}
                            className={`cursor-pointer ${selectedQueueId === item.id ? "bg-slate-50" : ""}`}
                            onClick={() => setSelectedQueueId(item.id)}
                          >
                            <TableCell>
                              <div>
                                <p className="font-medium">{item.id}</p>
                                <p className="text-xs text-slate-500">{item.applicant}</p>
                              </div>
                            </TableCell>
                            <TableCell>{item.participantClass}</TableCell>
                            <TableCell>{item.requestedLevel}</TableCell>
                            <TableCell>{statusBadge(item.status)}</TableCell>
                            <TableCell>{statusBadge(item.risk)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Selected Review Case</CardTitle>
                  <CardDescription>Decision console with governance notes, request actions, and approval outcomes.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-slate-500">Applicant</p>
                        <p className="font-semibold">{selected.applicant}</p>
                        <p className="mt-1 text-xs text-slate-500">{selected.email}</p>
                      </div>
                      <div className="text-right">
                        <div className="mb-2">{statusBadge(selected.status)}</div>
                        <p className="text-xs text-slate-500">Submitted {selected.submittedAt}</p>
                      </div>
                    </div>
                    <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
                      <div className="rounded-2xl bg-slate-50 p-3"><span className="text-slate-500">Participant Class</span><p className="mt-1 font-medium">{selected.participantClass}</p></div>
                      <div className="rounded-2xl bg-slate-50 p-3"><span className="text-slate-500">Current Tier</span><p className="mt-1 font-medium">{selected.currentTier}</p></div>
                      <div className="rounded-2xl bg-slate-50 p-3"><span className="text-slate-500">Requested Level</span><p className="mt-1 font-medium">{selected.requestedLevel}</p></div>
                      <div className="rounded-2xl bg-slate-50 p-3"><span className="text-slate-500">Assigned Reviewer</span><p className="mt-1 font-medium">{selected.reviewer}</p></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Reviewer Notes</label>
                    <Textarea className="min-h-[120px] rounded-2xl border-slate-200" placeholder="Add legal, compliance, qualification, or governance notes for this case..." />
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <Select>
                      <SelectTrigger className="rounded-2xl border-slate-200">
                        <SelectValue placeholder="Assign reviewer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="legal">Legal Compliance Desk</SelectItem>
                        <SelectItem value="executive">Executive Review</SelectItem>
                        <SelectItem value="qualifications">Qualifications Review</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
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

                  <div className="grid gap-3 md:grid-cols-3">
                    <Button className="rounded-2xl bg-emerald-600 hover:bg-emerald-700"><CheckCircle2 className="mr-2 h-4 w-4" />Approve</Button>
                    <Button variant="outline" className="rounded-2xl border-slate-200"><Eye className="mr-2 h-4 w-4" />Open Documents</Button>
                    <Button variant="destructive" className="rounded-2xl"><XCircle className="mr-2 h-4 w-4" />Reject / Suspend</Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
              <Card className="rounded-2xl border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Document Upload Workflow</CardTitle>
                  <CardDescription>Backoffice-controlled intake for identity, business, compliance, and capital review documents.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center">
                      <Upload className="mx-auto h-5 w-5 text-slate-500" />
                      <p className="mt-3 text-sm font-medium">Drop files here</p>
                      <p className="mt-1 text-xs text-slate-500">ID, registration, certifications, compliance docs, capital proofs</p>
                      <Button variant="outline" className="mt-4 rounded-2xl border-slate-200">Select Files</Button>
                    </div>
                    <div className="space-y-3">
                      <Input className="rounded-2xl border-slate-200" placeholder="Member Profile ID or email" />
                      <Select>
                        <SelectTrigger className="rounded-2xl border-slate-200">
                          <SelectValue placeholder="Document type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="id">Government ID</SelectItem>
                          <SelectItem value="registration">Business Registration</SelectItem>
                          <SelectItem value="compliance">Compliance Certificate</SelectItem>
                          <SelectItem value="capital">Capital Source Letter</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger className="rounded-2xl border-slate-200">
                          <SelectValue placeholder="Verification purpose" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="identity">Identity Verification</SelectItem>
                          <SelectItem value="commercial">Commercial Verification</SelectItem>
                          <SelectItem value="institutional">Institutional Verification</SelectItem>
                          <SelectItem value="capital">Capital Review</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button className="w-full rounded-2xl bg-[#0A2540] hover:bg-[#14385f]">Submit to Review Queue</Button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Document</TableHead>
                          <TableHead>Owner</TableHead>
                          <TableHead>Verification Use</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {documentRows.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{row.id}</p>
                                <p className="text-xs text-slate-500">{row.type}</p>
                              </div>
                            </TableCell>
                            <TableCell>{row.owner}</TableCell>
                            <TableCell>{row.verificationUse}</TableCell>
                            <TableCell>{statusBadge(row.status)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Role-Based Admin Screen Matrix</CardTitle>
                  <CardDescription>Access control model for review, upload, approval, and governance actions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-2xl border border-slate-200">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Role</TableHead>
                          <TableHead>Scope</TableHead>
                          <TableHead>Screens</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {roles.map((role) => (
                          <TableRow key={role.role}>
                            <TableCell className="font-medium">{role.role}</TableCell>
                            <TableCell>{role.scope}</TableCell>
                            <TableCell>{role.screens}</TableCell>
                            <TableCell>{role.actions}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="mt-4 rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
                    Recommended enforcement: middleware route guards, server-side permission checks, audit logs for all approval actions, and queue escalation rules for high-risk capital or strategic cases.
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <Card className="rounded-2xl border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Implementation Notes</CardTitle>
                  <CardDescription>Backend + UI handoff for document upload, review queue, and admin access control.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <p className="font-semibold">Document Upload</p>
                    <p className="mt-2 text-sm text-slate-500">Use signed upload URLs, store file metadata in MemberDocument, and attach each upload to a verification purpose and member profile.</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <p className="font-semibold">Review Queue</p>
                    <p className="mt-2 text-sm text-slate-500">Create queue states: pending, under review, request docs, escalated, approved, rejected, suspended. All decisions must write audit logs.</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <p className="font-semibold">Role Screens</p>
                    <p className="mt-2 text-sm text-slate-500">Drive visibility from user role plus case risk level. Executive and Legal handle escalations; Qualifications validates certification-linked promotions.</p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
