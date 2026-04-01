import type { Account, Transaction, Property, Opportunity, SpendingCategory, UserProfile, Vehicle, InsurancePolicy, Document, Trust, Contact, BusinessSnapshot } from '../types';

export const mockUser: UserProfile = {
  name: 'Mason McMillan',
  email: 'mason@athena.finance',
  avatar: 'M',
  notifications: {
    weeklyDigest: true,
    billReminders: true,
    opportunityAlerts: true,
    accountAlerts: false,
  },
};

export const mockAccounts: Account[] = [
  { id: 'a1', name: 'Platinum Checking', type: 'checking', institution: 'Chase', balance: 12847.33, lastSynced: '2026-03-25T10:30:00Z', mask: '4829' },
  { id: 'a2', name: 'High-Yield Savings', type: 'savings', institution: 'Chase', balance: 45230.18, lastSynced: '2026-03-25T10:30:00Z', mask: '7712' },
  { id: 'a3', name: 'Sapphire Reserve', type: 'credit', institution: 'Chase', balance: -2341.55, lastSynced: '2026-03-25T10:30:00Z', mask: '9021' },
  { id: 'a4', name: 'Performance Checking', type: 'checking', institution: 'Wells Fargo', balance: 8923.41, lastSynced: '2026-03-25T09:15:00Z', mask: '3301' },
  { id: 'a5', name: 'Individual Brokerage', type: 'investment', institution: 'Fidelity', balance: 127450.88, lastSynced: '2026-03-25T06:00:00Z', mask: '5567' },
  { id: 'a6', name: 'Roth IRA', type: 'investment', institution: 'Fidelity', balance: 48320.12, lastSynced: '2026-03-25T06:00:00Z', mask: '8834' },
  { id: 'a7', name: 'Primary Mortgage', type: 'mortgage', institution: 'US Bank', balance: -284500.00, lastSynced: '2026-03-24T12:00:00Z', mask: '1190' },
  { id: 'a8', name: 'Rental Property Loan', type: 'loan', institution: 'US Bank', balance: -192300.00, lastSynced: '2026-03-24T12:00:00Z', mask: '6642' },
];

export const mockTransactions: Transaction[] = [
  { id: 't1', date: '2026-03-25', merchant: 'Whole Foods Market', amount: -87.42, category: 'Groceries', accountId: 'a1', pending: true },
  { id: 't2', date: '2026-03-25', merchant: 'Shell Gas Station', amount: -52.10, category: 'Auto & Transport', accountId: 'a3', pending: false },
  { id: 't3', date: '2026-03-24', merchant: 'Netflix', amount: -15.99, category: 'Entertainment', accountId: 'a3', pending: false },
  { id: 't4', date: '2026-03-24', merchant: 'Employer Direct Deposit', amount: 4250.00, category: 'Income', accountId: 'a1', pending: false },
  { id: 't5', date: '2026-03-23', merchant: 'Home Depot', amount: -234.87, category: 'Home', accountId: 'a3', propertyId: 'p1', pending: false },
  { id: 't6', date: '2026-03-23', merchant: 'State Farm Insurance', amount: -189.00, category: 'Insurance', accountId: 'a1', propertyId: 'p1', pending: false },
  { id: 't7', date: '2026-03-22', merchant: 'Comcast Internet', amount: -79.99, category: 'Utilities', accountId: 'a1', propertyId: 'p1', pending: false },
  { id: 't8', date: '2026-03-22', merchant: 'Rocky Mtn Power', amount: -142.30, category: 'Utilities', accountId: 'a4', propertyId: 'p2', pending: false },
  { id: 't9', date: '2026-03-21', merchant: 'Target', amount: -63.21, category: 'Shopping', accountId: 'a3', pending: false },
  { id: 't10', date: '2026-03-21', merchant: 'Starbucks', amount: -6.45, category: 'Food & Drink', accountId: 'a3', pending: false },
  { id: 't11', date: '2026-03-20', merchant: 'Rental Income - Unit A', amount: 1850.00, category: 'Income', accountId: 'a4', propertyId: 'p2', pending: false },
  { id: 't12', date: '2026-03-20', merchant: 'Dominion Energy', amount: -98.50, category: 'Utilities', accountId: 'a1', propertyId: 'p1', pending: false },
  { id: 't13', date: '2026-03-19', merchant: 'Costco Wholesale', amount: -215.33, category: 'Groceries', accountId: 'a1', pending: false },
  { id: 't14', date: '2026-03-19', merchant: 'Planet Fitness', amount: -24.99, category: 'Health & Fitness', accountId: 'a3', pending: false },
  { id: 't15', date: '2026-03-18', merchant: 'Apple One Subscription', amount: -34.95, category: 'Subscriptions', accountId: 'a3', pending: false },
  { id: 't16', date: '2026-03-18', merchant: 'Property Tax Payment', amount: -425.00, category: 'Taxes', accountId: 'a1', propertyId: 'p1', pending: false },
  { id: 't17', date: '2026-03-17', merchant: 'Amazon.com', amount: -47.89, category: 'Shopping', accountId: 'a3', pending: false },
  { id: 't18', date: '2026-03-17', merchant: 'US Bank Mortgage', amount: -1842.00, category: 'Housing', accountId: 'a1', propertyId: 'p1', pending: false },
  { id: 't19', date: '2026-03-16', merchant: 'Uber Eats', amount: -32.50, category: 'Food & Drink', accountId: 'a3', pending: false },
  { id: 't20', date: '2026-03-15', merchant: 'Verizon Wireless', amount: -85.00, category: 'Utilities', accountId: 'a1', pending: false },
  { id: 't21', date: '2026-03-15', merchant: 'Property Mgmt Fee', amount: -150.00, category: 'Housing', accountId: 'a4', propertyId: 'p2', pending: false },
  { id: 't22', date: '2026-03-14', merchant: 'Chipotle', amount: -12.85, category: 'Food & Drink', accountId: 'a3', pending: false },
  { id: 't23', date: '2026-03-10', merchant: 'Employer Direct Deposit', amount: 4250.00, category: 'Income', accountId: 'a1', pending: false },
  { id: 't24', date: '2026-03-08', merchant: 'Lowe\'s', amount: -178.50, category: 'Home', accountId: 'a3', propertyId: 'p2', pending: false },
  { id: 't25', date: '2026-03-05', merchant: 'Water Utility', amount: -67.30, category: 'Utilities', accountId: 'a4', propertyId: 'p2', pending: false },
];

export const mockProperties: Property[] = [
  { id: 'p1', address: '1847 Maple Ridge Dr, Salt Lake City, UT 84103', nickname: 'Primary Home', currentValue: 485000, type: 'primary', monthlyBillsTotal: 2876.29 },
  { id: 'p2', address: '324 Elm Street, Unit A, Provo, UT 84601', nickname: 'Provo Rental', currentValue: 325000, type: 'rental', monthlyBillsTotal: 1438.10 },
  { id: 'p3', address: '5500 Commerce Blvd, Ste 210, Sandy, UT 84070', nickname: 'Sandy Office', currentValue: 620000, type: 'commercial', monthlyBillsTotal: 3250.00 },
];

export const mockOpportunities: Opportunity[] = [
  { id: 'o1', title: 'Bundle Home & Auto Insurance', description: 'You\'re paying $189/mo for home insurance and $142/mo for auto separately. Bundling with GEICO could save ~$78/month based on your profile.', estimatedSavings: 936, source: 'Insurance Analysis', type: 'insurance', status: 'active' },
  { id: 'o2', title: 'Refinance Rental Property', description: 'Current rate on your Provo rental loan is 6.8%. Today\'s rates are around 5.9%. Refinancing could lower your payment by $165/mo.', estimatedSavings: 1980, source: 'Mortgage Analysis', type: 'bills', status: 'active' },
  { id: 'o3', title: 'Claim Home Office Deduction', description: 'Based on your property usage, you may qualify for a home office deduction of ~$1,500 on your next tax return.', estimatedSavings: 1500, source: 'Tax Analysis', type: 'tax', status: 'active' },
  { id: 'o4', title: 'Switch Internet Provider', description: 'You\'re paying $79.99/mo for Comcast. Google Fiber is available at your address for $50/mo with faster speeds.', estimatedSavings: 360, source: 'Bill Analysis', type: 'bills', status: 'active' },
  { id: 'o5', title: 'Cancel Unused Subscriptions', description: 'We detected 2 subscriptions with no activity in 90+ days: Apple One ($34.95) and Planet Fitness ($24.99). Consider cancelling.', estimatedSavings: 719, source: 'Subscription Audit', type: 'budget', status: 'active' },
  { id: 'o6', title: 'Increase 401(k) Contributions', description: 'You\'re contributing 6% but your employer matches up to 8%. Increasing could earn you an extra $2,400/year in free money.', estimatedSavings: 2400, source: 'Retirement Analysis', type: 'budget', status: 'active' },
];

export const mockSpendingByCategory: SpendingCategory[] = [
  { name: 'Housing', amount: 1992.00, color: '#14532d' },
  { name: 'Groceries', amount: 302.75, color: '#166534' },
  { name: 'Utilities', amount: 472.09, color: '#15803d' },
  { name: 'Food & Drink', amount: 51.80, color: '#22c55e' },
  { name: 'Shopping', amount: 111.10, color: '#4ade80' },
  { name: 'Insurance', amount: 189.00, color: '#86efac' },
  { name: 'Auto & Transport', amount: 52.10, color: '#bbf7d0' },
  { name: 'Entertainment', amount: 15.99, color: '#57534e' },
  { name: 'Subscriptions', amount: 34.95, color: '#78716c' },
  { name: 'Health & Fitness', amount: 24.99, color: '#a8a29e' },
  { name: 'Home', amount: 413.37, color: '#0f291e' },
  { name: 'Taxes', amount: 425.00, color: '#44403c' },
];

export const mockMonthlyIncome = 10350.00;
export const mockMonthlyExpenses = 4085.15;
export const mockSavingsRate = 60.5;

export const getNetWorth = (): number => {
  return mockAccounts.reduce((sum, acc) => sum + acc.balance, 0);
};

export const getAccountsByInstitution = (): Record<string, Account[]> => {
  return mockAccounts.reduce((groups, account) => {
    const key = account.institution;
    if (!groups[key]) groups[key] = [];
    groups[key].push(account);
    return groups;
  }, {} as Record<string, Account[]>);
};

export const getTransactionsForProperty = (propertyId: string): Transaction[] => {
  return mockTransactions.filter(t => t.propertyId === propertyId);
};

export const getTransactionsForAccount = (accountId: string): Transaction[] => {
  return mockTransactions.filter(t => t.accountId === accountId);
};

// ============ VEHICLES ============
export const mockVehicles: Vehicle[] = [
  { id: 'v1', year: 2021, make: 'Toyota', model: 'Tacoma', vin: '5TFCZ5AN1MX123456', licensePlate: 'A12 BCD', state: 'UT', currentValue: 38500, loanBalance: 22000, loanPayment: 485 },
  { id: 'v2', year: 2019, make: 'Honda', model: 'CR-V', licensePlate: 'X98 YZA', state: 'UT', currentValue: 24000 },
];

// ============ INSURANCE ============
export const mockInsurancePolicies: InsurancePolicy[] = [
  { id: 'ins1', type: 'auto', carrier: 'State Farm', policyNumber: 'SF-12345', coverageLimit: 100000, deductible: 500, premiumAmount: 1890, premiumFrequency: 'annual', effectiveDate: '2025-04-01', expirationDate: '2026-04-01', namedInsured: 'Mason Heidebrecht', vehicleId: 'v1', agentName: 'John Smith', agentPhone: '801-555-1234', status: 'active' },
  { id: 'ins2', type: 'home', carrier: 'Allstate', policyNumber: 'AL-67890', coverageLimit: 500000, deductible: 1000, premiumAmount: 2400, premiumFrequency: 'annual', effectiveDate: '2025-06-15', expirationDate: '2026-06-15', namedInsured: 'Mason Heidebrecht', propertyId: 'p1', status: 'active' },
  { id: 'ins3', type: 'umbrella', carrier: 'GEICO', policyNumber: 'GE-11111', coverageLimit: 1000000, deductible: 0, premiumAmount: 300, premiumFrequency: 'annual', effectiveDate: '2025-03-01', expirationDate: '2026-03-01', namedInsured: 'Mason Heidebrecht', status: 'expiring' },
  { id: 'ins4', type: 'renters', carrier: 'Lemonade', policyNumber: 'LM-22222', coverageLimit: 50000, deductible: 250, premiumAmount: 15, premiumFrequency: 'monthly', effectiveDate: '2025-01-01', expirationDate: '2026-01-01', namedInsured: 'Mason Heidebrecht', propertyId: 'p2', status: 'active' },
];

// ============ DOCUMENTS ============
export const mockDocuments: Document[] = [
  { id: 'doc1', type: 'trust', title: 'Heidebrecht Family Trust', fileName: 'family_trust_2024.pdf', uploadedAt: '2026-02-15', status: 'completed' },
  { id: 'doc2', type: 'tax_return', title: '2025 Tax Return', fileName: '2025_1040.pdf', uploadedAt: '2026-03-10', status: 'completed' },
  { id: 'doc3', type: 'insurance', title: 'State Farm Auto Policy', fileName: 'statefarm_auto.pdf', uploadedAt: '2026-03-20', status: 'processing' },
];

// ============ TRUSTS ============
export const mockTrusts: Trust[] = [
  { id: 't1', documentId: 'doc1', name: 'Heidebrecht Family Trust', type: 'revocable', grantorName: 'Mason Heidebrecht', executionDate: '2024-08-15', state: 'Utah', trustees: [{ name: 'Mason Heidebrecht', role: 'primary' }, { name: 'Katie Heidebrecht', role: 'successor' }], beneficiaries: [{ name: 'Future Children', relationship: 'Children', distribution: 'Equal shares at age 25' }], summary: 'Revocable living trust for estate planning and probate avoidance.' },
];

// ============ CONTACTS ============
export const mockContacts: Contact[] = [
  { id: 'c1', type: 'cpa', name: 'Sarah Johnson', company: 'Johnson Tax Services', email: 'sarah@johnsontax.com', phone: '801-555-9876' },
  { id: 'c2', type: 'insurance_agent', name: 'John Smith', company: 'State Farm', email: 'john.smith@statefarm.com', phone: '801-555-1234' },
  { id: 'c3', type: 'attorney', name: 'Michael Davis', company: 'Davis Law Group', email: 'mdavis@davislaw.com', phone: '801-555-4567', notes: 'Estate planning attorney' },
];

// ============ BUSINESS ============
export const mockBusinessSnapshot: BusinessSnapshot = {
  cashBalance: 47250,
  revenueMonth: 32400,
  expensesMonth: 18750,
  netIncomeMonth: 13650,
  arTotal: 8400,
  apTotal: 3200,
};

// ============ HELPER FUNCTIONS ============
export const getExpiringPolicies = (days: number = 30) =>
  mockInsurancePolicies.filter(p => {
    const exp = new Date(p.expirationDate);
    const diff = (exp.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return diff > 0 && diff <= days;
  });

export const getTotalPremiums = () =>
  mockInsurancePolicies.reduce((sum, p) => {
    const annual = p.premiumFrequency === 'monthly' ? p.premiumAmount * 12
      : p.premiumFrequency === 'quarterly' ? p.premiumAmount * 4
      : p.premiumFrequency === 'semi-annual' ? p.premiumAmount * 2
      : p.premiumAmount;
    return sum + annual;
  }, 0);

export const getInsuranceForVehicle = (vehicleId: string): InsurancePolicy[] => {
  return mockInsurancePolicies.filter(p => p.vehicleId === vehicleId);
};

export const getInsuranceForProperty = (propertyId: string): InsurancePolicy[] => {
  return mockInsurancePolicies.filter(p => p.propertyId === propertyId);
};

