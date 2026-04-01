import {
  DollarSign,
  TrendingUp,
  PiggyBank,
  Target,
  AlertCircle,
  Plus,
  Edit3,
  CheckCircle,
  AlertTriangle,
  Wallet,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Home,
  ShoppingCart,
  Utensils,
  Car,
  Zap,
  Tv,
  ShoppingBag,
  Heart,
  Film,
  Sparkles,
  Shield,
  Plane,
  Building,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import {
  currentBudget,
  budgetCategories,
  savingsGoals,
  budgetAlerts,
  monthlyHistory,
  getCategoryPercentage,
  getCategoryStatus,
  getGoalPercentage,
  getRemainingBudget,
  getSavingsRate,
} from '../data/budgetData';
import type { BudgetCategory, SavingsGoal } from '../types';
// ============================================
// ICON MAP
// ============================================
const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="w-5 h-5" />,
  ShoppingCart: <ShoppingCart className="w-5 h-5" />,
  Utensils: <Utensils className="w-5 h-5" />,
  Car: <Car className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Tv: <Tv className="w-5 h-5" />,
  ShoppingBag: <ShoppingBag className="w-5 h-5" />,
  Heart: <Heart className="w-5 h-5" />,
  Film: <Film className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  Plane: <Plane className="w-5 h-5" />,
  Building: <Building className="w-5 h-5" />,
};

// ============================================
// BUDGET OVERVIEW CARDS
// ============================================
function BudgetOverviewCards() {
  const remaining = getRemainingBudget();
  const savingsRate = getSavingsRate();
  const daysLeft = 5; // Days left in month (would calculate dynamically)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Income */}
      <div className="bg-white rounded-2xl border border-surface-200 p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-surface-500 text-sm font-medium">Monthly Income</span>
          <div className="p-2 bg-emerald-100 rounded-xl">
            <ArrowUpRight className="w-4 h-4 text-emerald-600" />
          </div>
        </div>
        <p className="text-2xl font-bold text-surface-900">
          ${currentBudget.actualIncome.toLocaleString()}
        </p>
        <p className="text-sm text-emerald-600 mt-1">+$350 vs last month</p>
      </div>

      {/* Spent */}
      <div className="bg-white rounded-2xl border border-surface-200 p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-surface-500 text-sm font-medium">Total Spent</span>
          <div className="p-2 bg-red-100 rounded-xl">
            <ArrowDownRight className="w-4 h-4 text-red-600" />
          </div>
        </div>
        <p className="text-2xl font-bold text-surface-900">
          ${currentBudget.totalSpent.toLocaleString()}
        </p>
        <p className="text-sm text-surface-500 mt-1">
          of ${currentBudget.totalBudgeted.toLocaleString()} budgeted
        </p>
      </div>

      {/* Remaining */}
      <div className="bg-white rounded-2xl border border-surface-200 p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-surface-500 text-sm font-medium">Remaining</span>
          <div className="p-2 bg-athena-100 rounded-xl">
            <Wallet className="w-4 h-4 text-athena-600" />
          </div>
        </div>
        <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
          ${Math.abs(remaining).toLocaleString()}
          {remaining < 0 && ' over'}
        </p>
        <p className="text-sm text-surface-500 mt-1">{daysLeft} days left this month</p>
      </div>

      {/* Savings Rate */}
      <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-2xl p-5 text-white">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white/80 text-sm font-medium">Savings Rate</span>
          <div className="p-2 bg-white/20 rounded-xl">
            <PiggyBank className="w-4 h-4 text-white" />
          </div>
        </div>
        <p className="text-2xl font-bold">{savingsRate}%</p>
        <p className="text-sm text-white/80 mt-1">Target: 50% • Excellent!</p>
      </div>
    </div>
  );
}

// ============================================
// BUDGET CATEGORY CARD
// ============================================
interface CategoryCardProps {
  category: BudgetCategory;
  onClick?: () => void;
}

function CategoryCard({ category, onClick }: CategoryCardProps) {
  const percentage = getCategoryPercentage(category);
  const status = getCategoryStatus(category);
  const remaining = category.budgetedAmount - category.spentAmount;

  const statusColors = {
    good: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500',
  };

  const statusBg = {
    good: 'bg-emerald-50',
    warning: 'bg-amber-50',
    danger: 'bg-red-50',
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-surface-200 p-4 hover:shadow-md transition-shadow cursor-pointer ${status === 'danger' ? 'border-red-200' : ''
        }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${category.color}20` }}
        >
          <span style={{ color: category.color }}>
            {iconMap[category.icon] || <DollarSign className="w-5 h-5" />}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-surface-900 truncate">{category.name}</h3>
          <p className="text-xs text-surface-500">{category.transactions} transactions</p>
        </div>
        {status !== 'good' && (
          <div className={`p-1.5 rounded-full ${statusBg[status]}`}>
            {status === 'warning' ? (
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600" />
            )}
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-2">
        <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${statusColors[status]}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Amounts */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-surface-600">
          ${category.spentAmount.toLocaleString()} of ${category.budgetedAmount.toLocaleString()}
        </span>
        <span className={`font-medium ${remaining >= 0 ? 'text-surface-700' : 'text-red-600'}`}>
          {remaining >= 0 ? `$${remaining} left` : `$${Math.abs(remaining)} over`}
        </span>
      </div>
    </div>
  );
}

// ============================================
// SAVINGS GOAL CARD
// ============================================
interface GoalCardProps {
  goal: SavingsGoal;
}

function GoalCard({ goal }: GoalCardProps) {
  const percentage = getGoalPercentage(goal);

  return (
    <div className="bg-white rounded-xl border border-surface-200 p-4">
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${goal.color}20` }}
        >
          <span style={{ color: goal.color }}>
            {iconMap[goal.icon] || <Target className="w-5 h-5" />}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-surface-900 truncate">{goal.name}</h3>
          {goal.targetDate && (
            <p className="text-xs text-surface-500">
              Target: {new Date(goal.targetDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </p>
          )}
        </div>
        <span className="text-sm font-semibold" style={{ color: goal.color }}>
          {percentage}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-2">
        <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${percentage}%`, backgroundColor: goal.color }}
          />
        </div>
      </div>

      {/* Amounts */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-surface-600">
          ${goal.currentAmount.toLocaleString()} saved
        </span>
        <span className="text-surface-500">
          of ${goal.targetAmount.toLocaleString()}
        </span>
      </div>

      {goal.monthlyContribution && (
        <p className="text-xs text-athena-600 mt-2">
          +${goal.monthlyContribution}/mo contribution
        </p>
      )}
    </div>
  );
}

// ============================================
// BUDGET ALERTS
// ============================================
function BudgetAlertsList() {
  const alertIcons: Record<string, React.ReactNode> = {
    overspent: <AlertCircle className="w-4 h-4 text-red-600" />,
    approaching_limit: <AlertTriangle className="w-4 h-4 text-amber-600" />,
    goal_reached: <CheckCircle className="w-4 h-4 text-emerald-600" />,
    income_received: <ArrowUpRight className="w-4 h-4 text-green-700" />,
  };

  const alertBg: Record<string, string> = {
    overspent: 'bg-red-50 border-red-100',
    approaching_limit: 'bg-amber-50 border-amber-100',
    goal_reached: 'bg-emerald-50 border-emerald-100',
    income_received: 'bg-green-50 border-green-100',
  };

  return (
    <div className="space-y-2">
      {budgetAlerts.slice(0, 4).map((alert) => (
        <div
          key={alert.id}
          className={`flex items-start gap-3 p-3 rounded-xl border ${alertBg[alert.type]}`}
        >
          <div className="mt-0.5">{alertIcons[alert.type]}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-surface-800">{alert.message}</p>
            <p className="text-xs text-surface-500 mt-0.5">{alert.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================
// INCOME VS EXPENSES CHART
// ============================================
function IncomeExpensesChart() {
  return (
    <div className="bg-white rounded-2xl border border-surface-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-semibold text-surface-900">Income vs Expenses</h2>
          <p className="text-sm text-surface-500">Last 6 months</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-surface-600">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <span className="text-surface-600">Expenses</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={monthlyHistory} barGap={8}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '13px',
            }}
            formatter={(value: any) => [`$${value.toLocaleString()}`, '']}
          />
          <Bar dataKey="income" fill="#22c55e" radius={[6, 6, 0, 0]} />
          <Bar dataKey="expenses" fill="#f87171" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ============================================
// SAVINGS TREND CHART
// ============================================
function SavingsTrendChart() {
  const savingsData = monthlyHistory.map((m) => ({
    month: m.month,
    savings: m.savings,
    rate: Math.round((m.savings / m.income) * 100),
  }));

  return (
    <div className="bg-white rounded-2xl border border-surface-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-semibold text-surface-900">Savings Trend</h2>
          <p className="text-sm text-surface-500">Monthly savings amount</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={savingsData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '13px',
            }}
            formatter={(value: any, name: any) => [
              `$${value.toLocaleString()}`,
              name === 'savings' ? 'Saved' : 'Rate',
            ]}
          />
          <Line
            type="monotone"
            dataKey="savings"
            stroke="#6366f1"
            strokeWidth={3}
            dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ============================================
// SPENDING BY CATEGORY PIE
// ============================================
function SpendingPieChart() {
  const data = budgetCategories
    .filter((c) => c.spentAmount > 0)
    .sort((a, b) => b.spentAmount - a.spentAmount)
    .slice(0, 6);

  return (
    <div className="bg-white rounded-2xl border border-surface-200 p-6">
      <h2 className="font-semibold text-surface-900 mb-4">Spending Breakdown</h2>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey="spentAmount"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '13px',
            }}
            formatter={(value: any, _name: any, props: any) => [
              `$${Number(value).toLocaleString()}`,
              props.payload.name,
            ]}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.map((cat) => (
          <div key={cat.id} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: cat.color }}
            />
            <span className="text-xs text-surface-600 truncate">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function BudgetPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Budget</h1>
          <p className="text-surface-500 text-sm mt-1">
            Track spending and reach your financial goals
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-surface-700 bg-white border border-surface-200 rounded-xl hover:bg-surface-50">
            <Calendar className="w-4 h-4" />
            March 2026
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-athena-600 rounded-xl hover:bg-athena-700">
            <Edit3 className="w-4 h-4" />
            Edit Budget
          </button>
        </div>
      </div>

      {/* Overview cards */}
      <BudgetOverviewCards />

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Budget categories - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-surface-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-surface-900">Budget Categories</h2>
              <button className="flex items-center gap-1 text-sm text-athena-600 font-medium hover:text-athena-700">
                <Plus className="w-4 h-4" />
                Add Category
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {budgetCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>

          {/* Charts */}
          <IncomeExpensesChart />
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Alerts */}
          <div className="bg-white rounded-2xl border border-surface-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-surface-900">Alerts</h2>
              <span className="text-xs text-surface-500">{budgetAlerts.length} new</span>
            </div>
            <BudgetAlertsList />
          </div>

          {/* Savings Goals */}
          <div className="bg-white rounded-2xl border border-surface-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-surface-900">Savings Goals</h2>
              <button className="flex items-center gap-1 text-sm text-athena-600 font-medium hover:text-athena-700">
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>

            <div className="space-y-4">
              {savingsGoals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          </div>

          {/* Spending pie chart */}
          <SpendingPieChart />
        </div>
      </div>

      {/* Bottom charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SavingsTrendChart />

        {/* Tips card */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">You're doing great! 🎉</h3>
              <p className="text-white/90 text-sm mb-4">
                Your savings rate of {getSavingsRate()}% is above your 50% target. Keep it up!
                At this pace, you'll reach your Emergency Fund goal in 13 months.
              </p>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-2xl font-bold">${currentBudget.actualSavings.toLocaleString()}</p>
                  <p className="text-xs text-white/70">Saved this month</p>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div>
                  <p className="text-2xl font-bold">
                    ${savingsGoals.reduce((sum, g) => sum + g.currentAmount, 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-white/70">Total goal progress</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
