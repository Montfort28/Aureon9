import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card, CardContent } from '../../components/ui/Card';
import { PageHero, SectionBlock, ShowcaseCard, StatPanel } from '../../components/public/PublicPrimitives';
import { ecosystemLinks, homeTierCards, systemPillars, verificationLevels } from '../../data/publicSiteContent';
import { BadgeCheck, ChevronRight, Coins, Network, ShieldCheck, Sparkles, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-14">
      <section className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
        <div>
          <Badge className="rounded-full border border-[rgba(10,37,64,0.12)] bg-white px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[var(--aureon-ink)]">
            Nextcloud-style public website
          </Badge>
          <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold tracking-tight text-[var(--aureon-ink)] sm:text-5xl lg:text-6xl">
            AUREON9 - Membership, Identity and Rewards Infrastructure
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Public website and pre-login experience defined by the master plan and wireframe system. The homepage in the wireframe is built around value, positioning, membership tiers, ecosystem integration, trust, and a request-access CTA.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-full bg-[var(--aureon-ink)] px-6 py-3 text-sm hover:bg-[#14385f]">
              <NavLink className="inline-flex items-center" to="/request-access">Request Access <ArrowRight className="ml-2 h-4 w-4" /></NavLink>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-slate-300 px-6 py-3">
              <NavLink to="/membership">Explore Membership</NavLink>
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden rounded-[2rem] border-white/60 bg-white/85 shadow-2xl shadow-[rgba(10,37,64,0.10)] backdrop-blur">
          <CardContent className="space-y-6 p-6 sm:p-8">
            <div className="grid gap-3 sm:grid-cols-2">
              <StatPanel icon={Users} label="Participant Classes" value="17 mandatory classes" />
              <StatPanel icon={ShieldCheck} label="Verification Levels" value="7 trust states" />
              <StatPanel icon={Coins} label="Reward Engine" value="ARX plus commissions" />
              <StatPanel icon={Network} label="Connected Layers" value="Governance to wallet" />
            </div>
            <div className="rounded-3xl bg-[linear-gradient(135deg,rgba(10,37,64,0.96),rgba(0,168,168,0.92))] p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/70">System Positioning</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {systemPillars.map((pillar) => (
                  <div key={pillar} className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm">
                    {pillar}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <SectionBlock eyebrow="Section 2" title="Membership Tiers" description="The homepage wireframe calls for a six-card public tier grid with benefits, requirements, and apply CTAs.">
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
      </SectionBlock>

      <SectionBlock eyebrow="Section 3" title="Ecosystem Integration" description="Public-facing positioning links AUREON9 to governance, sales, marketplace, wallet, and technology layers.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {ecosystemLinks.map((item) => (
            <ShowcaseCard key={item.name} title={item.name} icon={item.icon} compact>
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
            </ShowcaseCard>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock eyebrow="Section 4" title="Trust and Verification" description="The wireframe explicitly calls out verified participants only and explains document validation before access expands.">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <ShowcaseCard title="Verified Participants Only" icon={BadgeCheck}>
            <p className="text-sm leading-7 text-slate-600">Verification is not decorative. It controls trust, permissions, and how participants move into higher-value ecosystem activities.</p>
          </ShowcaseCard>
          <Card className="rounded-[2rem] border-white/60 bg-white/85">
            <CardContent className="grid gap-3 p-6 sm:grid-cols-2">
              {verificationLevels.map((level) => (
                <div key={level} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">{level}</div>
              ))}
            </CardContent>
          </Card>
        </div>
      </SectionBlock>
    </div>
  );
}
