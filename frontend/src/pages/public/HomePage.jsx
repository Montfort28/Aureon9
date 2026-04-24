import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, BadgeCheck, ChevronRight, Coins, Network, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card, CardContent } from '../../components/ui/Card';
import { ShowcaseCard } from '../../components/public/PublicPrimitives';
import { ecosystemLinks, homeTierCards, systemPillars, verificationLevels } from '../../data/publicSiteContent';

export default function HomePage() {
  return (
    <div className="space-y-20 pb-20">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">

        {/* Left — headline + CTAs */}
        <div className="flex flex-col justify-center pt-0 lg:pt-0">
          <Badge className="w-fit rounded-full border border-[rgba(10,37,64,0.12)] bg-white px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[var(--aureon-ink)]">
            Enterprise Membership Platform
          </Badge>
          <h1 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-[var(--aureon-ink)] sm:text-4xl lg:text-5xl">
            AUREON9 — Membership, Identity &amp; Rewards Infrastructure
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            A governed platform for participant classification, identity verification, tier progression, AUREX rewards, and controlled opportunity access — powered by ODIEBOARD.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-full bg-[var(--aureon-ink)] px-6 py-2.5 text-sm hover:bg-[#14385f]">
              <NavLink className="inline-flex items-center gap-2" to="/request-access">
                Request Access <ArrowRight className="h-4 w-4" />
              </NavLink>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-slate-300 px-6 py-2.5 text-sm">
              <NavLink to="/membership">Explore Membership</NavLink>
            </Button>
          </div>
        </div>

        {/* Right — image card, NO overlay */}
        <div className="overflow-hidden rounded-[2rem] shadow-2xl shadow-[rgba(10,37,64,0.14)]">
          <div
            className="relative flex min-h-[520px] flex-col justify-end bg-cover bg-center"
            style={{ backgroundImage: "url('/images/dorian-labbe-y2vAEkdaAdA-unsplash.jpg')" }}
          >
            {/* Subtle bottom scrim only — image stays fully visible */}
            <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Content sits at the bottom over the image */}
            <div className="relative space-y-4 p-6 sm:p-8">
              {/* 4 stat chips */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Users,       label: 'Participant Classes', value: '17 mandatory classes' },
                  { icon: ShieldCheck, label: 'Verification Levels', value: '7 trust states' },
                  { icon: Coins,       label: 'Reward Engine',       value: 'ARX plus commissions' },
                  { icon: Network,     label: 'Connected Layers',    value: 'Governance to wallet' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/20 bg-black/35 px-4 py-3 backdrop-blur-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">{label}</p>
                      <p className="mt-0.5 text-sm font-semibold text-white">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* System Positioning pills */}
              <div className="rounded-2xl border border-white/20 bg-black/35 p-5 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">System Positioning</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {systemPillars.map((pillar) => (
                    <div key={pillar} className="rounded-xl border border-white/10 bg-white/10 px-3 py-2.5 text-sm text-white">
                      {pillar}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MEMBERSHIP TIERS ─────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-[var(--aureon-ink)]">Membership Tiers</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            Seven tiers from Entry through Sovereign — each with defined benefits, requirements, and upgrade paths.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {homeTierCards.map((tierName) => (
            <ShowcaseCard key={tierName} title={tierName} icon={Sparkles}>
              <p className="text-sm leading-6 text-slate-600">Benefits, requirements, and the apply path are exposed here before login.</p>
              <NavLink className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--aureon-ink)]" to="/tiers">
                Apply <ChevronRight className="h-4 w-4" />
              </NavLink>
            </ShowcaseCard>
          ))}
        </div>
      </section>

      {/* ── ECOSYSTEM INTEGRATION ────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-[var(--aureon-ink)]">Ecosystem Integration</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            AUREON9 connects governance, sales, marketplace, wallet, and technology layers into one unified infrastructure.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {ecosystemLinks.map((item) => (
            <ShowcaseCard key={item.name} title={item.name} icon={item.icon} compact>
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
            </ShowcaseCard>
          ))}
        </div>
      </section>

      {/* ── TRUST & VERIFICATION ─────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-[var(--aureon-ink)]">Trust and Verification</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            Verification controls trust, permissions, and how participants move into higher-value ecosystem activities.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <ShowcaseCard title="Verified Participants Only" icon={BadgeCheck}>
            <p className="text-sm leading-7 text-slate-600">
              Verification is not decorative. It controls trust, permissions, and how participants move into higher-value ecosystem activities.
            </p>
          </ShowcaseCard>
          <Card className="rounded-[2rem] border-white/60 bg-white/85">
            <CardContent className="grid gap-3 p-6 sm:grid-cols-2">
              {verificationLevels.map((level) => (
                <div key={level} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                  {level}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

    </div>
  );
}
