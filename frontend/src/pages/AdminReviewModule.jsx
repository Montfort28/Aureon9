import React, { useState, useMemo } from 'react';
import {
  ShieldCheck, Upload, Search, Filter, CheckCircle2, XCircle, Clock3,
  FileText, User2, BadgeCheck, AlertTriangle, Eye, ChevronDown, LayoutGrid,
  Users, Settings, FileCheck2, BellRing
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Avatar, AvatarFallback } from '../components/ui/Avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Textarea } from '../components/ui/Textarea';
import { Separator } from '../components/ui/Separator';

const nav = [
  { id: 'queue', label: 'Review Queue', icon: FileCheck2 },
  { id: 'uploads', label: 'Document Uploads', icon: Upload },
  { id: 'roles', label: 'Role-Based Access', icon: ShieldCheck },
  { id: 'members', label: 'Members', icon: Users },
  { id: 'settings', label: 'Governance Settings', icon: Settings },
];

const queueItems = [
  {
    id: 'VR-10012',
    applicant: 'Aureon Founding Architect – Kenya',
    email: 'architect.ke@sample.org',
    participantClass: 'Founding Member',
    requestedLevel: 'Capital Verified',
    currentTier: 'Executive',
    status: 'Pending',
    submittedAt: '2026-04-20 09:40',
    reviewer: 'Unassigned',
    risk: 'Medium',
  },
  {
    id: 'VR-10013',
    applicant: 'ODIEXA Trade Operator – Rwanda',
    email: 'operator.rw@sample.org',
    participantClass: 'Third-Party Operator',
    requestedLevel: 'Commercial Verified',
    currentTier: 'Certified',
    status: 'Under Review',
    submittedAt: '2026-04-20 10:25',
    reviewer: 'Legal Compliance Desk',
    risk: 'Low',
  },
  {
    id: 'VR-10014',
    applicant: 'Strategic Capital Participant - Ghana',
    email: 'capital.gh@sample.org',
    participantClass: 'Capital Participant',
    requestedLevel: 'Governance Approved',
    currentTier: 'Strategic',
    status: 'Escalated',
    submittedAt: '2026-04-20 11:05',
    reviewer: 'Executive Governance Desk',
    risk: 'High',
  },
];

const documentRows = [
  {
    id: 'DOC-2201',
    type: 'Government ID',
    owner: 'Aureon Founding Architect – Kenya',
    verificationUse: 'Identity Verification',
    uploadedAt: '2026-04-20 09:35',
    status: 'Received',
  },
  {
    id: 'DOC-2202',
    type: 'Business Registration',
    owner: 'ODIEXA Trade Operator – Rwanda',
    verificationUse: 'Commercial Verification',
    uploadedAt: '2026-04-20 10:18',
    status: 'Reviewed',
  },
];

const roles = [
  {
    role: 'SUPER_ADMIN',
    scope: 'Full platform control',
    screens: 'All',
    actions: 'Create, approve, suspend, audit, configure',
  },
  {
    role: 'EXECUTIVE',
    scope: 'Governance and escalated approvals',
    screens: 'Queue, Roles, Members, Settings',
    actions: 'Approve governance/capital reviews, override decisions',
  },
  {
    role: 'LEGAL_COMPLIANCE',
    scope: 'Verification, documents, compliance',
    screens: 'Queue, Uploads, Members',
    actions: 'Review, approve, reject, request documents',
  },
];

function statusBadge(status) {
  const map = {
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    'Under Review': 'bg-blue-50 text-blue-700 border-blue-200',
    Escalated: 'bg-rose-50 text-rose-700 border-rose-200',
    Received: 'bg-slate-100 text-slate-700 border-slate-200',
    Reviewed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Pending Review': 'bg-amber-50 text-amber-700 border-amber-200',
    Low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Medium: 'bg-amber-50 text-amber-700 border-amber-200',
    High: 'bg-rose-50 text-rose-700 border-rose-200',
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${map[status] ?? 'bg-slate-100 text-slate-700 border-slate-200'}`}>
      {status}
    </span>
  );
}

function Metric({ title, value, sub, icon: Icon }) {
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

export default function AdminReviewModule() {
  const [activeNav, setActiveNav] = useState('queue');
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
                  className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm transition ${active ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
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

            {activeNav === 'queue' && (
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
                              className={`cursor-pointer ${selectedQueueId === item.id ? 'bg-slate-50' : ''}`}
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
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Assign Reviewer</label>
                        <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900">
                          <option>Legal Compliance Desk</option>
                          <option>Executive Governance Desk</option>
                          <option>Qualifications Control</option>
                          <option>Customer Operations Desk</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Decision Outcome</label>
                        <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900">
                          <option>Under Review</option>
                          <option>Approve</option>
                          <option>Request More Documents</option>
                          <option>Escalate</option>
                          <option>Reject</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3">
                      <Button className="rounded-2xl bg-emerald-600 hover:bg-emerald-700"><CheckCircle2 className="mr-2 h-4 w-4" />Approve</Button>
                      <Button variant="outline" className="rounded-2xl border-slate-200"><Eye className="mr-2 h-4 w-4" />Open Documents</Button>
                      <Button className="rounded-2xl bg-red-600 hover:bg-red-700"><XCircle className="mr-2 h-4 w-4" />Reject</Button>
                    </div>
                  </CardContent>
                </Card>
              </section>
            )}

            {activeNav === 'uploads' && (
              <Card className="rounded-2xl border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Document Upload Workflow</CardTitle>
                  <CardDescription>Backoffice-controlled intake for identity, business, compliance, and capital review documents.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
            )}

            {activeNav === 'roles' && (
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
                </CardContent>
              </Card>
            )}

            {activeNav === 'members' && (
              <Card className="rounded-2xl border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Members</CardTitle>
                  <CardDescription>Controlled visibility for member identity, class, tier, and verification movement.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-2xl border border-slate-200">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Member</TableHead>
                          <TableHead>Class</TableHead>
                          <TableHead>Tier</TableHead>
                          <TableHead>Verification</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {queueItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.applicant}</TableCell>
                            <TableCell>{item.participantClass}</TableCell>
                            <TableCell>{item.currentTier}</TableCell>
                            <TableCell>{item.requestedLevel}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeNav === 'settings' && (
              <Card className="rounded-2xl border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Governance Settings</CardTitle>
                  <CardDescription>Role enforcement, escalation, and review handling rules for controlled queues.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  {[
                    'Auto-escalate high-risk capital participants',
                    'Require executive review for governance-approved requests',
                    'Preserve reviewer notes in audit logs',
                    'Restrict approval actions to legal and executive roles',
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-slate-200 p-4 text-sm">{item}</div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
