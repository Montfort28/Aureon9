import React, { useState, useEffect } from 'react';
import {
  Bell, Search, ShieldCheck, Wallet, Users, Briefcase, Award,
  LayoutGrid, FileCheck, Settings, ChevronRight, BarChart3, BadgeDollarSign,
  Crown, ArrowUpRight, CheckCircle2, Clock3, AlertTriangle
} from 'lucide-react';
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription
} from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Progress } from '../components/ui/Progress';
import { Avatar, AvatarFallback } from '../components/ui/Avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Separator } from '../components/ui/Separator';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { id: 'verification', label: 'Verification', icon: ShieldCheck },
  { id: 'membership', label: 'Membership', icon: Crown },
  { id: 'wallet', label: 'AUREX Wallet', icon: Wallet },
  { id: 'referrals', label: 'AAL Referrals', icon: Users },
  { id: 'opportunities', label: 'Opportunities', icon: Briefcase },
  { id: 'documents', label: 'Documents', icon: FileCheck },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const stats = [
  { label: 'AUREX Balance', value: 'ARX 18,420', sub: '+12.4% this month', icon: Wallet },
  { label: 'Tier Status', value: 'Founding Executive', sub: '92% to Strategic', icon: Crown },
  { label: 'Referral Earnings', value: '$4,860', sub: '37 active referrals', icon: BadgeDollarSign },
  { label: 'Verification', value: 'Commercial Verified', sub: '1 item pending', icon: ShieldCheck },
];

function StatCard({ label, value, sub, icon: Icon }) {
  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-slate-500">{label}</p>
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

function StatusBadge({ status }) {
  const map = {
    Approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    Qualified: 'bg-blue-50 text-blue-700 border-blue-200',
    Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Under Review': 'bg-slate-100 text-slate-700 border-slate-200',
    Controlled: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Moderate: 'bg-amber-50 text-amber-700 border-amber-200',
    Low: 'bg-blue-50 text-blue-700 border-blue-200',
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${map[status] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
      {status}
    </span>
  );
}

export default function MemberDashboard() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const pageTitle = navItems.find((i) => i.id === activeNav)?.label || 'Dashboard';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-slate-200 bg-white px-4 py-5">
          <div className="mb-6 flex items-center gap-3 px-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0A2540] text-white">
              <Crown className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium tracking-wide text-slate-500">Powered By ODIEBOARD</p>
              <h1 className="text-lg font-semibold">AUREON9</h1>
            </div>
          </div>

          <div className="mb-5 px-2">
            <div className="rounded-2xl bg-gradient-to-br from-[#0A2540] to-[#0F4C81] p-4 text-white shadow-sm">
              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11 border border-white/20">
                  <AvatarFallback className="bg-white/10 text-white">MW</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Mylon Wason</p>
                  <p className="text-xs text-white/75">Founding Executive</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-white/80">
                  <span>Progress to Strategic</span>
                  <span>92%</span>
                </div>
                <Progress value={92} className="h-2 bg-white/15" />
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeNav === item.id;
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
              <ShieldCheck className="mt-0.5 h-4 w-4 text-slate-700" />
              <div>
                <p className="font-medium text-slate-900">Governance Status</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Commercial verified. One capital participation review remains pending under executive approval.
                </p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex min-w-0 flex-col">
          <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 px-5 py-4 backdrop-blur">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">ODIECLOUD²π Membership & Rewards Infrastructure</p>
                <h2 className="text-2xl font-semibold tracking-tight">{pageTitle}</h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative w-full lg:w-80">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input className="rounded-2xl border-slate-200 pl-9" placeholder="Search members, opportunities, documents..." />
                </div>
                <Button variant="outline" className="rounded-2xl border-slate-200">
                  <Bell className="mr-2 h-4 w-4" /> Notifications
                </Button>
                <Button className="rounded-2xl bg-[#0A2540] hover:bg-[#14385f]">Request Access</Button>
              </div>
            </div>
          </header>

          <div className="space-y-6 p-5 lg:p-6">
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </section>

            <section>{renderMemberSection(activeNav)}</section>
          </div>
        </main>
      </div>
    </div>
  );
}

function renderMemberSection(activeNav) {
  const sharedAlerts = [
    'Capital verification documents expire in 9 days.',
    'One strategic partner agreement remains unsigned.',
    'AUREX payout preferences require reconfirmation.',
  ];

  if (activeNav === 'verification') {
    return (
      <Card className="rounded-2xl border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Verification Center</CardTitle>
          <CardDescription>Document-backed progression through the verification framework defined in the planning documents.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-3">
            {[
              'Unverified',
              'Basic Verified',
              'Identity Verified (KYC)',
              'Commercial Verified',
              'Institutional Verified',
              'Capital Verified',
              'Governance Approved',
            ].map((level, index) => (
              <div key={level} className="rounded-2xl border border-slate-200 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="font-medium">{level}</p>
                  {index < 4 ? <StatusBadge status="Approved" /> : index === 5 ? <StatusBadge status="Pending" /> : <StatusBadge status="Under Review" />}
                </div>
                <Progress value={index < 4 ? 100 : index === 5 ? 72 : 10} className="h-2" />
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <Card className="rounded-2xl border-slate-200">
              <CardContent className="p-5">
                <h3 className="font-semibold">Required Documents</h3>
                <div className="mt-4 grid gap-3">
                  {['ID', 'Business registration', 'Financial statements', 'Contracts', 'Certifications'].map((item) => (
                    <div key={item} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                      <span>{item}</span>
                      <StatusBadge status={item === 'Financial statements' ? 'Pending' : 'Approved'} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-slate-200">
              <CardContent className="p-5">
                <h3 className="font-semibold">Approval Workflow</h3>
                <p className="mt-2 text-sm text-slate-500">Automated checks, Division 7 manual review, and escalation protocols remain active.</p>
                <div className="mt-4 space-y-3">
                  {['Automated checks completed', 'Division 7 review active', 'Executive escalation pending'].map((item) => (
                    <div key={item} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm">{item}</div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (activeNav === 'membership') {
    return (
      <Card className="rounded-2xl border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Membership Tier & Progress</CardTitle>
          <CardDescription>Tier progression, requirements, and value outputs mapped from the public tier model.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              ['Member', false],
              ['Associate', false],
              ['Certified', false],
              ['Executive', true],
              ['Strategic', false],
              ['Founding', false],
            ].map(([tier, current]) => (
              <Card key={tier} className={`rounded-2xl ${current ? 'border-[#D4AF37]' : 'border-slate-200'}`}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{tier}</p>
                    {current ? <Badge className="bg-[#0A2540] text-white">Current</Badge> : <Badge>Tier</Badge>}
                  </div>
                  <p className="mt-3 text-sm text-slate-500">Access rights, privileges, reward multipliers, and ranking outputs align to this tier state.</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="rounded-2xl border border-slate-200 p-5">
            <h3 className="font-semibold">Upgrade Requirements Checklist</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {['Qualification criteria met', 'Activity thresholds on track', 'Certification requirements active', 'Governance compliance score in range', 'Time-based progression rules satisfied', 'Revenue thresholds monitored'].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (activeNav === 'wallet') {
    return (
      <Card className="rounded-2xl border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>AUREX Wallet</CardTitle>
          <CardDescription>Wallet balance, reward settlement, and transaction movement inside the AUREX layer.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              ['Wallet Balance', 'ARX 18,420'],
              ['Commission Payouts', '$2,180'],
              ['Referral Bonuses', '$1,240'],
              ['Founding Rewards', 'ARX 640'],
            ].map(([label, value]) => (
              <Card key={label} className="rounded-2xl border-slate-200">
                <CardContent className="p-4">
                  <p className="text-sm text-slate-500">{label}</p>
                  <p className="mt-2 text-2xl font-semibold">{value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="rounded-2xl border border-slate-200">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  ['2026-04-21', 'REWARD_CREDIT', 'Membership activity', 'ARX 320'],
                  ['2026-04-20', 'COMMISSION_CREDIT', 'Partner conversion', '$480'],
                  ['2026-04-18', 'REFERRAL_BONUS', 'AAL referral', '$220'],
                ].map((row) => (
                  <TableRow key={row.join('-')}>
                    {row.map((cell) => <TableCell key={cell}>{cell}</TableCell>)}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (activeNav === 'referrals') {
    return (
      <Card className="rounded-2xl border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>AAL Referral System</CardTitle>
          <CardDescription>Unique referral path, team structure, conversions, and earnings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-2xl border border-slate-200 p-5">
            <h3 className="font-semibold">Referral Link</h3>
            <div className="mt-4 flex flex-col gap-3 md:flex-row">
              <Input defaultValue="https://aureon9.com/r/AAL-MW-001" className="rounded-2xl border-slate-200" />
              <Button variant="outline" className="rounded-2xl border-slate-200">Copy Link</Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              ['Clicks', '1,284'],
              ['Conversions', '37'],
              ['Earnings', '$4,860'],
              ['Team Structure', '3 levels'],
            ].map(([label, value]) => (
              <Card key={label} className="rounded-2xl border-slate-200">
                <CardContent className="p-4">
                  <p className="text-sm text-slate-500">{label}</p>
                  <p className="mt-2 text-2xl font-semibold">{value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (activeNav === 'opportunities') {
    return (
      <Card className="rounded-2xl border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Opportunities Feed</CardTitle>
          <CardDescription>Investment deals, trade pathways, and tours with risk and entry rules.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[
            ['Investment', 'Strategic capital participation under executive review.', 'Moderate'],
            ['Trade', 'Marketplace expansion for premium operators across ODIEXA.', 'Controlled'],
            ['Tours', 'Travel opportunity pathway with gated access conditions.', 'Low'],
          ].map(([title, text, risk]) => (
            <Card key={title} className="rounded-2xl border-slate-200">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{title}</p>
                  <StatusBadge status={risk} />
                </div>
                <p className="mt-3 text-sm text-slate-500">{text}</p>
                <Button variant="outline" className="mt-4 rounded-2xl border-slate-200">Open Opportunity</Button>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (activeNav === 'documents') {
    return (
      <Card className="rounded-2xl border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Documents & Compliance Upload</CardTitle>
          <CardDescription>Member-facing document vault for identity, commercial, and capital verification requirements.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-2xl border border-slate-200">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document Type</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  ['Government ID', 'Identity Verification', 'Approved', '2026-04-20'],
                  ['Business Registration', 'Commercial Verification', 'Approved', '2026-04-20'],
                  ['Financial Statements', 'Capital Verification', 'Pending', '2026-04-21'],
                ].map((row) => (
                  <TableRow key={row.join('-')}>
                    <TableCell>{row[0]}</TableCell>
                    <TableCell>{row[1]}</TableCell>
                    <TableCell><StatusBadge status={row[2]} /></TableCell>
                    <TableCell>{row[3]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Button className="rounded-2xl bg-[#0A2540] hover:bg-[#14385f]">Upload New Document</Button>
        </CardContent>
      </Card>
    );
  }

  if (activeNav === 'settings') {
    return (
      <Card className="rounded-2xl border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Profile, linked accounts, notification preferences, and payout controls.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            {['Profile photo', 'Personal info', 'Business info', 'Linked accounts'].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 p-4 text-sm">{item}</div>
            ))}
          </div>
          <div className="space-y-3">
            {sharedAlerts.map((alert) => (
              <div key={alert} className="flex items-start gap-3 rounded-2xl bg-amber-50 p-3 text-sm text-amber-800">
                <AlertTriangle className="mt-0.5 h-4 w-4" />
                <span>{alert}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle>Dashboard Overview</CardTitle>
        <CardDescription>Your AUREON9 membership status and governance standing.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="rounded-2xl border-slate-200">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-emerald-50 p-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /></div>
                <div>
                  <p className="text-sm font-medium">Membership Active</p>
                  <p className="text-xs text-slate-500">AUREON9 privileges enabled</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-slate-200">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-amber-50 p-2"><Clock3 className="h-4 w-4 text-amber-600" /></div>
                <div>
                  <p className="text-sm font-medium">Capital Review Pending</p>
                  <p className="text-xs text-slate-500">Executive underwriting clearance</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-slate-200">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-blue-50 p-2"><BarChart3 className="h-4 w-4 text-blue-600" /></div>
                <div>
                  <p className="text-sm font-medium">Engagement Score</p>
                  <p className="text-xs text-slate-500">84 / 100 governance-compliant</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="rounded-2xl border border-slate-200 p-5">
          <h3 className="font-semibold">Membership Value Stack</h3>
          <p className="text-sm text-slate-500">Identity, verification, rewards, and participation control.</p>
          <div className="mt-4 space-y-4">
            <div>
              <div className="mb-1 flex items-center justify-between text-sm"><span>Verification Readiness</span><span>88%</span></div>
              <Progress value={88} className="h-2" />
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between text-sm"><span>Tier Upgrade Progress</span><span>92%</span></div>
              <Progress value={92} className="h-2" />
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between text-sm"><span>Rewards Activation</span><span>74%</span></div>
              <Progress value={74} className="h-2" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-5">
          <h3 className="font-semibold">Governance Alerts</h3>
          <div className="mt-4 space-y-3">
            {sharedAlerts.map((alert) => (
              <div key={alert} className="flex items-start gap-3 rounded-2xl bg-amber-50 p-3 text-sm text-amber-800">
                <AlertTriangle className="mt-0.5 h-4 w-4" />
                <span>{alert}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
