# AUREON9 Backend Foundation

## Stack
- Next.js App Router
- TypeScript
- Prisma ORM
- PostgreSQL
- NextAuth/Auth.js
- Zod
- REST-style route handlers
- Role + verification-aware access control

---

## 1. Recommended Folder Structure

```text
/apps
  /aureon9-web
    /src
      /app
        /api
          /auth/[...nextauth]/route.ts
          /members/route.ts
          /members/[id]/route.ts
          /participant-classes/route.ts
          /tiers/route.ts
          /verification-records/route.ts
          /verification-records/[id]/approve/route.ts
          /wallets/route.ts
          /wallet-transactions/route.ts
          /referrals/route.ts
          /opportunities/route.ts
          /documents/upload/route.ts
      /lib
        auth.ts
        db.ts
        permissions.ts
        validation.ts
        audit.ts
      /modules
        /members
        /verification
        /wallet
        /referrals
        /opportunities
      /types
        auth.ts
        member.ts
  /packages
    /config
    /ui
    /types
```

---

## 2. Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserRole {
  SUPER_ADMIN
  EXECUTIVE
  LEGAL_COMPLIANCE
  QUALIFICATIONS
  CUSTOMER_SUCCESS
  FINANCE_TREASURY
  MEMBER
  PARTNER
  OPERATOR
}

enum ParticipantClassCode {
  FOUNDING_MEMBER
  GENERAL_MEMBER
  CUSTOMER
  CHANNEL_PARTNER
  AFFILIATE
  INTERN
  DEVELOPER
  EQUITY_AFFILIATE
  EQUITY_PARTNER
  STRATEGIC_PARTNER
  OEM_PARTNER
  TRADE_OPERATOR
  CAPITAL_PARTICIPANT
  VERIFICATION_ACTOR
  SETTLEMENT_PARTICIPANT
  INSTITUTIONAL_PARTICIPANT
  THIRD_PARTY_OPERATOR
}

enum MembershipTierCode {
  MEMBER
  ASSOCIATE
  CERTIFIED
  EXECUTIVE
  STRATEGIC
  FOUNDING
  SOVEREIGN
}

enum VerificationLevel {
  UNVERIFIED
  BASIC_VERIFIED
  IDENTITY_VERIFIED
  COMMERCIAL_VERIFIED
  INSTITUTIONAL_VERIFIED
  CAPITAL_VERIFIED
  GOVERNANCE_APPROVED
}

enum VerificationStatus {
  PENDING
  UNDER_REVIEW
  APPROVED
  REJECTED
  SUSPENDED
}

enum WalletTransactionType {
  REWARD_CREDIT
  COMMISSION_CREDIT
  REFERRAL_BONUS
  REDEMPTION
  WITHDRAWAL
  SETTLEMENT
  ADJUSTMENT
}

enum OpportunityType {
  INVESTMENT
  TRADE
  TOURISM
  PARTNERSHIP
  CAREER
  MARKETPLACE
}

enum OpportunityAccessRule {
  PUBLIC
  VERIFIED_ONLY
  CERTIFIED_PLUS
  EXECUTIVE_PLUS
  STRATEGIC_PLUS
  INVITE_ONLY
}

model User {
  id                String               @id @default(cuid())
  email             String               @unique
  name              String?
  passwordHash      String?
  role              UserRole             @default(MEMBER)
  isActive          Boolean              @default(true)
  createdAt         DateTime             @default(now())
  updatedAt         DateTime             @updatedAt
  memberProfile     MemberProfile?
  createdAuditLogs  AuditLog[]           @relation("AuditActor")
}

model ParticipantClass {
  id                String               @id @default(cuid())
  code              ParticipantClassCode @unique
  name              String
  description       String?
  isActive          Boolean              @default(true)
  profiles          MemberProfile[]
  createdAt         DateTime             @default(now())
  updatedAt         DateTime             @updatedAt
}

model MembershipTier {
  id                String               @id @default(cuid())
  code              MembershipTierCode   @unique
  name              String
  rank              Int
  description       String?
  isActive          Boolean              @default(true)
  profiles          MemberProfile[]
  createdAt         DateTime             @default(now())
  updatedAt         DateTime             @updatedAt
}

model MemberProfile {
  id                   String               @id @default(cuid())
  userId               String               @unique
  participantClassId   String
  tierId               String
  verificationLevel    VerificationLevel    @default(UNVERIFIED)
  displayName          String?
  country              String?
  phone                String?
  businessName         String?
  referralCode         String               @unique
  referredByProfileId  String?
  aurexWalletId        String?
  status               String               @default("ACTIVE")
  createdAt            DateTime             @default(now())
  updatedAt            DateTime             @updatedAt

  user                 User                 @relation(fields: [userId], references: [id])
  participantClass     ParticipantClass     @relation(fields: [participantClassId], references: [id])
  tier                 MembershipTier       @relation(fields: [tierId], references: [id])
  wallet               AurexWallet?
  verificationRecords  VerificationRecord[]
  documents            MemberDocument[]
  referralsSent        Referral[]           @relation("ReferralSender")
  referralsReceived    Referral[]           @relation("ReferralReceiver")
}

model VerificationRecord {
  id                   String               @id @default(cuid())
  memberProfileId      String
  requestedLevel       VerificationLevel
  status               VerificationStatus   @default(PENDING)
  notes                String?
  reviewedByUserId     String?
  submittedAt          DateTime             @default(now())
  reviewedAt           DateTime?
  memberProfile        MemberProfile        @relation(fields: [memberProfileId], references: [id])
}

model MemberDocument {
  id                   String               @id @default(cuid())
  memberProfileId      String
  documentType         String
  fileUrl              String
  fileName             String
  uploadedAt           DateTime             @default(now())
  memberProfile        MemberProfile        @relation(fields: [memberProfileId], references: [id])
}

model AurexWallet {
  id                   String               @id @default(cuid())
  memberProfileId      String               @unique
  balance              Decimal              @default(0) @db.Decimal(18, 4)
  currencyCode         String               @default("ARX")
  createdAt            DateTime             @default(now())
  updatedAt            DateTime             @updatedAt
  memberProfile        MemberProfile        @relation(fields: [memberProfileId], references: [id])
  transactions         WalletTransaction[]
}

model WalletTransaction {
  id                   String               @id @default(cuid())
  walletId             String
  type                 WalletTransactionType
  amount               Decimal              @db.Decimal(18, 4)
  reference            String?
  notes                String?
  createdAt            DateTime             @default(now())
  wallet               AurexWallet          @relation(fields: [walletId], references: [id])
}

model Referral {
  id                    String              @id @default(cuid())
  senderProfileId       String
  receiverProfileId     String?
  receiverEmail         String?
  campaignCode          String?
  status                String              @default("PENDING")
  createdAt             DateTime            @default(now())
  sender                MemberProfile       @relation("ReferralSender", fields: [senderProfileId], references: [id])
  receiver              MemberProfile?      @relation("ReferralReceiver", fields: [receiverProfileId], references: [id])
}

model Opportunity {
  id                    String               @id @default(cuid())
  title                 String
  description           String?
  type                  OpportunityType
  accessRule            OpportunityAccessRule
  isPublished           Boolean              @default(false)
  country               String?
  createdAt             DateTime             @default(now())
  updatedAt             DateTime             @updatedAt
}

model AuditLog {
  id                    String               @id @default(cuid())
  actorUserId           String?
  entityType            String
  entityId              String
  action                String
  payloadJson           Json?
  createdAt             DateTime             @default(now())
  actor                 User?                @relation("AuditActor", fields: [actorUserId], references: [id])
}
```

---

## 3. Prisma Seed Baseline

```ts
// prisma/seed.ts
import { PrismaClient, MembershipTierCode, ParticipantClassCode } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const tiers = [
    { code: MembershipTierCode.MEMBER, name: "Member", rank: 1 },
    { code: MembershipTierCode.ASSOCIATE, name: "Associate", rank: 2 },
    { code: MembershipTierCode.CERTIFIED, name: "Certified", rank: 3 },
    { code: MembershipTierCode.EXECUTIVE, name: "Executive", rank: 4 },
    { code: MembershipTierCode.STRATEGIC, name: "Strategic", rank: 5 },
    { code: MembershipTierCode.FOUNDING, name: "Founding", rank: 6 },
    { code: MembershipTierCode.SOVEREIGN, name: "Sovereign", rank: 7 },
  ];

  for (const tier of tiers) {
    await prisma.membershipTier.upsert({
      where: { code: tier.code },
      update: tier,
      create: tier,
    });
  }

  const classes = Object.values(ParticipantClassCode).map((code) => ({
    code,
    name: code.replaceAll("_", " "),
  }));

  for (const item of classes) {
    await prisma.participantClass.upsert({
      where: { code: item.code },
      update: item,
      create: item,
    });
  }
}

main().finally(async () => prisma.$disconnect());
```

---

## 4. Database Client

```ts
// src/lib/db.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const db = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = db;
```

---

## 5. Auth Foundation

```ts
// src/lib/auth.ts
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import { db } from "./db";

export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await db.user.findUnique({
          where: { email: String(credentials.email) },
          include: { memberProfile: true },
        });

        if (!user || !user.passwordHash) return null;
        const valid = await compare(String(credentials.password), user.passwordHash);
        if (!valid || !user.isActive) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          memberProfileId: user.memberProfile?.id ?? null,
        } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.memberProfileId = (user as any).memberProfileId;
      }
      return token;
    },
    async session({ session, token }) {
      (session.user as any).id = token.sub;
      (session.user as any).role = token.role;
      (session.user as any).memberProfileId = token.memberProfileId;
      return session;
    },
  },
};
```

```ts
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth";

const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };
```

---

## 6. Permission Layer

```ts
// src/lib/permissions.ts
import { UserRole, VerificationLevel, MembershipTierCode } from "@prisma/client";

export function hasBackofficeAccess(role?: UserRole) {
  return [
    UserRole.SUPER_ADMIN,
    UserRole.EXECUTIVE,
    UserRole.LEGAL_COMPLIANCE,
    UserRole.QUALIFICATIONS,
    UserRole.CUSTOMER_SUCCESS,
    UserRole.FINANCE_TREASURY,
  ].includes(role as UserRole);
}

export function canApproveVerification(role?: UserRole) {
  return [UserRole.SUPER_ADMIN, UserRole.EXECUTIVE, UserRole.LEGAL_COMPLIANCE].includes(role as UserRole);
}

export function canAccessOpportunity(params: {
  rule: string;
  verificationLevel?: VerificationLevel;
  tierCode?: MembershipTierCode;
}) {
  const { rule, verificationLevel, tierCode } = params;

  if (rule === "PUBLIC") return true;
  if (rule === "VERIFIED_ONLY") return verificationLevel !== VerificationLevel.UNVERIFIED;
  if (rule === "CERTIFIED_PLUS") return [MembershipTierCode.CERTIFIED, MembershipTierCode.EXECUTIVE, MembershipTierCode.STRATEGIC, MembershipTierCode.FOUNDING, MembershipTierCode.SOVEREIGN].includes(tierCode as MembershipTierCode);
  if (rule === "EXECUTIVE_PLUS") return [MembershipTierCode.EXECUTIVE, MembershipTierCode.STRATEGIC, MembershipTierCode.FOUNDING, MembershipTierCode.SOVEREIGN].includes(tierCode as MembershipTierCode);
  if (rule === "STRATEGIC_PLUS") return [MembershipTierCode.STRATEGIC, MembershipTierCode.FOUNDING, MembershipTierCode.SOVEREIGN].includes(tierCode as MembershipTierCode);

  return false;
}
```

---

## 7. Validation Schemas

```ts
// src/lib/validation.ts
import { z } from "zod";
import { ParticipantClassCode, VerificationLevel } from "@prisma/client";

export const createMemberSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  participantClassCode: z.nativeEnum(ParticipantClassCode),
  displayName: z.string().optional(),
  country: z.string().optional(),
  phone: z.string().optional(),
  businessName: z.string().optional(),
});

export const createVerificationRecordSchema = z.object({
  memberProfileId: z.string().cuid(),
  requestedLevel: z.nativeEnum(VerificationLevel),
  notes: z.string().optional(),
});
```

---

## 8. Audit Helper

```ts
// src/lib/audit.ts
import { db } from "./db";

export async function writeAuditLog(input: {
  actorUserId?: string | null;
  entityType: string;
  entityId: string;
  action: string;
  payloadJson?: unknown;
}) {
  return db.auditLog.create({
    data: {
      actorUserId: input.actorUserId ?? null,
      entityType: input.entityType,
      entityId: input.entityId,
      action: input.action,
      payloadJson: input.payloadJson as any,
    },
  });
}
```

---

## 9. Example Members API

```ts
// src/app/api/members/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { db } from "@/lib/db";
import { createMemberSchema } from "@/lib/validation";
import { hasBackofficeAccess } from "@/lib/permissions";
import { writeAuditLog } from "@/lib/audit";
import { MembershipTierCode, UserRole } from "@prisma/client";

export async function GET() {
  const session = await getServerSession(authConfig);
  if (!hasBackofficeAccess((session?.user as any)?.role as UserRole)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const members = await db.memberProfile.findMany({
    include: {
      user: true,
      participantClass: true,
      tier: true,
      wallet: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ data: members });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authConfig);
  if (!hasBackofficeAccess((session?.user as any)?.role as UserRole)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = createMemberSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const participantClass = await db.participantClass.findUnique({
    where: { code: parsed.data.participantClassCode },
  });

  const defaultTier = await db.membershipTier.findUnique({
    where: { code: MembershipTierCode.MEMBER },
  });

  if (!participantClass || !defaultTier) {
    return NextResponse.json({ error: "Participant class or default tier not configured" }, { status: 500 });
  }

  const user = await db.user.create({
    data: {
      email: parsed.data.email,
      name: parsed.data.name,
      role: UserRole.MEMBER,
      memberProfile: {
        create: {
          participantClassId: participantClass.id,
          tierId: defaultTier.id,
          displayName: parsed.data.displayName,
          country: parsed.data.country,
          phone: parsed.data.phone,
          businessName: parsed.data.businessName,
          referralCode: crypto.randomUUID().slice(0, 8).toUpperCase(),
          wallet: { create: {} },
        },
      },
    },
    include: { memberProfile: true },
  });

  await writeAuditLog({
    actorUserId: (session?.user as any)?.id,
    entityType: "MemberProfile",
    entityId: user.memberProfile!.id,
    action: "CREATE_MEMBER",
    payloadJson: parsed.data,
  });

  return NextResponse.json({ data: user }, { status: 201 });
}
```

---

## 10. Example Verification API

```ts
// src/app/api/verification-records/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { db } from "@/lib/db";
import { createVerificationRecordSchema } from "@/lib/validation";
import { writeAuditLog } from "@/lib/audit";

export async function GET() {
  const records = await db.verificationRecord.findMany({
    include: { memberProfile: { include: { user: true } } },
    orderBy: { submittedAt: "desc" },
  });

  return NextResponse.json({ data: records });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authConfig);
  const body = await req.json();
  const parsed = createVerificationRecordSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const record = await db.verificationRecord.create({
    data: parsed.data,
  });

  await writeAuditLog({
    actorUserId: (session?.user as any)?.id,
    entityType: "VerificationRecord",
    entityId: record.id,
    action: "CREATE_VERIFICATION_REQUEST",
    payloadJson: parsed.data,
  });

  return NextResponse.json({ data: record }, { status: 201 });
}
```

```ts
// src/app/api/verification-records/[id]/approve/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { db } from "@/lib/db";
import { canApproveVerification } from "@/lib/permissions";
import { writeAuditLog } from "@/lib/audit";
import { VerificationStatus } from "@prisma/client";

export async function POST(_: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authConfig);
  const role = (session?.user as any)?.role;
  if (!canApproveVerification(role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const record = await db.verificationRecord.findUnique({ where: { id: params.id } });
  if (!record) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updated = await db.$transaction(async (tx) => {
    const nextRecord = await tx.verificationRecord.update({
      where: { id: params.id },
      data: {
        status: VerificationStatus.APPROVED,
        reviewedByUserId: (session?.user as any)?.id,
        reviewedAt: new Date(),
      },
    });

    await tx.memberProfile.update({
      where: { id: record.memberProfileId },
      data: { verificationLevel: record.requestedLevel },
    });

    return nextRecord;
  });

  await writeAuditLog({
    actorUserId: (session?.user as any)?.id,
    entityType: "VerificationRecord",
    entityId: updated.id,
    action: "APPROVE_VERIFICATION",
    payloadJson: { requestedLevel: updated.requestedLevel },
  });

  return NextResponse.json({ data: updated });
}
```

---

## 11. Example Wallet API

```ts
// src/app/api/wallets/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authConfig);
  const memberProfileId = (session?.user as any)?.memberProfileId;

  if (!memberProfileId) {
    return NextResponse.json({ error: "No member profile linked" }, { status: 400 });
  }

  const wallet = await db.aurexWallet.findFirst({
    where: { memberProfileId },
    include: { transactions: { orderBy: { createdAt: "desc" }, take: 25 } },
  });

  return NextResponse.json({ data: wallet });
}
```

---

## 12. Example Opportunities API

```ts
// src/app/api/opportunities/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { db } from "@/lib/db";
import { canAccessOpportunity } from "@/lib/permissions";

export async function GET() {
  const session = await getServerSession(authConfig);
  const memberProfileId = (session?.user as any)?.memberProfileId;

  const profile = memberProfileId
    ? await db.memberProfile.findUnique({
        where: { id: memberProfileId },
        include: { tier: true },
      })
    : null;

  const all = await db.opportunity.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
  });

  const visible = all.filter((item) =>
    canAccessOpportunity({
      rule: item.accessRule,
      verificationLevel: profile?.verificationLevel,
      tierCode: profile?.tier.code,
    })
  );

  return NextResponse.json({ data: visible });
}
```

---

## 13. Environment Variables

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/aureon9"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="replace-with-long-secret"
```

---

## 14. Initial Migration Commands

```bash
npm install prisma @prisma/client next-auth bcryptjs zod
npx prisma migrate dev --name init_aureon9_foundation
npx prisma db seed
```

---

## 15. Recommended Immediate Next Builds

1. Document upload + storage abstraction
2. Member profile update routes
3. Backoffice review queue UI
4. Rewards issuance service
5. Referral tracking service
6. Opportunity application workflow
7. Partner / operator onboarding workflow
8. Notification center
9. Audit log explorer
10. Role-based middleware guards

---

## 16. Governance Notes

- Division 3 Marketing governs class positioning, campaign logic, and participant acquisition.
- Division 4 Qualifications governs certification-linked advancement and tier progression.
- Division 5 Production / R&D governs platform logic and system implementation.
- Division 6 Customer governs onboarding, support, retention, and service operations.
- Division 7 Legal governs verification, compliance, contracts, and audit enforcement.

This backend foundation is therefore designed to keep AUREON9 aligned with ODIEBOARD governance, qualification, technical implementation, customer lifecycle control, and legal/compliance requirements.
