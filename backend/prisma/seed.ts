import { PrismaClient, MembershipTierCode, ParticipantClassCode } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Seed Membership Tiers
  const tiers = [
    { code: MembershipTierCode.MEMBER, name: "Member", rank: 1, description: "Entry-level access for customers and users." },
    { code: MembershipTierCode.ASSOCIATE, name: "Associate", rank: 2, description: "Upgraded participation with structured access and rewards." },
    { code: MembershipTierCode.CERTIFIED, name: "Certified", rank: 3, description: "Qualification-backed operational participation." },
    { code: MembershipTierCode.EXECUTIVE, name: "Executive", rank: 4, description: "High-trust contributor status with broader privileges." },
    { code: MembershipTierCode.STRATEGIC, name: "Strategic", rank: 5, description: "Institutional-grade access, partner pathways, premium rights." },
    { code: MembershipTierCode.FOUNDING, name: "Founding", rank: 6, description: "Founding member status with historical privileges." },
    { code: MembershipTierCode.SOVEREIGN, name: "Sovereign", rank: 7, description: "Reserved governance-grade status under source authority." },
  ];

  for (const tier of tiers) {
    await prisma.membershipTier.upsert({
      where: { code: tier.code },
      update: { name: tier.name, rank: tier.rank, description: tier.description },
      create: { code: tier.code, name: tier.name, rank: tier.rank, description: tier.description },
    });
  }

  console.log("✅ Membership tiers seeded");

  // Seed Participant Classes
  const classes = [
    { code: ParticipantClassCode.FOUNDING_MEMBER, name: "Founding Member", description: "Founding members of AUREON9" },
    { code: ParticipantClassCode.GENERAL_MEMBER, name: "General Member", description: "General membership category" },
    { code: ParticipantClassCode.CUSTOMER, name: "Customer", description: "Customer participant class" },
    { code: ParticipantClassCode.CHANNEL_PARTNER, name: "Channel Partner", description: "Channel distribution partners" },
    { code: ParticipantClassCode.AFFILIATE, name: "Affiliate", description: "Affiliate program participants" },
    { code: ParticipantClassCode.INTERN, name: "Intern", description: "Intern program participants" },
    { code: ParticipantClassCode.DEVELOPER, name: "Developer", description: "Developer ecosystem participants" },
    { code: ParticipantClassCode.EQUITY_AFFILIATE, name: "Equity Affiliate", description: "Equity-participating affiliates" },
    { code: ParticipantClassCode.EQUITY_PARTNER, name: "Equity Partner", description: "Equity-holding partners" },
    { code: ParticipantClassCode.STRATEGIC_PARTNER, name: "Strategic Partner", description: "Strategic partnership tier" },
    { code: ParticipantClassCode.OEM_PARTNER, name: "OEM Partner", description: "Original Equipment Manufacturer partners" },
    { code: ParticipantClassCode.TRADE_OPERATOR, name: "Trade Operator", description: "Trade operation participants" },
    { code: ParticipantClassCode.CAPITAL_PARTICIPANT, name: "Capital Participant", description: "Capital participation program" },
    { code: ParticipantClassCode.VERIFICATION_ACTOR, name: "Verification Actor", description: "Verification process participants" },
    { code: ParticipantClassCode.SETTLEMENT_PARTICIPANT, name: "Settlement Participant", description: "Settlement system participants" },
    { code: ParticipantClassCode.INSTITUTIONAL_PARTICIPANT, name: "Institutional Participant", description: "Institutional-grade participants" },
    { code: ParticipantClassCode.THIRD_PARTY_OPERATOR, name: "Third-Party Operator", description: "Third-party operations" },
  ];

  for (const item of classes) {
    await prisma.participantClass.upsert({
      where: { code: item.code },
      update: { name: item.name, description: item.description },
      create: { code: item.code, name: item.name, description: item.description },
    });
  }

  console.log("✅ Participant classes seeded");

  // Create demo admin user
  try {
    await prisma.user.upsert({
      where: { email: "admin@aureon9.com" },
      update: {},
      create: {
        email: "admin@aureon9.com",
        name: "Admin User",
        role: "SUPER_ADMIN",
        isActive: true,
      },
    });
    console.log("✅ Demo admin user created");
  } catch (error) {
    console.log("⚠️  Admin user already exists");
  }

  console.log("🎉 Database seed completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error during seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
