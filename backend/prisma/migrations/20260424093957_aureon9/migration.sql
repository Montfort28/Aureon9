-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'EXECUTIVE', 'LEGAL_COMPLIANCE', 'QUALIFICATIONS', 'CUSTOMER_SUCCESS', 'FINANCE_TREASURY', 'MEMBER', 'PARTNER', 'OPERATOR');

-- CreateEnum
CREATE TYPE "ParticipantClassCode" AS ENUM ('FOUNDING_MEMBER', 'GENERAL_MEMBER', 'CUSTOMER', 'CHANNEL_PARTNER', 'AFFILIATE', 'INTERN', 'DEVELOPER', 'EQUITY_AFFILIATE', 'EQUITY_PARTNER', 'STRATEGIC_PARTNER', 'OEM_PARTNER', 'TRADE_OPERATOR', 'CAPITAL_PARTICIPANT', 'VERIFICATION_ACTOR', 'SETTLEMENT_PARTICIPANT', 'INSTITUTIONAL_PARTICIPANT', 'THIRD_PARTY_OPERATOR');

-- CreateEnum
CREATE TYPE "MembershipTierCode" AS ENUM ('MEMBER', 'ASSOCIATE', 'CERTIFIED', 'EXECUTIVE', 'STRATEGIC', 'FOUNDING', 'SOVEREIGN');

-- CreateEnum
CREATE TYPE "VerificationLevel" AS ENUM ('UNVERIFIED', 'BASIC_VERIFIED', 'IDENTITY_VERIFIED', 'COMMERCIAL_VERIFIED', 'INSTITUTIONAL_VERIFIED', 'CAPITAL_VERIFIED', 'GOVERNANCE_APPROVED');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "ReviewQueueStatus" AS ENUM ('PENDING', 'UNDER_REVIEW', 'REQUESTED_MORE_DOCUMENTS', 'ESCALATED', 'APPROVED', 'REJECTED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "ReviewActionType" AS ENUM ('CREATE_CASE', 'ASSIGN_REVIEWER', 'MOVE_TO_UNDER_REVIEW', 'REQUEST_MORE_DOCUMENTS', 'ESCALATE', 'APPROVE', 'REJECT', 'SUSPEND', 'ADD_NOTE');

-- CreateEnum
CREATE TYPE "DocumentReviewStatus" AS ENUM ('RECEIVED', 'UNDER_REVIEW', 'ACCEPTED', 'REJECTED', 'REPLACEMENT_REQUIRED');

-- CreateEnum
CREATE TYPE "WalletTransactionType" AS ENUM ('REWARD_CREDIT', 'COMMISSION_CREDIT', 'REFERRAL_BONUS', 'REDEMPTION', 'WITHDRAWAL', 'SETTLEMENT', 'ADJUSTMENT');

-- CreateEnum
CREATE TYPE "OpportunityType" AS ENUM ('INVESTMENT', 'TRADE', 'TOURISM', 'PARTNERSHIP', 'CAREER', 'MARKETPLACE');

-- CreateEnum
CREATE TYPE "OpportunityAccessRule" AS ENUM ('PUBLIC', 'VERIFIED_ONLY', 'CERTIFIED_PLUS', 'EXECUTIVE_PLUS', 'STRATEGIC_PLUS', 'INVITE_ONLY');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'MEMBER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participant_classes" (
    "id" TEXT NOT NULL,
    "code" "ParticipantClassCode" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "participant_classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membership_tiers" (
    "id" TEXT NOT NULL,
    "code" "MembershipTierCode" NOT NULL,
    "name" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "membership_tiers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "member_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "participantClassId" TEXT NOT NULL,
    "tierId" TEXT NOT NULL,
    "verificationLevel" "VerificationLevel" NOT NULL DEFAULT 'UNVERIFIED',
    "displayName" TEXT,
    "country" TEXT,
    "phone" TEXT,
    "businessName" TEXT,
    "referralCode" TEXT NOT NULL,
    "referredByProfileId" TEXT,
    "aurexWalletId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "member_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_records" (
    "id" TEXT NOT NULL,
    "memberProfileId" TEXT NOT NULL,
    "requestedLevel" "VerificationLevel" NOT NULL,
    "status" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "queueStatus" "ReviewQueueStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "reviewedByUserId" TEXT,
    "assignedReviewerId" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedAt" TIMESTAMP(3),

    CONSTRAINT "verification_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "member_documents" (
    "id" TEXT NOT NULL,
    "memberProfileId" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "verificationPurpose" TEXT,
    "fileUrl" TEXT NOT NULL,
    "storageKey" TEXT,
    "fileName" TEXT NOT NULL,
    "mimeType" TEXT,
    "sizeBytes" INTEGER,
    "reviewStatus" "DocumentReviewStatus" NOT NULL DEFAULT 'RECEIVED',
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "member_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review_actions" (
    "id" TEXT NOT NULL,
    "verificationRecordId" TEXT NOT NULL,
    "actionType" "ReviewActionType" NOT NULL,
    "actorUserId" TEXT,
    "notes" TEXT,
    "payloadJson" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aurex_wallets" (
    "id" TEXT NOT NULL,
    "memberProfileId" TEXT NOT NULL,
    "balance" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "currencyCode" TEXT NOT NULL DEFAULT 'ARX',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "aurex_wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wallet_transactions" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "type" "WalletTransactionType" NOT NULL,
    "amount" DECIMAL(18,4) NOT NULL,
    "reference" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wallet_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referrals" (
    "id" TEXT NOT NULL,
    "senderProfileId" TEXT NOT NULL,
    "receiverProfileId" TEXT,
    "receiverEmail" TEXT,
    "campaignCode" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "referrals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "opportunities" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "OpportunityType" NOT NULL,
    "accessRule" "OpportunityAccessRule" NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "opportunities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "actorUserId" TEXT,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "payloadJson" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "participant_classes_code_key" ON "participant_classes"("code");

-- CreateIndex
CREATE UNIQUE INDEX "membership_tiers_code_key" ON "membership_tiers"("code");

-- CreateIndex
CREATE UNIQUE INDEX "member_profiles_userId_key" ON "member_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "member_profiles_referralCode_key" ON "member_profiles"("referralCode");

-- CreateIndex
CREATE UNIQUE INDEX "aurex_wallets_memberProfileId_key" ON "aurex_wallets"("memberProfileId");

-- AddForeignKey
ALTER TABLE "member_profiles" ADD CONSTRAINT "member_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member_profiles" ADD CONSTRAINT "member_profiles_participantClassId_fkey" FOREIGN KEY ("participantClassId") REFERENCES "participant_classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member_profiles" ADD CONSTRAINT "member_profiles_tierId_fkey" FOREIGN KEY ("tierId") REFERENCES "membership_tiers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verification_records" ADD CONSTRAINT "verification_records_memberProfileId_fkey" FOREIGN KEY ("memberProfileId") REFERENCES "member_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member_documents" ADD CONSTRAINT "member_documents_memberProfileId_fkey" FOREIGN KEY ("memberProfileId") REFERENCES "member_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_actions" ADD CONSTRAINT "review_actions_verificationRecordId_fkey" FOREIGN KEY ("verificationRecordId") REFERENCES "verification_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aurex_wallets" ADD CONSTRAINT "aurex_wallets_memberProfileId_fkey" FOREIGN KEY ("memberProfileId") REFERENCES "member_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallet_transactions" ADD CONSTRAINT "wallet_transactions_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "aurex_wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_senderProfileId_fkey" FOREIGN KEY ("senderProfileId") REFERENCES "member_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_receiverProfileId_fkey" FOREIGN KEY ("receiverProfileId") REFERENCES "member_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
