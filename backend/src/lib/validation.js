// Validation utilities for API requests

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password) {
  return typeof password === 'string' && password.length >= 8;
}

export function validateParticipantClass(code) {
  const validClasses = [
    'FOUNDING_MEMBER',
    'GENERAL_MEMBER',
    'CUSTOMER',
    'CHANNEL_PARTNER',
    'AFFILIATE',
    'INTERN',
    'DEVELOPER',
    'EQUITY_AFFILIATE',
    'EQUITY_PARTNER',
    'STRATEGIC_PARTNER',
    'OEM_PARTNER',
    'TRADE_OPERATOR',
    'CAPITAL_PARTICIPANT',
    'VERIFICATION_ACTOR',
    'SETTLEMENT_PARTICIPANT',
    'INSTITUTIONAL_PARTICIPANT',
    'THIRD_PARTY_OPERATOR',
  ];
  return validClasses.includes(code);
}

export function validateVerificationLevel(level) {
  const validLevels = [
    'UNVERIFIED',
    'BASIC_VERIFIED',
    'IDENTITY_VERIFIED',
    'COMMERCIAL_VERIFIED',
    'INSTITUTIONAL_VERIFIED',
    'CAPITAL_VERIFIED',
    'GOVERNANCE_APPROVED',
  ];
  return validLevels.includes(level);
}

export function validateVerificationStatus(status) {
  const validStatuses = ['PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'SUSPENDED'];
  return validStatuses.includes(status);
}

export function validateReviewQueueStatus(status) {
  const validStatuses = [
    'PENDING',
    'UNDER_REVIEW',
    'REQUESTED_MORE_DOCUMENTS',
    'ESCALATED',
    'APPROVED',
    'REJECTED',
    'SUSPENDED',
  ];
  return validStatuses.includes(status);
}

export function validateDocumentReviewStatus(status) {
  const validStatuses = ['RECEIVED', 'UNDER_REVIEW', 'ACCEPTED', 'REJECTED', 'REPLACEMENT_REQUIRED'];
  return validStatuses.includes(status);
}

export function validateOpportunityType(type) {
  const validTypes = ['INVESTMENT', 'TRADE', 'TOURISM', 'PARTNERSHIP', 'CAREER', 'MARKETPLACE'];
  return validTypes.includes(type);
}

export function validateAccessRule(rule) {
  const validRules = [
    'PUBLIC',
    'VERIFIED_ONLY',
    'CERTIFIED_PLUS',
    'EXECUTIVE_PLUS',
    'STRATEGIC_PLUS',
    'INVITE_ONLY',
  ];
  return validRules.includes(rule);
}
