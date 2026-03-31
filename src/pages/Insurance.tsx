import { useState } from 'react';
import { Shield, Car, Home, Heart, Building2, Umbrella, Plus, X, AlertTriangle, DollarSign, Calendar, Phone, User } from 'lucide-react';
import { mockInsurancePolicies, getTotalPremiums, getExpiringPolicies, mockProperties, mockVehicles } from '../data/mockData';
import type { InsurancePolicy } from '../types';

type FilterType = '' | 'auto' | 'home' | 'life' | 'umbrella' | 'renters' | 'other';

const typeIcons: Record<string, React.ElementType> = {
  auto: Car,
  home: Home,
  umbrella: Umbrella,
  life: Heart,
  health: Heart,
  renters: Building2,
  business: Building2,
  other: Shield,
};

const typeColors: Record<string, string> = {
  auto: 'from-blue-500 to-indigo-600',
  home: 'from-emerald-500 to-teal-600',
  umbrella: 'from-purple-500 to-violet-600',
  life: 'from-rose-500 to-pink-600',
  health: 'from-red-500 to-rose-600',
  renters: 'from-amber-500 to-orange-600',
  business: 'from-slate-500 to-gray-600',
  other: 'from-gray-500 to-slate-600',
};

const statusColors: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-700',
  expiring: 'bg-amber-100 text-amber-700',
  expired: 'bg-red-100 text-red-700',
};

const statusLabels: Record<string, string> = {
  active: 'Active',
  expiring: 'Expiring Soon',
  expired: 'Expired',
};

const formatCurrency = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const filters: { label: string; value: FilterType }[] = [
  { label: 'All', value: '' },
  { label: 'Auto', value: 'auto' },
  { label: 'Home', value: 'home' },
  { label: 'Umbrella', value: 'umbrella' },
  { label: 'Life', value: 'life' },
  { label: 'Renters', value: 'renters' },
];

function PolicyCard({ policy, onClick }: { policy: InsurancePolicy; onClick: (p: InsurancePolicy) => void }) {
  const Icon = typeIcons[policy.type] || Shield;

  return (
    <div
      onClick={() => onClick(policy)}
      className="rounded-2xl bg-white border border-surface-200 overflow-hidden hover:shadow-xl hover:shadow-surface-200/50 cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className={`h-20 relative overflow-hidden bg-gradient-to-br ${typeColors[policy.type]}`}>
        <div className="absolute inset-0 bg-white/5" />
        <div className="absolute bottom-3 left-4">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
            <Icon className="w-3 h-3" />
            {policy.type.charAt(0).toUpperCase() + policy.type.slice(1)}
          </span>
        </div>
        <div className="absolute top-3 right-4">
          <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${statusColors[policy.status]}`}>
            {statusLabels[policy.status]}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-surface-900">{policy.carrier}</h3>
        <p className="text-xs text-surface-400 mt-0.5">Policy #{policy.policyNumber}</p>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div>
            <p className="text-xs text-surface-400">Coverage</p>
            <p className="text-sm font-semibold text-surface-800">{formatCurrency(policy.coverageLimit)}</p>
          </div>
          <div>
            <p className="text-xs text-surface-400">Deductible</p>
            <p className="text-sm font-semibold text-surface-800">{formatCurrency(policy.deductible)}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-surface-100">
          <div>
            <p className="text-xs text-surface-400">Premium</p>
            <p className="text-sm font-bold text-athena-600">
              {formatCurrency(policy.premiumAmount)}
              <span className="text-xs font-normal text-surface-400">/{policy.premiumFrequency === 'monthly' ? 'mo' : policy.premiumFrequency === 'quarterly' ? 'qtr' : policy.premiumFrequency === 'semi-annual' ? '6mo' : 'yr'}</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-surface-400">Expires</p>
            <p className="text-xs font-medium text-surface-600">
              {new Date(policy.expirationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Insurance() {
  const [filterType, setFilterType] = useState<FilterType>('');
  const [selectedPolicy, setSelectedPolicy] = useState<InsurancePolicy | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const filtered = filterType ? mockInsurancePolicies.filter(p => p.type === filterType) : mockInsurancePolicies;
  const totalAnnual = getTotalPremiums();
  const expiringPolicies = getExpiringPolicies(60);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Insurance Policies</h1>
          <p className="text-surface-400 text-sm mt-1">
            {mockInsurancePolicies.length} policies · {formatCurrency(totalAnnual)}/yr total premiums
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-athena-50 to-purple-50 border border-athena-100">
            <div className="w-10 h-10 rounded-xl bg-athena-100 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-athena-600" />
            </div>
            <div>
              <p className="text-xs text-surface-500">Annual Premiums</p>
              <p className="text-xl font-bold text-athena-600">{formatCurrency(totalAnnual)}</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-athena-600 text-white text-sm font-semibold hover:bg-athena-700 transition-colors shadow-lg shadow-athena-600/25"
          >
            <Plus className="w-4 h-4" /> Add Policy
          </button>
        </div>
      </div>

      {/* Expiring alert */}
      {expiringPolicies.length > 0 && (
        <div className="rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 p-5 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-12 translate-x-12" />
          <div className="relative flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold">{expiringPolicies.length} {expiringPolicies.length === 1 ? 'policy' : 'policies'} expiring soon</p>
              <p className="text-sm text-white/80 mt-0.5">
                {expiringPolicies.map(p => `${p.carrier} (${p.type})`).join(', ')} — Review and renew before expiration.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4 text-surface-400" />
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilterType(f.value)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filterType === f.value
                ? 'bg-athena-600 text-white shadow-lg shadow-athena-600/25'
                : 'bg-white border border-surface-200 text-surface-600 hover:bg-surface-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Policy grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((policy) => (
          <PolicyCard key={policy.id} policy={policy} onClick={setSelectedPolicy} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-2xl bg-white border border-surface-200 py-16 text-center">
            <Shield className="w-8 h-8 text-surface-300 mx-auto mb-3" />
            <p className="text-surface-500 font-medium">No policies in this category</p>
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selectedPolicy && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className={`p-6 bg-gradient-to-br ${typeColors[selectedPolicy.type]} text-white rounded-t-2xl`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-lg">
                  {selectedPolicy.type.charAt(0).toUpperCase() + selectedPolicy.type.slice(1)} Insurance
                </span>
                <button onClick={() => setSelectedPolicy(null)} className="p-1 rounded-lg hover:bg-white/20 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-lg font-semibold">{selectedPolicy.carrier}</p>
              <p className="text-sm text-white/70">Policy #{selectedPolicy.policyNumber}</p>
              <p className="text-3xl font-bold mt-3">{formatCurrency(selectedPolicy.coverageLimit)}</p>
              <p className="text-sm text-white/70">Coverage Limit</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-surface-400">Deductible</p>
                  <p className="text-sm font-semibold text-surface-900">{formatCurrency(selectedPolicy.deductible)}</p>
                </div>
                <div>
                  <p className="text-xs text-surface-400">Premium</p>
                  <p className="text-sm font-semibold text-surface-900">
                    {formatCurrency(selectedPolicy.premiumAmount)}/{selectedPolicy.premiumFrequency}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-surface-400">Effective Date</p>
                  <p className="text-sm font-medium text-surface-700 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(selectedPolicy.effectiveDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-surface-400">Expiration Date</p>
                  <p className="text-sm font-medium text-surface-700 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(selectedPolicy.expirationDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-surface-100">
                <p className="text-xs text-surface-400 mb-1">Named Insured</p>
                <p className="text-sm font-medium text-surface-800 flex items-center gap-2">
                  <User className="w-4 h-4 text-surface-400" />
                  {selectedPolicy.namedInsured}
                </p>
              </div>
              {selectedPolicy.agentName && (
                <div className="pt-4 border-t border-surface-100">
                  <p className="text-xs text-surface-400 mb-1">Agent</p>
                  <p className="text-sm font-medium text-surface-800">{selectedPolicy.agentName}</p>
                  {selectedPolicy.agentPhone && (
                    <a href={`tel:${selectedPolicy.agentPhone}`} className="text-sm text-athena-600 flex items-center gap-1 mt-1 hover:text-athena-700">
                      <Phone className="w-3 h-3" /> {selectedPolicy.agentPhone}
                    </a>
                  )}
                </div>
              )}
              <div className="flex items-center gap-2 pt-4">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[selectedPolicy.status]}`}>
                  {statusLabels[selectedPolicy.status]}
                </span>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-surface-100 flex justify-end">
              <button
                onClick={() => setSelectedPolicy(null)}
                className="px-4 py-2 rounded-xl bg-athena-600 text-white text-sm font-medium hover:bg-athena-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add policy modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-surface-100">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-surface-900 text-lg">Add Insurance Policy</h3>
                <button onClick={() => setShowAddForm(false)} className="p-1 rounded-lg hover:bg-surface-100">
                  <X className="w-5 h-5 text-surface-400" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-surface-500 mb-1.5 block">Type</label>
                  <select className="w-full px-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300">
                    <option value="auto">Auto</option>
                    <option value="home">Homeowner's</option>
                    <option value="umbrella">Umbrella</option>
                    <option value="life">Life</option>
                    <option value="renters">Renters</option>
                    <option value="health">Health</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-surface-500 mb-1.5 block">Carrier</label>
                  <input type="text" placeholder="e.g., State Farm" className="w-full px-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300 focus:ring-2 focus:ring-athena-100" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-surface-500 mb-1.5 block">Policy Number</label>
                <input type="text" placeholder="e.g., SF-12345" className="w-full px-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300 focus:ring-2 focus:ring-athena-100" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-surface-500 mb-1.5 block">Coverage Limit</label>
                  <input type="number" placeholder="$100,000" className="w-full px-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300 focus:ring-2 focus:ring-athena-100" />
                </div>
                <div>
                  <label className="text-xs font-medium text-surface-500 mb-1.5 block">Deductible</label>
                  <input type="number" placeholder="$500" className="w-full px-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300 focus:ring-2 focus:ring-athena-100" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-surface-500 mb-1.5 block">Premium</label>
                  <input type="number" placeholder="$1,890" className="w-full px-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300 focus:ring-2 focus:ring-athena-100" />
                </div>
                <div>
                  <label className="text-xs font-medium text-surface-500 mb-1.5 block">Frequency</label>
                  <select className="w-full px-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300">
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="semi-annual">Semi-Annual</option>
                    <option value="annual">Annual</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-surface-500 mb-1.5 block">Effective Date</label>
                  <input type="date" className="w-full px-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300 focus:ring-2 focus:ring-athena-100" />
                </div>
                <div>
                  <label className="text-xs font-medium text-surface-500 mb-1.5 block">Expiration Date</label>
                  <input type="date" className="w-full px-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300 focus:ring-2 focus:ring-athena-100" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-surface-500 mb-1.5 block">Link to Property</label>
                  <select className="w-full px-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300">
                    <option value="">None</option>
                    {mockProperties.map(p => <option key={p.id} value={p.id}>{p.nickname}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-surface-500 mb-1.5 block">Link to Vehicle</label>
                  <select className="w-full px-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300">
                    <option value="">None</option>
                    {mockVehicles.map(v => <option key={v.id} value={v.id}>{v.year} {v.make} {v.model}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-surface-500 mb-1.5 block">Agent Name</label>
                  <input type="text" placeholder="John Smith" className="w-full px-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300 focus:ring-2 focus:ring-athena-100" />
                </div>
                <div>
                  <label className="text-xs font-medium text-surface-500 mb-1.5 block">Agent Phone</label>
                  <input type="text" placeholder="801-555-1234" className="w-full px-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300 focus:ring-2 focus:ring-athena-100" />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-surface-100 flex justify-end gap-2">
              <button onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-surface-600 hover:bg-surface-100">Cancel</button>
              <button onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-xl bg-athena-600 text-white text-sm font-medium hover:bg-athena-700">Add Policy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
