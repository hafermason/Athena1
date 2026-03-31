import { useState } from 'react';
import { Scroll, Users, FileText, AlertCircle, Shield, ChevronDown, ChevronUp, ExternalLink, Phone } from 'lucide-react';
import { mockTrusts, mockDocuments, mockContacts } from '../data/mockData';
import { Link } from 'react-router-dom';

export default function Estate() {
  const [expandedTrust, setExpandedTrust] = useState<string | null>(null);

  const trustDocCount = mockDocuments.filter(d => d.type === 'trust' || d.type === 'will').length;
  const attorneys = mockContacts.filter(c => c.type === 'attorney');
  const allParties = mockTrusts.reduce((count, t) => count + t.trustees.length + t.beneficiaries.length, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Estate Planning</h1>
        <p className="text-surface-400 text-sm mt-1">Manage trusts, wills, and key contacts</p>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-white border border-surface-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-surface-500 text-sm font-medium">Trusts</span>
            <div className="p-2 bg-purple-100 rounded-xl">
              <Scroll className="w-4 h-4 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-surface-900">{mockTrusts.length}</p>
          <p className="text-sm text-surface-400 mt-1">Active trusts on file</p>
        </div>

        <div className="rounded-2xl bg-white border border-surface-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-surface-500 text-sm font-medium">Key Parties</span>
            <div className="p-2 bg-blue-100 rounded-xl">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-surface-900">{allParties}</p>
          <p className="text-sm text-surface-400 mt-1">Trustees & beneficiaries</p>
        </div>

        <div className="rounded-2xl bg-white border border-surface-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-surface-500 text-sm font-medium">Documents</span>
            <div className="p-2 bg-emerald-100 rounded-xl">
              <FileText className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-surface-900">{trustDocCount}</p>
          <p className="text-sm text-surface-400 mt-1">Estate-related documents</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trusts - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Trusts section */}
          <div className="rounded-2xl bg-white border border-surface-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-surface-100 bg-surface-50/50 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                <Scroll className="w-4 h-4" />
              </div>
              <h2 className="font-semibold text-surface-800">Trusts</h2>
            </div>
            <div className="divide-y divide-surface-100">
              {mockTrusts.map((trust) => {
                const isExpanded = expandedTrust === trust.id;
                const primaryTrustee = trust.trustees.find(t => t.role === 'primary');
                
                return (
                  <div key={trust.id}>
                    <button
                      onClick={() => setExpandedTrust(isExpanded ? null : trust.id)}
                      className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-surface-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-surface-900">{trust.name}</p>
                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                              trust.type === 'revocable' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {trust.type.charAt(0).toUpperCase() + trust.type.slice(1)}
                            </span>
                          </div>
                          <p className="text-xs text-surface-400 mt-0.5">
                            Grantor: {trust.grantorName} · Trustee: {primaryTrustee?.name}
                          </p>
                        </div>
                      </div>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-surface-400" /> : <ChevronDown className="w-4 h-4 text-surface-400" />}
                    </button>
                    
                    {isExpanded && (
                      <div className="px-6 pb-6 space-y-4 animate-fade-in">
                        {/* Trust details */}
                        <div className="grid grid-cols-2 gap-4 p-4 bg-surface-50 rounded-xl">
                          <div>
                            <p className="text-xs text-surface-400">Execution Date</p>
                            <p className="text-sm font-medium text-surface-800">
                              {new Date(trust.executionDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-surface-400">State</p>
                            <p className="text-sm font-medium text-surface-800">{trust.state}</p>
                          </div>
                        </div>

                        {/* Trustees */}
                        <div>
                          <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2">Trustees</p>
                          <div className="space-y-1.5">
                            {trust.trustees.map((trustee, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm">
                                <div className="w-7 h-7 rounded-full bg-athena-100 text-athena-600 flex items-center justify-center text-xs font-semibold">
                                  {trustee.name[0]}
                                </div>
                                <span className="text-surface-800">{trustee.name}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                  trustee.role === 'primary' ? 'bg-athena-100 text-athena-700' : 'bg-surface-100 text-surface-500'
                                }`}>
                                  {trustee.role}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Beneficiaries */}
                        <div>
                          <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2">Beneficiaries</p>
                          <div className="space-y-2">
                            {trust.beneficiaries.map((ben, idx) => (
                              <div key={idx} className="p-3 bg-surface-50 rounded-xl">
                                <p className="text-sm font-medium text-surface-800">{ben.name}</p>
                                <p className="text-xs text-surface-400">{ben.relationship} · {ben.distribution}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* AI Summary */}
                        {trust.summary && (
                          <div className="p-4 bg-athena-50 rounded-xl border border-athena-100">
                            <div className="flex items-center gap-2 mb-2">
                              <Shield className="w-4 h-4 text-athena-600" />
                              <p className="text-xs font-semibold text-athena-700">AI Summary</p>
                            </div>
                            <p className="text-sm text-athena-800">{trust.summary}</p>
                          </div>
                        )}

                        {/* Link to document */}
                        <Link
                          to="/documents"
                          className="flex items-center gap-2 text-sm text-athena-600 hover:text-athena-700 font-medium"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> View Source Document
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Wills section */}
          <div className="rounded-2xl bg-white border border-surface-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <h2 className="font-semibold text-surface-800">Wills</h2>
            </div>
            <div className="text-center py-8">
              <FileText className="w-8 h-8 text-surface-300 mx-auto mb-2" />
              <p className="text-sm text-surface-500 font-medium">No wills uploaded yet</p>
              <p className="text-xs text-surface-400 mt-1">Upload your will to Documents for AI-powered analysis</p>
              <Link
                to="/documents"
                className="inline-flex items-center gap-1 mt-3 px-4 py-2 rounded-xl bg-athena-600 text-white text-sm font-medium hover:bg-athena-700 transition-colors"
              >
                Upload Document
              </Link>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Key Contacts */}
          <div className="rounded-2xl bg-white border border-surface-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <h2 className="font-semibold text-surface-800">Key Contacts</h2>
            </div>
            <div className="space-y-3">
              {attorneys.map((contact) => (
                <div key={contact.id} className="flex items-center gap-3 p-3 rounded-xl bg-surface-50 border border-surface-100">
                  <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-semibold">
                    {contact.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-surface-800">{contact.name}</p>
                    <p className="text-xs text-surface-400">{contact.company}</p>
                    {contact.phone && (
                      <a href={`tel:${contact.phone}`} className="text-xs text-athena-600 flex items-center gap-1 mt-0.5 hover:text-athena-700">
                        <Phone className="w-3 h-3" /> {contact.phone}
                      </a>
                    )}
                  </div>
                </div>
              ))}
              <Link
                to="/contacts"
                className="text-sm text-athena-600 hover:text-athena-700 font-medium flex items-center gap-1"
              >
                View all contacts <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* AI Alerts */}
          <div className="rounded-2xl bg-white border border-surface-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                <AlertCircle className="w-4 h-4" />
              </div>
              <h2 className="font-semibold text-surface-800">AI Alerts</h2>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-3 p-3 rounded-xl border bg-amber-50 border-amber-100">
                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-surface-800">Review trust every 3 years</p>
                  <p className="text-xs text-surface-500 mt-0.5">
                    Your Heidebrecht Family Trust was created {
                      Math.floor((Date.now() - new Date('2024-08-15').getTime()) / (1000 * 60 * 60 * 24 * 365))
                    } years ago. Schedule a review with your attorney.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl border bg-blue-50 border-blue-100">
                <Shield className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-surface-800">Consider adding beneficiary designations</p>
                  <p className="text-xs text-surface-500 mt-0.5">
                    Your investment accounts may need beneficiary updates to align with your trust.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl border bg-purple-50 border-purple-100">
                <FileText className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-surface-800">Upload your will</p>
                  <p className="text-xs text-surface-500 mt-0.5">
                    No will document found. Upload for a comprehensive estate plan analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
