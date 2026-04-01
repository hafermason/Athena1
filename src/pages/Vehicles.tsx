import { useState } from 'react';
import { Car, Plus, X, ArrowLeft, Shield, CreditCard, MapPin } from 'lucide-react';
import { mockVehicles, getInsuranceForVehicle } from '../data/mockData';
import type { Vehicle } from '../types';

const makeColors: Record<string, string> = {
  Toyota: 'from-green-600 to-green-800',
  Honda: 'from-stone-500 to-stone-700',
  Ford: 'from-green-700 to-green-900',
  Chevrolet: 'from-emerald-600 to-green-800',
  Tesla: 'from-green-500 to-emerald-700',
};

const formatCurrency = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export default function Vehicles() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  if (selectedVehicle) {
    const linkedInsurance = getInsuranceForVehicle(selectedVehicle.id);

    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedVehicle(null)}
          className="flex items-center gap-2 text-sm text-surface-500 hover:text-surface-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Vehicles
        </button>

        <div className="rounded-2xl bg-white border border-surface-200 overflow-hidden">
          <div className={`h-36 relative bg-gradient-to-br ${makeColors[selectedVehicle.make] || 'from-gray-500 to-slate-600'}`}>
            <div className="absolute inset-0 bg-white/5" />
            <div className="absolute bottom-4 left-6">
              <h1 className="text-2xl font-bold text-white">{selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}</h1>
              {selectedVehicle.licensePlate && (
                <p className="text-white/70 text-sm flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" />
                  {selectedVehicle.licensePlate} · {selectedVehicle.state}
                </p>
              )}
            </div>
            <div className="absolute top-4 right-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className={`grid ${selectedVehicle.loanBalance ? 'grid-cols-3' : 'grid-cols-1'} divide-x divide-surface-100 border-b border-surface-100`}>
            <div className="p-6 text-center">
              <p className="text-xs text-surface-400">Current Value</p>
              <p className="text-xl font-bold text-surface-900 mt-1">{formatCurrency(selectedVehicle.currentValue)}</p>
            </div>
            {selectedVehicle.loanBalance && (
              <>
                <div className="p-6 text-center">
                  <p className="text-xs text-surface-400">Loan Balance</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{formatCurrency(selectedVehicle.loanBalance)}</p>
                </div>
                <div className="p-6 text-center">
                  <p className="text-xs text-surface-400">Monthly Payment</p>
                  <p className="text-xl font-bold text-surface-900 mt-1">{formatCurrency(selectedVehicle.loanPayment || 0)}/mo</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* VIN & Details */}
          <div className="rounded-2xl bg-white border border-surface-200 p-6">
            <h2 className="font-semibold text-surface-900 mb-4">Vehicle Details</h2>
            <div className="space-y-3">
              {selectedVehicle.vin && (
                <div className="flex items-center justify-between py-2 border-b border-surface-50">
                  <span className="text-sm text-surface-500">VIN</span>
                  <span className="text-sm font-mono font-medium text-surface-800">{selectedVehicle.vin}</span>
                </div>
              )}
              {selectedVehicle.licensePlate && (
                <div className="flex items-center justify-between py-2 border-b border-surface-50">
                  <span className="text-sm text-surface-500">License Plate</span>
                  <span className="text-sm font-medium text-surface-800">{selectedVehicle.licensePlate}</span>
                </div>
              )}
              {selectedVehicle.state && (
                <div className="flex items-center justify-between py-2 border-b border-surface-50">
                  <span className="text-sm text-surface-500">State</span>
                  <span className="text-sm font-medium text-surface-800">{selectedVehicle.state}</span>
                </div>
              )}
              {selectedVehicle.loanBalance && (
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-surface-500">Equity</span>
                  <span className="text-sm font-semibold text-emerald-600">
                    {formatCurrency(selectedVehicle.currentValue - selectedVehicle.loanBalance)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Linked Insurance */}
          <div className="rounded-2xl bg-white border border-surface-200 p-6">
            <h2 className="font-semibold text-surface-900 mb-4">Linked Insurance</h2>
            {linkedInsurance.length > 0 ? (
              <div className="space-y-3">
                {linkedInsurance.map((policy) => (
                  <div key={policy.id} className="flex items-center gap-4 p-3 rounded-xl bg-surface-50 border border-surface-100">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-surface-800">{policy.carrier}</p>
                      <p className="text-xs text-surface-400">#{policy.policyNumber} · Coverage: {formatCurrency(policy.coverageLimit)}</p>
                    </div>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      policy.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {policy.status === 'active' ? 'Active' : 'Expiring'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Shield className="w-8 h-8 text-surface-300 mx-auto mb-2" />
                <p className="text-sm text-surface-400">No insurance linked to this vehicle</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Vehicles</h1>
          <p className="text-surface-400 text-sm mt-1">{mockVehicles.length} vehicles tracked</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-athena-600 text-white text-sm font-semibold hover:bg-athena-700 transition-colors shadow-lg shadow-athena-600/25"
        >
          <Plus className="w-4 h-4" /> Add Vehicle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockVehicles.map((vehicle) => {
          const linkedInsurance = getInsuranceForVehicle(vehicle.id);
          return (
            <div
              key={vehicle.id}
              onClick={() => setSelectedVehicle(vehicle)}
              className="group rounded-2xl bg-white border border-surface-200 overflow-hidden hover:shadow-xl hover:shadow-surface-200/50 cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className={`h-28 relative overflow-hidden bg-gradient-to-br ${makeColors[vehicle.make] || 'from-gray-500 to-slate-600'}`}>
                <div className="absolute inset-0 bg-white/5" />
                <div className="absolute top-3 right-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Car className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-4">
                  {vehicle.licensePlate && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                      <MapPin className="w-3 h-3" />
                      {vehicle.licensePlate} · {vehicle.state}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-surface-900 text-lg">{vehicle.year} {vehicle.make} {vehicle.model}</h3>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-surface-100">
                  <div>
                    <p className="text-xs text-surface-400">Current Value</p>
                    <p className="text-lg font-bold text-surface-900">{formatCurrency(vehicle.currentValue)}</p>
                  </div>
                  <div className="text-right">
                    {vehicle.loanBalance ? (
                      <>
                        <p className="text-xs text-surface-400">Loan Balance</p>
                        <div className="flex items-center gap-1 text-surface-600">
                          <CreditCard className="w-3.5 h-3.5" />
                          <p className="text-sm font-semibold">{formatCurrency(vehicle.loanBalance)}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="text-xs text-surface-400">Status</p>
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Paid Off</span>
                      </>
                    )}
                  </div>
                </div>

                {linkedInsurance.length > 0 && (
                  <div className="mt-3 flex items-center gap-1.5">
                    <Shield className="w-3 h-3 text-emerald-500" />
                    <span className="text-xs text-emerald-600 font-medium">Insured · {linkedInsurance[0].carrier}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Vehicle Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="p-6 border-b border-surface-100">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-surface-900 text-lg">Add Vehicle</h3>
                <button onClick={() => setShowAddForm(false)} className="p-1 rounded-lg hover:bg-surface-100"><X className="w-5 h-5 text-surface-400" /></button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-medium text-surface-500 mb-1.5 block">Year</label>
                  <input type="number" placeholder="2024" className="w-full px-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300 focus:ring-2 focus:ring-athena-100" />
                </div>
                <div>
                  <label className="text-xs font-medium text-surface-500 mb-1.5 block">Make</label>
                  <input type="text" placeholder="Toyota" className="w-full px-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300 focus:ring-2 focus:ring-athena-100" />
                </div>
                <div>
                  <label className="text-xs font-medium text-surface-500 mb-1.5 block">Model</label>
                  <input type="text" placeholder="Tacoma" className="w-full px-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300 focus:ring-2 focus:ring-athena-100" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-surface-500 mb-1.5 block">VIN (optional)</label>
                <input type="text" placeholder="5TFCZ5AN1MX123456" className="w-full px-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300 focus:ring-2 focus:ring-athena-100" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-surface-500 mb-1.5 block">License Plate</label>
                  <input type="text" placeholder="A12 BCD" className="w-full px-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300 focus:ring-2 focus:ring-athena-100" />
                </div>
                <div>
                  <label className="text-xs font-medium text-surface-500 mb-1.5 block">State</label>
                  <input type="text" placeholder="UT" className="w-full px-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300 focus:ring-2 focus:ring-athena-100" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-surface-500 mb-1.5 block">Current Value</label>
                <input type="number" placeholder="$38,500" className="w-full px-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300 focus:ring-2 focus:ring-athena-100" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-surface-500 mb-1.5 block">Loan Balance (optional)</label>
                  <input type="number" placeholder="$22,000" className="w-full px-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300 focus:ring-2 focus:ring-athena-100" />
                </div>
                <div>
                  <label className="text-xs font-medium text-surface-500 mb-1.5 block">Monthly Payment</label>
                  <input type="number" placeholder="$485" className="w-full px-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300 focus:ring-2 focus:ring-athena-100" />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-surface-100 flex justify-end gap-2">
              <button onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-surface-600 hover:bg-surface-100">Cancel</button>
              <button onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-xl bg-athena-600 text-white text-sm font-medium hover:bg-athena-700">Add Vehicle</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
