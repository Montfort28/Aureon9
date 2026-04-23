import React, { useMemo, useState } from "react";
import { Bell, Search, ShieldCheck, Wallet, Users, Briefcase, Award, LayoutGrid, FileCheck, Settings, ChevronRight, BarChart3, BadgeDollarSign, Crown, ArrowUpRight, CheckCircle2, Clock3, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "verification", label: "Verification", icon: ShieldCheck },
  { id: "membership", label: "Membership", icon: Crown },
  { id: "wallet", label: "AUREX Wallet", icon: Wallet },
  { id: "referrals", label: "AAL Referrals", icon: Users },
  { id: "opportunities", label: "Opportunities", icon: Briefcase },
  { id: "documents", label: "Documents", icon: FileCheck },
  { id: "settings", label: "Settings", icon: Settings },
];

const stats = [
  { label: "AUREX Balance", value: "ARX 18,420", sub: "+12.4% this month", icon: Wallet },
  { label: "Tier Status", value: "Founding Executive", sub: "92% to Strategic", icon: Crown },
  { label: "Referral Earnings", value: "$4,860", sub: "37 active referrals", icon: BadgeDollarSign },
  { label: "Verification", value: "Commercial Verified", sub: "1 item pending", icon: ShieldCheck },
];

const verificationRows = [
  { item: "Identity Verification", status: "Approved", owner: "Legal & Compliance", date: "2026-04-08" },
  { item: "Business Registration", status: "Approved", owner: "Legal & Compliance", date: "2026-04-09" },
  { item: "Commercial Profile", status: "Approved", owner: "Customer Division", date: "2026-04-10" },
  { item: "Capital Participation Review", status: "Pending", owner: "Executive Review", date: "Awaiting" },
];

const opportunities = [
  {
    title: "Strategic Partner Expansion – East Africa",
    type: "Strategic Partner",
    risk: "Controlled",
    cta: "Review Opportunity",
  },
  {
    title: "ODIEXA Merchant Onboarding – Premium Operators",
    type: "Third-Party Operator",
    risk: "Moderate",
    cta: "Open Marketplace Brief",
  },
  {
    title: "Founding Member Upgrade Pathway",
    type: "Membership",
    risk: "Low",
    cta: "View Upgrade Criteria",
  },
];

const referralData = [
  { name: "CP-KE-001", class: "Channel Partner", status: "Active", conversions: 12, value: "$1,240" },
  { name: "EA-RW-014", class: "Equity Affiliate", status: "Qualified", conversions: 3, value: "$2,180" },
  { name: "SP-GH-003", class: "Strategic Partner", status: "Under Review", conversions: 1, value: "$950" },
];

const membershipTiers = [
  { name: "Member", desc: "Entry-level access for customers and users.", active: false },
  { name: "Associate", desc: "Upgraded participation with structured access and rewards.", active: false },
  { name: "Certified", desc: "Qualification-backed operational participation.", active: false },
  { name: "Executive", desc: "High-trust contributor status with broader privileges.", active: true },
  { name: "Strategic", desc: "Institutional-grade access, partner pathways, premium rights.", active: false },
  { name: "Sovereign", desc: "Reserved governance-grade status under source authority.", active: false },
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
    Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Qualified: "bg-blue-50 text-blue-700 border-blue-200",
    Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Under Review": "bg-slate-100 text-slate-700 border-slate-200",
    Controlled: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Moderate: "bg-amber-50 text-amber-700 border-amber-200",
    Low: "bg-blue-50 text-blue-700 border-blue-200",
  };
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${map[status] || "bg-slate-100 text-slate-700 border-slate-200"}`}>{status}</span>;
}

export default function Aureon9ReactStarter() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const pageTitle = useMemo(() => navItems.find((i) => i.id === activeNav)?.label || "Dashboard", [activeNav]);

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

            <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
              <Card className="rounded-2xl border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Executive Overview</CardTitle>
                  <CardDescription>
                    Membership identity, verification status, rewards movement, and opportunity access in one governed interface.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 rounded-2xl bg-slate-100">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="verification">Verification</TabsTrigger>
                      <TabsTrigger value="tiers">Tiers</TabsTrigger>
                      <TabsTrigger value="activity">Activity</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="mt-5 space-y-5">
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

                      <div className="grid gap-4 md:grid-cols-[1fr_320px]">
                        <div className="rounded-2xl border border-slate-200 p-5">
                          <div className="mb-4 flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold">Membership Value Stack</h3>
                              <p className="text-sm text-slate-500">Identity, verification, rewards, and participation control.</p>
                            </div>
                            <Badge className="rounded-full bg-[#D4AF37] text-slate-900 hover:bg-[#D4AF37]">Executive</Badge>
                          </div>
                          <div className="space-y-4">
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
                          <h3 className="font-semibold">Immediate Actions</h3>
                          <div className="mt-4 space-y-3">
                            {[
                              "Upload capital participation documents",
                              "Complete strategic partner questionnaire",
                              "Review AUREX wallet permissions",
                            ].map((item) => (
                              <button key={item} className="flex w-full items-center justify-between rounded-2xl bg-slate-50 px-3 py-3 text-left text-sm hover:bg-slate-100">
                                <span>{item}</span>
                                <ChevronRight className="h-4 w-4 text-slate-400" />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="verification" className="mt-5">
                      <div className="rounded-2xl border border-slate-200">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Verification Item</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Owner</TableHead>
                              <TableHead>Date</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {verificationRows.map((row) => (
                              <TableRow key={row.item}>
                                <TableCell className="font-medium">{row.item}</TableCell>
                                <TableCell><StatusBadge status={row.status} /></TableCell>
                                <TableCell>{row.owner}</TableCell>
                                <TableCell>{row.date}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>

                    <TabsContent value="tiers" className="mt-5">
                      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {membershipTiers.map((tier) => (
                          <Card key={tier.name} className={`rounded-2xl border ${tier.active ? "border-[#D4AF37] shadow-md" : "border-slate-200"}`}>
                            <CardContent className="p-5">
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold">{tier.name}</h3>
                                {tier.active && <Badge className="bg-[#0A2540]">Current</Badge>}
                              </div>
                              <p className="mt-3 text-sm leading-6 text-slate-500">{tier.desc}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="activity" className="mt-5">
                      <div className="grid gap-4 md:grid-cols-3">
                        <Card className="rounded-2xl border-slate-200"><CardContent className="p-5"><p className="text-sm text-slate-500">Marketplace Transactions</p><p className="mt-2 text-2xl font-semibold">148</p></CardContent></Card>
                        <Card className="rounded-2xl border-slate-200"><CardContent className="p-5"><p className="text-sm text-slate-500">Partner Interactions</p><p className="mt-2 text-2xl font-semibold">62</p></CardContent></Card>
                        <Card className="rounded-2xl border-slate-200"><CardContent className="p-5"><p className="text-sm text-slate-500">Rewards Redemptions</p><p className="mt-2 text-2xl font-semibold">19</p></CardContent></Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="rounded-2xl border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle>Opportunities</CardTitle>
                    <CardDescription>Governed pathways across membership, marketplace, and partnerships.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {opportunities.map((op) => (
                      <div key={op.title} className="rounded-2xl border border-slate-200 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-medium leading-6">{op.title}</p>
                            <p className="mt-1 text-xs text-slate-500">{op.type}</p>
                          </div>
                          <StatusBadge status={op.risk} />
                        </div>
                        <Button variant="outline" className="mt-4 w-full rounded-2xl border-slate-200">
                          {op.cta}
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="rounded-2xl border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle>Governance Alerts</CardTitle>
                    <CardDescription>Compliance, participation, and policy attention items.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      "Capital verification documents expire in 9 days.",
                      "One strategic partner agreement remains unsigned.",
                      "AUREX payout preferences require reconfirmation.",
                    ].map((alert) => (
                      <div key={alert} className="flex items-start gap-3 rounded-2xl bg-amber-50 p-3 text-sm text-amber-800">
                        <AlertTriangle className="mt-0.5 h-4 w-4" />
                        <span>{alert}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
              <Card className="rounded-2xl border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>AAL Referral Performance</CardTitle>
                  <CardDescription>Conversion-linked partner visibility across the ecosystem.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {referralData.map((row) => (
                      <div key={row.name} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                        <div>
                          <p className="font-medium">{row.name}</p>
                          <p className="text-xs text-slate-500">{row.class}</p>
                        </div>
                        <div className="text-right">
                          <div className="mb-1"><StatusBadge status={row.status} /></div>
                          <p className="text-sm font-medium">{row.conversions} conversions</p>
                          <p className="text-xs text-slate-500">{row.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Starter Implementation Notes</CardTitle>
                  <CardDescription>
                    This interface is a production-oriented starter for the AUREON9 member application and governance dashboard.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm leading-6 text-slate-600">
                  <p>
                    The layout follows a Nextcloud-style enterprise pattern: persistent sidebar, data-first cards, modular dashboards, and a strong top control bar.
                  </p>
                  <p>
                    Recommended next implementation layers are: authentication, member profile persistence, verification workflow APIs, AUREX wallet ledger, AAL referral tracking, and ODIEXA opportunity feeds.
                  </p>
                  <div className="rounded-2xl bg-slate-100 p-4 text-slate-700">
                    <p className="font-medium">Suggested stack</p>
                    <p className="mt-2 text-sm">Next.js App Router · Tailwind CSS · shadcn/ui · Prisma · PostgreSQL · NextAuth/Auth.js · OpenAPI services</p>
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
