import type { Budget, BudgetCategory, SavingsGoal, BudgetAlert } from '../types';

// ============================================
// BUDGET CATEGORIES
// ============================================
export const budgetCategories: BudgetCategory[] = [
  {
    id: 'housing',
    name: 'Housing',
    icon: 'Home',
    color: '#6366f1',
    budgetedAmount: 2200,
    spentAmount: 1992,
    transactions: 3,
  },
  {
    id: 'groceries',
    name: 'Groceries',
    icon: 'ShoppingCart',
    color: '#22c55e',
    budgetedAmount: 600,
    spentAmount: 487,
    transactions: 8,
  },
  {
    id: 'dining',
    name: 'Dining & Restaurants',
    icon: 'Utensils',
    color: '#f59e0b',
    budgetedAmount: 400,
    spentAmount: 352,
    transactions: 12,
  },
  {
    id: 'transportation',
    name: 'Transportation',
    icon: 'Car',
    color: '#06b6d4',
    budgetedAmount: 400,
    spentAmount: 289,
    transactions: 6,
  },
  {
    id: 'utilities',
    name: 'Utilities',
    icon: 'Zap',
    color: '#8b5cf6',
    budgetedAmount: 350,
    spentAmount: 387,
    transactions: 5,
  },
  {
    id: 'subscriptions',
    name: 'Subscriptions',
    icon: 'Tv',
    color: '#ec4899',
    budgetedAmount: 100,
    spentAmount: 76,
    transactions: 4,
  },
  {
    id: 'shopping',
    name: 'Shopping',
    icon: 'ShoppingBag',
    color: '#f97316',
    budgetedAmount: 300,
    spentAmount: 247,
    transactions: 7,
  },
  {
    id: 'health',
    name: 'Health & Fitness',
    icon: 'Heart',
    color: '#ef4444',
    budgetedAmount: 150,
    spentAmount: 89,
    transactions: 3,
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: 'Film',
    color: '#84cc16',
    budgetedAmount: 200,
    spentAmount: 156,
    transactions: 5,
  },
  {
    id: 'personal',
    name: 'Personal Care',
    icon: 'Sparkles',
    color: '#14b8a6',
    budgetedAmount: 100,
    spentAmount: 67,
    transactions: 3,
  },
];

// ============================================
// CURRENT MONTH BUDGET
// ============================================
export const currentBudget: Budget = {
  id: 'budget-2026-03',
  month: '2026-03',
  year: 2026,
  expectedIncome: 10350,
  actualIncome: 10350,
  categories: budgetCategories,
  totalBudgeted: budgetCategories.reduce((sum, cat) => sum + cat.budgetedAmount, 0),
  totalSpent: budgetCategories.reduce((sum, cat) => sum + cat.spentAmount, 0),
  savingsGoal: 3000,
  actualSavings: 10350 - budgetCategories.reduce((sum, cat) => sum + cat.spentAmount, 0),
};

// ============================================
// SAVINGS GOALS
// ============================================
export const savingsGoals: SavingsGoal[] = [
  {
    id: 'goal-1',
    name: 'Emergency Fund',
    targetAmount: 25000,
    currentAmount: 18500,
    color: '#6366f1',
    icon: 'Shield',
    monthlyContribution: 500,
  },
  {
    id: 'goal-2',
    name: 'Vacation Fund',
    targetAmount: 5000,
    currentAmount: 2340,
    targetDate: '2026-08-01',
    color: '#22c55e',
    icon: 'Plane',
    monthlyContribution: 400,
  },
  {
    id: 'goal-3',
    name: 'New Car Down Payment',
    targetAmount: 15000,
    currentAmount: 4200,
    targetDate: '2027-06-01',
    color: '#f59e0b',
    icon: 'Car',
    monthlyContribution: 600,
  },
  {
    id: 'goal-4',
    name: 'Investment Property',
    targetAmount: 50000,
    currentAmount: 12800,
    color: '#8b5cf6',
    icon: 'Building',
    monthlyContribution: 1000,
  },
];

// ============================================
// BUDGET ALERTS
// ============================================
export const budgetAlerts: BudgetAlert[] = [
  {
    id: 'alert-1',
    type: 'overspent',
    category: 'Utilities',
    message: 'You\'ve exceeded your Utilities budget by $37',
    amount: 37,
    percentage: 110,
    date: '2026-03-22',
  },
  {
    id: 'alert-2',
    type: 'approaching_limit',
    category: 'Dining',
    message: 'Dining is at 88% of budget with 5 days left',
    percentage: 88,
    date: '2026-03-25',
  },
  {
    id: 'alert-3',
    type: 'goal_reached',
    message: 'Emergency Fund hit 74% of your goal!',
    percentage: 74,
    date: '2026-03-20',
  },
  {
    id: 'alert-4',
    type: 'income_received',
    message: 'Paycheck deposited: $4,250',
    amount: 4250,
    date: '2026-03-24',
  },
];

// ============================================
// MONTHLY HISTORY (Last 6 months)
// ============================================
export const monthlyHistory = [
  { month: 'Oct', income: 9800, expenses: 4200, savings: 5600 },
  { month: 'Nov', income: 10100, expenses: 5100, savings: 5000 },
  { month: 'Dec', income: 10350, expenses: 6200, savings: 4150 }, // Holiday spending
  { month: 'Jan', income: 10350, expenses: 4400, savings: 5950 },
  { month: 'Feb', income: 10350, expenses: 4100, savings: 6250 },
  { month: 'Mar', income: 10350, expenses: 4142, savings: 6208 },
];

// ============================================
// HELPER FUNCTIONS
// ============================================
export function getCategoryPercentage(category: BudgetCategory): number {
  if (category.budgetedAmount === 0) return 0;
  return Math.round((category.spentAmount / category.budgetedAmount) * 100);
}

export function getCategoryStatus(category: BudgetCategory): 'good' | 'warning' | 'danger' {
  const percentage = getCategoryPercentage(category);
  if (percentage >= 100) return 'danger';
  if (percentage >= 80) return 'warning';
  return 'good';
}

export function getGoalPercentage(goal: SavingsGoal): number {
  if (goal.targetAmount === 0) return 0;
  return Math.round((goal.currentAmount / goal.targetAmount) * 100);
}

export function getRemainingBudget(): number {
  return currentBudget.totalBudgeted - currentBudget.totalSpent;
}

export function getSavingsRate(): number {
  if (currentBudget.actualIncome === 0) return 0;
  return Math.round(
    ((currentBudget.actualIncome - currentBudget.totalSpent) / currentBudget.actualIncome) * 100
  );
}
