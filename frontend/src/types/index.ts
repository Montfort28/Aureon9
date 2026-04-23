// User & Auth Types
export type UserRole = 
  | 'SUPER_ADMIN' 
  | 'EXECUTIVE' 
  | 'LEGAL_COMPLIANCE' 
  | 'QUALIFICATIONS' 
  | 'CUSTOMER_SUCCESS' 
  | 'FINANCE_TREASURY' 
  | 'MEMBER' 
  | 'PARTNER' 
  | 'OPERATOR';

export type ParticipantClass = 
  | 'FOUNDING_MEMBER' 
  | 'GENERAL_MEMBER' 
  | 'CUSTOMER' 
  | 'CHANNEL_PARTNER' 
  | 'AFFILIATE' 
  | 'THIRD_PARTY_OPERATOR' 
  | 'STRATEGIC_PARTNER' 
  | 'CAPITAL_PARTICIPANT';

export type MembershipTier = 
  | 'MEMBER' 
  | 'ASSOCIATE' 
  | 'CERTIFIED' 
  | 'EXECUTIVE' 
  | 'STRATEGIC' 
  | 'FOUNDING' 
  | 'SOVEREIGN';

export type VerificationLevel = 
  | 'UNVERIFIED' 
  | 'BASIC_VERIFIED' 
  | 'IDENTITY_VERIFIED' 
  | 'COMMERCIAL_VERIFIED' 
  | 'INSTITUTIONAL_VERIFIED' 
  | 'CAPITAL_VERIFIED' 
  | 'GOVERNANCE_APPROVED';

export type VerificationStatus = 
  | 'PENDING' 
  | 'UNDER_REVIEW' 
  | 'APPROVED' 
  | 'REJECTED' 
  | 'SUSPENDED';

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
}

export interface MemberProfile {
  id: string;
  userId: string;
  participantClass: ParticipantClass;
  tier: MembershipTier;
  verificationLevel: VerificationLevel;
  displayName?: string;
  country?: string;
  businessName?: string;
  referralCode: string;
  aurexBalance: number;
  status: string;
}

// Verification & Review Types
export interface VerificationRecord {
  id: string;
  memberProfileId: string;
  applicant: string;
  email: string;
  participantClass: ParticipantClass;
  requestedLevel: VerificationLevel;
  currentTier: MembershipTier;
  status: VerificationStatus;
  submittedAt: string;
  reviewer: string;
  risk: 'Low' | 'Medium' | 'High';
  notes?: string;
}

export interface MemberDocument {
  id: string;
  memberProfileId: string;
  type: string;
  owner: string;
  verificationUse: string;
  uploadedAt: string;
  status: 'Received' | 'Reviewed' | 'Pending Review' | 'Rejected';
}

// Wallet & Transactions
export type WalletTransactionType = 
  | 'REWARD_CREDIT' 
  | 'COMMISSION_CREDIT' 
  | 'REFERRAL_BONUS' 
  | 'REDEMPTION' 
  | 'WITHDRAWAL' 
  | 'SETTLEMENT' 
  | 'ADJUSTMENT';

export interface AurexWallet {
  id: string;
  memberProfileId: string;
  balance: number;
  currencyCode: string;
  createdAt: Date;
}

export interface WalletTransaction {
  id: string;
  walletId: string;
  type: WalletTransactionType;
  amount: number;
  reference?: string;
  notes?: string;
  createdAt: Date;
}

// Referrals
export interface Referral {
  id: string;
  name: string;
  class: ParticipantClass;
  status: 'Active' | 'Qualified' | 'Under Review' | 'Inactive';
  conversions: number;
  value: string;
}

// Opportunities
export type OpportunityType = 'INVESTMENT' | 'TRADE' | 'PARTNERSHIP' | 'CAREER' | 'MARKETPLACE';
export type OpportunityAccessRule = 
  | 'PUBLIC' 
  | 'VERIFIED_ONLY' 
  | 'CERTIFIED_PLUS' 
  | 'EXECUTIVE_PLUS' 
  | 'STRATEGIC_PLUS' 
  | 'INVITE_ONLY';

export interface Opportunity {
  id: string;
  title: string;
  description?: string;
  type: OpportunityType;
  accessRule: OpportunityAccessRule;
  risk: 'Controlled' | 'Moderate' | 'Low';
  cta: string;
  isPublished: boolean;
  country?: string;
  createdAt: Date;
}

// Notification & Templates
export interface NotificationChannel {
  channel: string;
  enabled: boolean;
  provider: string;
  deliveryRate: string;
  retryWindow: string;
}

export interface NotificationTemplate {
  code: string;
  channel: 'EMAIL' | 'IN_APP' | 'SMS' | 'WHATSAPP';
  active: boolean;
  lastUpdated: string;
  owner: string;
}

export interface EventAnalytics {
  event: string;
  sent: number;
  delivered: number;
  failed: number;
  rate: number;
}

// Admin Metrics
export interface AdminMetric {
  title: string;
  value: string;
  sub: string;
  icon: any;
}

// Role-based Access
export interface RoleAccess {
  role: UserRole;
  scope: string;
  screens: string;
  actions: string;
}
