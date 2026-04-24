/**
 * AUREON9 — Standalone Admin Seed Script
 * Run with:  node seed-admin.js
 *
 * Creates / refreshes the SUPER_ADMIN user so you can log in immediately.
 * Also seeds all membership tiers and participant classes if they are missing.
 */

import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

const ADMIN_EMAIL    = 'admin@aureon9.com';
const ADMIN_PASSWORD = 'Admin@Aureon9!';

async function seedTiers(prisma) {
  const tiers = [
    { code: 'MEMBER',    name: 'Member',    rank: 1, description: 'Entry-level access for customers and users.' },
    { code: 'ASSOCIATE', name: 'Associate', rank: 2, description: 'Upgraded participation with structured access and rewards.' },
    { code: 'CERTIFIED', name: 'Certified', rank: 3, description: 'Qualification-backed operational participation.' },
    { code: 'EXECUTIVE', name: 'Executive', rank: 4, description: 'High-trust contributor status with broader privileges.' },
    { code: 'STRATEGIC', name: 'Strategic', rank: 5, description: 'Institutional-grade access, partner pathways, premium rights.' },
    { code: 'FOUNDING',  name: 'Founding',  rank: 6, description: 'Founding member status with historical privileges.' },
    { code: 'SOVEREIGN', name: 'Sovereign', rank: 7, description: 'Reserved governance-grade status under source authority.' },
  ];

  for (const tier of tiers) {
    await prisma.membershipTier.upsert({
      where:  { code: tier.code },
      update: { name: tier.name, rank: tier.rank, description: tier.description },
      create: { code: tier.code, name: tier.name, rank: tier.rank, description: tier.description },
    });
  }
  console.log('✅ Membership tiers ready');
}

async function seedClasses(prisma) {
  const classes = [
    { code: 'FOUNDING_MEMBER',           name: 'Founding Member' },
    { code: 'GENERAL_MEMBER',            name: 'General Member' },
    { code: 'CUSTOMER',                  name: 'Customer' },
    { code: 'CHANNEL_PARTNER',           name: 'Channel Partner' },
    { code: 'AFFILIATE',                 name: 'Affiliate' },
    { code: 'INTERN',                    name: 'Intern' },
    { code: 'DEVELOPER',                 name: 'Developer' },
    { code: 'EQUITY_AFFILIATE',          name: 'Equity Affiliate' },
    { code: 'EQUITY_PARTNER',            name: 'Equity Partner' },
    { code: 'STRATEGIC_PARTNER',         name: 'Strategic Partner' },
    { code: 'OEM_PARTNER',               name: 'OEM Partner' },
    { code: 'TRADE_OPERATOR',            name: 'Trade Operator' },
    { code: 'CAPITAL_PARTICIPANT',       name: 'Capital Participant' },
    { code: 'VERIFICATION_ACTOR',        name: 'Verification Actor' },
    { code: 'SETTLEMENT_PARTICIPANT',    name: 'Settlement Participant' },
    { code: 'INSTITUTIONAL_PARTICIPANT', name: 'Institutional Participant' },
    { code: 'THIRD_PARTY_OPERATOR',      name: 'Third-Party Operator' },
  ];

  for (const item of classes) {
    await prisma.participantClass.upsert({
      where:  { code: item.code },
      update: { name: item.name },
      create: { code: item.code, name: item.name },
    });
  }
  console.log('✅ Participant classes ready');
}

async function seedAdmin(prisma) {
  const passwordHash  = await hash(ADMIN_PASSWORD, 10);
  const sovereignTier = await prisma.membershipTier.findUnique({ where: { code: 'SOVEREIGN' } });
  const foundingClass = await prisma.participantClass.findUnique({ where: { code: 'FOUNDING_MEMBER' } });

  if (!sovereignTier || !foundingClass) {
    throw new Error('Tiers or classes not seeded yet — run seedTiers/seedClasses first.');
  }

  const existing = await prisma.user.findUnique({
    where:   { email: ADMIN_EMAIL },
    include: { memberProfile: true },
  });

  if (existing) {
    // Always refresh the password so it matches what we print below
    await prisma.user.update({
      where: { email: ADMIN_EMAIL },
      data:  { passwordHash, isActive: true, role: 'SUPER_ADMIN' },
    });

    // If the existing admin has no memberProfile, create one now
    if (!existing.memberProfile) {
      const profile = await prisma.memberProfile.create({
        data: {
          userId:            existing.id,
          displayName:       'Super Admin',
          participantClassId: foundingClass.id,
          tierId:             sovereignTier.id,
          verificationLevel:  'GOVERNANCE_APPROVED',
          referralCode:       'ADMIN-AUREON9',
          status:             'ACTIVE',
        },
      });
      await prisma.aurexWallet.create({
        data: { memberProfileId: profile.id, balance: 0, currencyCode: 'ARX' },
      });
    }

    console.log('✅ Admin password refreshed');
    return;
  }

  // Create brand-new admin
  const admin = await prisma.user.create({
    data: {
      email:        ADMIN_EMAIL,
      name:         'AUREON9 Super Admin',
      passwordHash,
      role:         'SUPER_ADMIN',
      isActive:     true,
      memberProfile: {
        create: {
          displayName:        'Super Admin',
          participantClassId: foundingClass.id,
          tierId:             sovereignTier.id,
          verificationLevel:  'GOVERNANCE_APPROVED',
          referralCode:       'ADMIN-AUREON9',
          status:             'ACTIVE',
        },
      },
    },
    include: { memberProfile: true },
  });

  await prisma.aurexWallet.create({
    data: {
      memberProfileId: admin.memberProfile.id,
      balance:         0,
      currencyCode:    'ARX',
    },
  });

  console.log('✅ Admin user created');
}

async function main() {
  console.log('');
  console.log('🌱  AUREON9 Admin Seed');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  await seedTiers(prisma);
  await seedClasses(prisma);
  await seedAdmin(prisma);

  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  ✅  SEED COMPLETE — USE THESE CREDENTIALS');
  console.log('');
  console.log('  Email    :  admin@aureon9.com');
  console.log('  Password :  Admin@Aureon9!');
  console.log('  Role     :  SUPER_ADMIN');
  console.log('  Tier     :  Sovereign');
  console.log('  Level    :  Governance Approved');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (err) => {
    console.error('❌ Seed failed:', err.message);
    await prisma.$disconnect();
    process.exit(1);
  });
