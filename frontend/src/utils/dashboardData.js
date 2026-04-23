import {
  Crown,
  FileCheck2,
  Upload,
  ShieldCheck,
  Users,
  Settings,
  BellRing,
  Mail,
  Clock3,
  BarChart3,
  Wallet,
  Briefcase,
  Award,
  FileCheck,
  LayoutGrid,
  BadgeDollarSign,
} from 'lucide-react';

// Mock data for Member Dashboard
export const memberDashboardStats = [
  { label: 'AUREX Balance', value: 'ARX 18,420', sub: '+12.4% this month', icon: Wallet },
  { label: 'Tier Status', value: 'Founding Executive', sub: '92% to Strategic', icon: Crown },
  { label: 'Referral Earnings', value: '$4,860', sub: '37 active referrals', icon: BadgeDollarSign },
  { label: 'Verification', value: 'Commercial Verified', sub: '1 item pending', icon: ShieldCheck },
];

export const memberDashboardNav = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { id: 'verification', label: 'Verification', icon: ShieldCheck },
  { id: 'membership', label: 'Membership', icon: Crown },
  { id: 'wallet', label: 'AUREX Wallet', icon: Wallet },
  { id: 'referrals', label: 'AAL Referrals', icon: Users },
  { id: 'opportunities', label: 'Opportunities', icon: Briefcase },
  { id: 'documents', label: 'Documents', icon: FileCheck },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const memberVerificationRecords = [
  { item: 'Identity Verification', status: 'Approved', owner: 'Legal & Compliance', date: '2026-04-08' },
  { item: 'Business Registration', status: 'Approved', owner: 'Legal & Compliance', date: '2026-04-09' },
  { item: 'Commercial Profile', status: 'Approved', owner: 'Customer Division', date: '2026-04-10' },
  { item: 'Capital Participation Review', status: 'Pending', owner: 'Executive Review', date: 'Awaiting' },
];

export const memberOpportunities = [
  {
    title: 'Strategic Partner Expansion – East Africa',
    type: 'Strategic Partner',
    risk: 'Controlled',
    cta: 'Review Opportunity',
  },
  {
    title: 'ODIEXA Merchant Onboarding – Premium Operators',
    type: 'Third-Party Operator',
    risk: 'Moderate',
    cta: 'Open Marketplace Brief',
  },
  {
    title: 'Founding Member Upgrade Pathway',
    type: 'Membership',
    risk: 'Low',
    cta: 'View Upgrade Criteria',
  },
];

export const memberReferralData = [
  { name: 'CP-KE-001', class: 'Channel Partner', status: 'Active', conversions: 12, value: '$1,240' },
  { name: 'EA-RW-014', class: 'Equity Affiliate', status: 'Qualified', conversions: 3, value: '$2,180' },
  { name: 'SP-GH-003', class: 'Strategic Partner', status: 'Under Review', conversions: 1, value: '$950' },
];

export const membershipTiers = [
  { name: 'Member', desc: 'Entry-level access for customers and users.', active: false },
  { name: 'Associate', desc: 'Upgraded participation with structured access and rewards.', active: false },
  { name: 'Certified', desc: 'Qualification-backed operational participation.', active: false },
  { name: 'Executive', desc: 'High-trust contributor status with broader privileges.', active: true },
  { name: 'Strategic', desc: 'Institutional-grade access, partner pathways, premium rights.', active: false },
  { name: 'Sovereign', desc: 'Reserved governance-grade status under source authority.', active: false },
];

// Mock data for Admin Review Module
export const adminReviewNav = [
  { id: 'queue', label: 'Review Queue', icon: FileCheck2 },
  { id: 'uploads', label: 'Document Uploads', icon: Upload },
  { id: 'roles', label: 'Role-Based Access', icon: ShieldCheck },
  { id: 'members', label: 'Members', icon: Users },
  { id: 'settings', label: 'Governance Settings', icon: Settings },
];

export const adminQueueItems = [
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
    applicant: 'Capital Syndicate Participant – Ghana',
    email: 'syndicate.gh@sample.org',
    participantClass: 'Capital Participant',
    requestedLevel: 'Governance Approved',
    currentTier: 'Strategic',
    status: 'Escalated',
    submittedAt: '2026-04-20 11:12',
    reviewer: 'Executive Review',
    risk: 'High',
  },
];

export const adminDocumentRows = [
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
  {
    id: 'DOC-2203',
    type: 'Capital Source Letter',
    owner: 'Capital Syndicate Participant – Ghana',
    verificationUse: 'Capital Review',
    uploadedAt: '2026-04-20 11:05',
    status: 'Pending Review',
  },
];

export const adminRoles = [
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
  {
    role: 'QUALIFICATIONS',
    scope: 'Tier and certification review',
    screens: 'Queue, Members',
    actions: 'Recommend tier movement, validate certification status',
  },
  {
    role: 'CUSTOMER_SUCCESS',
    scope: 'Onboarding and support visibility',
    screens: 'Uploads, Members',
    actions: 'Track missing items, coordinate applicants',
  },
];

// Mock data for Admin Settings Dashboard
export const adminSettingsNav = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid },
  { id: 'channels', label: 'Channel Rules', icon: BellRing },
  { id: 'templates', label: 'Templates', icon: Mail },
  { id: 'sla', label: 'SLA & Escalation', icon: Clock3 },
  { id: 'analytics', label: 'Delivery Analytics', icon: BarChart3 },
  { id: 'audit', label: 'Audit & Controls', icon: ShieldCheck },
];

export const adminSettingsMetrics = [
  { label: 'Total Notifications', value: '48,294', sub: 'Last 30 days', icon: BellRing },
  { label: 'Delivery Rate', value: '97.8%', sub: 'Email + in-app combined', icon: ShieldCheck },
  { label: 'Failed Deliveries', value: '326', sub: '0.7% requiring retry', icon: Users },
  { label: 'Escalated Cases', value: '42', sub: 'Queue governance alerts', icon: Award },
];

export const adminChannelRows = [
  { channel: 'Email', enabled: true, provider: 'Resend / SES', deliveryRate: '98.6%', retryWindow: '30 mins' },
  { channel: 'In-App', enabled: true, provider: 'Native feed', deliveryRate: '99.9%', retryWindow: 'Instant' },
  { channel: 'WhatsApp', enabled: false, provider: 'Reserved', deliveryRate: '—', retryWindow: 'Disabled' },
  { channel: 'SMS', enabled: false, provider: 'Reserved', deliveryRate: '—', retryWindow: 'Disabled' },
];

export const adminTemplateRows = [
  { code: 'DOCUMENT_UPLOAD_RECEIVED', channel: 'EMAIL', active: true, lastUpdated: '2026-04-20', owner: 'Legal Compliance' },
  { code: 'DOCUMENT_REQUESTED_MORE', channel: 'EMAIL', active: true, lastUpdated: '2026-04-20', owner: 'Legal Compliance' },
  { code: 'REVIEW_APPROVED', channel: 'IN_APP', active: true, lastUpdated: '2026-04-21', owner: 'Customer Success' },
  { code: 'REVIEW_ESCALATED', channel: 'EMAIL', active: true, lastUpdated: '2026-04-21', owner: 'Executive Governance' },
  { code: 'REVIEWER_REMINDER_DUE', channel: 'IN_APP', active: true, lastUpdated: '2026-04-21', owner: 'Operations Control' },
];

export const adminEventAnalytics = [
  { event: 'DOCUMENT_UPLOAD_RECEIVED', sent: 12840, delivered: 12711, failed: 129, rate: 99 },
  { event: 'DOCUMENT_REQUESTED_MORE', sent: 2318, delivered: 2256, failed: 62, rate: 97 },
  { event: 'REVIEW_APPROVED', sent: 7926, delivered: 7881, failed: 45, rate: 99 },
  { event: 'REVIEW_REJECTED', sent: 466, delivered: 454, failed: 12, rate: 97 },
  { event: 'REVIEWER_REMINDER_DUE', sent: 1774, delivered: 1731, failed: 43, rate: 98 },
];

export const adminQueueAgingRows = [
  { band: '0–24 Hours', count: 186, status: 'Healthy' },
  { band: '24–48 Hours', count: 41, status: 'Watch' },
  { band: '48–72 Hours', count: 12, status: 'Escalate' },
  { band: '>72 Hours', count: 4, status: 'Critical' },
];
