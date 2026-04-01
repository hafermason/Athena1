import { useState } from 'react';
import { Landmark, RefreshCw, ExternalLink } from 'lucide-react';
import PlaidLinkButton from '../components/PlaidLinkButton';
import TransactionRow from '../components/TransactionRow';
import {
  mockAccounts,
  getAccountsByInstitution,
  getTransactionsForAccount,
} from '../data/mockData';

const typeLabels: Record<string, string> = {
  checking: 'Checking',
  savings: 'Savings',
  credit: 'Credit Card',
  investment: 'Investment',
  loan: 'Loan',
  mortgage: 'Mortgage',
};

const typeColors: Record<string, string> = {
  checking: 'bg-green-100 text-green-700',
  savings: 'bg-green-100 text-green-600',
  credit: 'bg-orange-100 text-orange-600',
  investment: 'bg-stone-100 text-stone-600',
  loan: 'bg-red-100 text-red-600',
  mortgage: 'bg-stone-200 text-stone-700',
};

export default function Accounts() {
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const groups = getAccountsByInstitution();
  const selectedAccount = mockAccounts.find((a) => a.id === selectedAccountId);
  const selectedTransactions = selectedAccountId ? getTransactionsForAccount(selectedAccountId) : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Accounts</h1>
          <p className="text-surface-400 text-sm mt-1">
            {mockAccounts.length} linked accounts across {Object.keys(groups).length} institutions
          </p>
        </div>
        <PlaidLinkButton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Account list */}
        <div className="lg:col-span-3 space-y-6">
          {Object.entries(groups).map(([institution, accounts]) => (
            <div key={institution} className="rounded-2xl bg-white border border-surface-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-surface-100 bg-surface-50/50 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-athena-100 text-athena-600 flex items-center justify-center">
                  <Landmark className="w-4 h-4" />
                </div>
                <h2 className="font-semibold text-surface-800">{institution}</h2>
                <span className="text-xs text-surface-400 ml-auto">
                  {accounts.length} account{accounts.length > 1 ? 's' : ''}
                </span>
              </div>
              <div className="divide-y divide-surface-100">
                {accounts.map((account) => (
                  <button
                    key={account.id}
                    onClick={() => setSelectedAccountId(account.id === selectedAccountId ? null : account.id)}
                    className={`w-full flex items-center justify-between px-6 py-4 text-left hover:bg-surface-50 transition-colors ${
                      selectedAccountId === account.id ? 'bg-athena-50/50 border-l-2 border-athena-500' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-sm font-medium text-surface-800">{account.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${typeColors[account.type]}`}>
                            {typeLabels[account.type]}
                          </span>
                          <span className="text-xs text-surface-400">••{account.mask}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold tabular-nums ${account.balance < 0 ? 'text-danger' : 'text-surface-900'}`}>
                        {account.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5 text-surface-400">
                        <RefreshCw className="w-3 h-3" />
                        <span className="text-[10px]">
                          {new Date(account.lastSynced).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Account detail */}
        <div className="lg:col-span-2">
          {selectedAccount ? (
            <div className="rounded-2xl bg-white border border-surface-200 overflow-hidden sticky top-6">
              <div className="p-6 bg-gradient-to-br from-athena-600 to-athena-800 text-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-athena-200 bg-white/10 px-2 py-1 rounded-lg">
                    {typeLabels[selectedAccount.type]}
                  </span>
                  <ExternalLink className="w-4 h-4 text-athena-200" />
                </div>
                <p className="text-lg font-semibold">{selectedAccount.name}</p>
                <p className="text-sm text-athena-200">{selectedAccount.institution} · ••{selectedAccount.mask}</p>
                <p className="text-3xl font-bold mt-4 tabular-nums">
                  {selectedAccount.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </p>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-surface-700 mb-3 px-2">Recent Transactions</h3>
                {selectedTransactions.length > 0 ? (
                  <div className="space-y-0.5">
                    {selectedTransactions.slice(0, 8).map((t) => (
                      <TransactionRow key={t.id} transaction={t} showProperty={false} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-surface-400 text-center py-8">No recent transactions</p>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-white border border-surface-200 p-12 text-center sticky top-6">
              <div className="w-14 h-14 rounded-2xl bg-surface-100 mx-auto flex items-center justify-center text-surface-400 mb-4">
                <Landmark className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-surface-700 mb-1">Select an Account</h3>
              <p className="text-sm text-surface-400">Click on an account to view details and recent transactions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
