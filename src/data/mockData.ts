import type { Account, Transaction, Property, Opportunity, SpendingCategory, UserProfile } from '../types';

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
  { name: 'Housing', amount: 1992.00, color: '#6366f1' },
  { name: 'Groceries', amount: 302.75, color: '#22c55e' },
  { name: 'Utilities', amount: 472.09, color: '#f59e0b' },
  { name: 'Food & Drink', amount: 51.80, color: '#ef4444' },
  { name: 'Shopping', amount: 111.10, color: '#ec4899' },
  { name: 'Insurance', amount: 189.00, color: '#8b5cf6' },
  { name: 'Auto & Transport', amount: 52.10, color: '#06b6d4' },
  { name: 'Entertainment', amount: 15.99, color: '#f97316' },
  { name: 'Subscriptions', amount: 34.95, color: '#84cc16' },
  { name: 'Health & Fitness', amount: 24.99, color: '#14b8a6' },
  { name: 'Home', amount: 413.37, color: '#a855f7' },
  { name: 'Taxes', amount: 425.00, color: '#64748b' },
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
