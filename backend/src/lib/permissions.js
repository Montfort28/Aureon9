// Permission checks for role-based access control

export function hasBackofficeAccess(role) {
  const backofficeRoles = [
    'SUPER_ADMIN',
    'EXECUTIVE',
    'LEGAL_COMPLIANCE',
    'QUALIFICATIONS',
    'CUSTOMER_SUCCESS',
    'FINANCE_TREASURY',
  ];
  return backofficeRoles.includes(role);
}

export function canApproveVerification(role) {
  const approvalRoles = ['SUPER_ADMIN', 'EXECUTIVE', 'LEGAL_COMPLIANCE'];
  return approvalRoles.includes(role);
}

export function canAccessOpportunity(params) {
  const { rule, verificationLevel, tierCode } = params;

  if (rule === 'PUBLIC') return true;
  if (rule === 'VERIFIED_ONLY') return verificationLevel !== 'UNVERIFIED';
  if (rule === 'CERTIFIED_PLUS') {
    const certifiedPlusTiers = ['CERTIFIED', 'EXECUTIVE', 'STRATEGIC', 'FOUNDING', 'SOVEREIGN'];
    return certifiedPlusTiers.includes(tierCode);
  }
  if (rule === 'EXECUTIVE_PLUS') {
    const executivePlusTiers = ['EXECUTIVE', 'STRATEGIC', 'FOUNDING', 'SOVEREIGN'];
    return executivePlusTiers.includes(tierCode);
  }
  if (rule === 'STRATEGIC_PLUS') {
    const strategicPlusTiers = ['STRATEGIC', 'FOUNDING', 'SOVEREIGN'];
    return strategicPlusTiers.includes(tierCode);
  }

  return false;
}

export function getTierRank(tierCode) {
  const tierRanks = {
    MEMBER: 1,
    ASSOCIATE: 2,
    CERTIFIED: 3,
    EXECUTIVE: 4,
    STRATEGIC: 5,
    FOUNDING: 6,
    SOVEREIGN: 7,
  };
  return tierRanks[tierCode] || 0;
}
