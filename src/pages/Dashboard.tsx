import { Wallet, TrendingUp, ArrowDownUp, PiggyBank, ArrowRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import TransactionRow from '../components/TransactionRow';
import PropertyCard from '../components/PropertyCard';
import OpportunityCard from '../components/OpportunityCard';
import {
  getNetWorth,
  mockMonthlyIncome,
  mockMonthlyExpenses,
  mockSavingsRate,
  mockSpendingByCategory,
  mockAccounts,
  mockTransactions,
  mockProperties,
  mockOpportunities,
} from '../data/mockData';

const formatCurrency = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const dailySpending = [
  { day: 'Mar 1', amount: 120 }, { day: 'Mar 3', amount: 85 }, { day: 'Mar 5', amount: 245 },
  { day: 'Mar 7', amount: 56 }, { day: 'Mar 9', amount: 180 }, { day: 'Mar 11', amount: 92 },
  { day: 'Mar 13', amount: 310 }, { day: 'Mar 15', amount: 235 }, { day: 'Mar 17', amount: 148 },
  { day: 'Mar 19', amount: 275 }, { day: 'Mar 21', amount: 70 }, { day: 'Mar 23', amount: 504 },
  { day: 'Mar 25', amount: 139 },
];

export default function Dashboard() {
  const netWorth = getNetWorth();
  const recentTransactions = mockTransactions.slice(0, 6);
  const topOpportunities = mockOpportunities.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Dashboard</h1>
        <p className="text-surface-400 text-sm mt-1">Welcome back, Mason. Here's your financial overview.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Net Worth"
          value={formatCurrency(netWorth)}
          trend={{ value: '+2.4% this month', positive: true }}
          icon={<Wallet className="w-5 h-5" />}
          gradient
        />
        <StatCard
          title="Monthly Income"
          value={formatCurrency(mockMonthlyIncome)}
          subtitle="2 deposits this month"
          icon={<TrendingUp className="w-5 h-5" />}
          trend={{ value: '+$350 vs last month', positive: true }}
        />
        <StatCard
          title="Monthly Expenses"
          value={formatCurrency(mockMonthlyExpenses)}
          subtitle="Across all accounts"
          icon={<ArrowDownUp className="w-5 h-5" />}
          trend={{ value: '-8.2% vs last month', positive: true }}
        />
        <StatCard
          title="Savings Rate"
          value={`${mockSavingsRate}%`}
          subtitle="Above target (50%)"
          icon={<PiggyBank className="w-5 h-5" />}
          trend={{ value: '+5.3% vs last month', positive: true }}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Spending bar chart */}
        <div className="lg:col-span-3 rounded-2xl bg-white border border-surface-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-surface-900">Spending Trend</h2>
              <p className="text-sm text-surface-400">Last 30 days</p>
            </div>
            <Link to="/transactions" className="text-sm text-athena-600 hover:text-athena-700 font-medium flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={dailySpending} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '13px' }}
                formatter={(value: any) => [`$${value}`, 'Spent']}
              />
              <Bar dataKey="amount" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Spending by category pie */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-surface-200 p-6">
          <h2 className="font-semibold text-surface-900 mb-1">By Category</h2>
          <p className="text-sm text-surface-400 mb-4">March 2026</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={mockSpendingByCategory}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="amount"
              >
                {mockSpendingByCategory.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '13px' }}
                formatter={(value: any, _name: any, props: any) => [`$${Number(value).toLocaleString()}`, props.payload.name]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-2">
            {mockSpendingByCategory.slice(0, 6).map((cat) => (
              <div key={cat.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                <span className="text-xs text-surface-500 truncate">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom section: accounts, properties, opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Account balances */}
        <div className="rounded-2xl bg-white border border-surface-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-surface-900">Account Balances</h2>
            <Link to="/accounts" className="text-sm text-athena-600 hover:text-athena-700 font-medium flex items-center gap-1">
              All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {mockAccounts.filter(a => a.balance > 0).slice(0, 5).map((account) => (
              <div key={account.id} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-surface-800">{account.name}</p>
                  <p className="text-xs text-surface-400">{account.institution} · ••{account.mask}</p>
                </div>
                <p className="text-sm font-semibold text-surface-900 tabular-nums">
                  {account.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent transactions */}
        <div className="rounded-2xl bg-white border border-surface-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-surface-900">Recent Transactions</h2>
            <Link to="/transactions" className="text-sm text-athena-600 hover:text-athena-700 font-medium flex items-center gap-1">
              All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-0.5 -mx-4">
            {recentTransactions.map((t) => (
              <TransactionRow key={t.id} transaction={t} showProperty={false} />
            ))}
          </div>
        </div>

        {/* AI Opportunities */}
        <div className="rounded-2xl bg-white border border-surface-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-surface-900">AI Opportunities</h2>
            <Link to="/opportunities" className="text-sm text-athena-600 hover:text-athena-700 font-medium flex items-center gap-1">
              All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {topOpportunities.map((o) => (
              <OpportunityCard key={o.id} opportunity={o} compact />
            ))}
          </div>
        </div>
      </div>

      {/* Properties row */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-surface-900 text-lg">Properties</h2>
          <Link to="/properties" className="text-sm text-athena-600 hover:text-athena-700 font-medium flex items-center gap-1">
            Manage <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockProperties.map((p) => (
            <PropertyCard key={p.id} property={p} compact />
          ))}
        </div>
      </div>
    </div>
  );
}
