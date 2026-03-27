// ===========================================
// ATHENA TYPE DEFINITIONS
// ===========================================

// ============ ACCOUNTS ============
export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment' | 'loan' | 'mortgage';
  institution: string;
  balance: number;
  lastSynced: string;
  mask: string;
}

// ============ TRANSACTIONS ============
export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  category: string;
  accountId: string;
  propertyId?: string;
  pending?: boolean;
}

// ============ PROPERTIES ============
export interface Property {
  id: string;
  address: string;
  nickname: string;
  currentValue: number;
  type: 'primary' | 'rental' | 'commercial' | 'vacation';
  monthlyBillsTotal: number;
  purchasePrice?: number;
  purchaseDate?: string;
}

// ============ OPPORTUNITIES ============
export interface Opportunity {
  id: string;
  title: string;
  description: string;
  estimatedSavings: number;
  source: string;
  type: 'tax' | 'insurance' | 'bills' | 'budget' | 'credit';
  status: 'active' | 'dismissed' | 'completed';
}

// ============ SPENDING ============
export interface SpendingCategory {
  name: string;
  amount: number;
  color: string;
}

// ============ USER ============
export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  notifications: {
    weeklyDigest: boolean;
    billReminders: boolean;
    opportunityAlerts: boolean;
    accountAlerts: boolean;
  };
}

// ============ CREDIT CARDS ============
export type SpendingCategoryType =
  | 'groceries'
  | 'dining'
  | 'travel'
  | 'gas'
  | 'streaming'
  | 'online_shopping'
  | 'drugstores'
  | 'home_improvement'
  | 'utilities'
  | 'rent'
  | 'general';

export interface CreditCard {
  id: string;
  name: string;
  issuer: string;
  network: 'visa' | 'mastercard' | 'amex' | 'discover';
  imageUrl?: string;
  
  // Fees
  annualFee: number;
  foreignTransactionFee: number;
  
  // Rewards
  rewardType: 'cashback' | 'points' | 'miles';
  baseRewardRate: number; // e.g., 1 for 1%
  bonusCategories: {
    category: SpendingCategoryType;
    rate: number; // e.g., 3 for 3%
    limit?: number; // quarterly/annual cap
    isRotating?: boolean;
  }[];
  
  // Sign-up bonus
  signUpBonus?: {
    amount: number; // points/miles/dollars
    spendRequired: number;
    timeframeDays: number;
    estimatedValue: number; // in dollars
  };
  
  // Benefits
  benefits: string[];
  
  // Credit requirements
  creditScoreRequired: 'excellent' | 'good' | 'fair' | 'building';
  
  // Affiliate info
  affiliateLink: string;
  affiliateNetwork?: 'cj' | 'flexoffers' | 'impact' | 'bankrate' | 'direct';
  
  // For recommendations
  isRecommended?: boolean;
  matchScore?: number;
  estimatedAnnualRewards?: number;
  matchReasons?: string[];
}

export interface CreditProfile {
  creditScoreRange: 'excellent' | 'good' | 'fair' | 'building' | 'unknown';
  creditScore?: number;
  
  // Goals
  creditGoals: (
    | 'build_credit'
    | 'maximize_cashback'
    | 'travel_rewards'
    | 'balance_transfer'
    | 'low_interest'
  )[];
  
  // Preferences
  prefersNoAnnualFee: boolean;
  maxAcceptableAnnualFee?: number;
  
  // Spending profile
  monthlySpending: {
    category: SpendingCategoryType;
    amount: number;
  }[];
}

export interface CardRecommendation {
  card: CreditCard;
  matchScore: number;
  estimatedAnnualRewards: number;
  estimatedFirstYearValue: number;
  matchReasons: string[];
  comparedToCurrentCard?: string;
  additionalAnnualValue?: number;
}

// ============ BUDGET ============
export interface BudgetCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  budgetedAmount: number;
  spentAmount: number;
  transactions: number;
}

export interface Budget {
  id: string;
  month: string; // YYYY-MM format
  year: number;
  
  // Income
  expectedIncome: number;
  actualIncome: number;
  
  // Categories
  categories: BudgetCategory[];
  
  // Totals
  totalBudgeted: number;
  totalSpent: number;
  
  // Goals
  savingsGoal: number;
  actualSavings: number;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate?: string;
  color: string;
  icon: string;
  monthlyContribution?: number;
}

export interface BudgetAlert {
  id: string;
  type: 'overspent' | 'approaching_limit' | 'goal_reached' | 'income_received';
  category?: string;
  message: string;
  amount?: number;
  percentage?: number;
  date: string;
}

// ============ DASHBOARD ============
export interface DashboardStats {
  netWorth: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
  budgetRemaining: number;
  totalSavingsGoalProgress: number;
}
