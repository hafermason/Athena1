import { useState } from 'react';
import { User, Bell, Landmark, Download, Check } from 'lucide-react';
import { mockUser, mockAccounts } from '../data/mockData';

export default function Settings() {
  const [profile, setProfile] = useState({ name: mockUser.name, email: mockUser.email });
  const [notifications, setNotifications] = useState(mockUser.notifications);
  const [savedProfile, setSavedProfile] = useState(false);
  const [savedNotifications, setSavedNotifications] = useState(false);

  const handleSaveProfile = () => {
    setSavedProfile(true);
    setTimeout(() => setSavedProfile(false), 2000);
  };

  const handleSaveNotifications = () => {
    setSavedNotifications(true);
    setTimeout(() => setSavedNotifications(false), 2000);
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Settings</h1>
        <p className="text-surface-400 text-sm mt-1">Manage your account and preferences</p>
      </div>

      {/* Profile */}
      <div className="rounded-2xl bg-white border border-surface-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-surface-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-athena-100 text-athena-600 flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <h2 className="font-semibold text-surface-800">Profile</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-athena-400 to-athena-600 flex items-center justify-center text-white text-2xl font-bold">
              {profile.name[0]}
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <label className="text-xs font-medium text-surface-500 mb-1.5 block">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300 focus:ring-2 focus:ring-athena-100"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-surface-500 mb-1.5 block">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300 focus:ring-2 focus:ring-athena-100"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button onClick={handleSaveProfile} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-athena-600 text-white text-sm font-medium hover:bg-athena-700 transition-colors">
              {savedProfile ? <><Check className="w-4 h-4" /> Saved!</> : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-2xl bg-white border border-surface-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-surface-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
            <Bell className="w-4 h-4" />
          </div>
          <h2 className="font-semibold text-surface-800">Email Notifications</h2>
        </div>
        <div className="divide-y divide-surface-100">
          {[
            { key: 'weeklyDigest' as const, title: 'Weekly Digest', desc: 'Summary of spending, savings, and opportunities' },
            { key: 'billReminders' as const, title: 'Bill Reminders', desc: 'Get notified before bills are due' },
            { key: 'opportunityAlerts' as const, title: 'Opportunity Alerts', desc: 'New AI savings recommendations' },
            { key: 'accountAlerts' as const, title: 'Account Alerts', desc: 'Unusual activity or low balance warnings' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="text-sm font-medium text-surface-800">{item.title}</p>
                <p className="text-xs text-surface-400 mt-0.5">{item.desc}</p>
              </div>
              <button
                onClick={() => toggleNotification(item.key)}
                className={`relative w-11 h-6 rounded-full transition-colors ${notifications[item.key] ? 'bg-athena-600' : 'bg-surface-300'}`}
              >
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${notifications[item.key] ? 'translate-x-5' : ''}`} />
              </button>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-surface-100 flex justify-end">
          <button onClick={handleSaveNotifications} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-athena-600 text-white text-sm font-medium hover:bg-athena-700 transition-colors">
            {savedNotifications ? <><Check className="w-4 h-4" /> Saved!</> : 'Save Preferences'}
          </button>
        </div>
      </div>

      {/* Linked Accounts */}
      <div className="rounded-2xl bg-white border border-surface-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-surface-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
            <Landmark className="w-4 h-4" />
          </div>
          <h2 className="font-semibold text-surface-800">Linked Accounts</h2>
        </div>
        <div className="divide-y divide-surface-100">
          {mockAccounts.map((account) => (
            <div key={account.id} className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="text-sm font-medium text-surface-800">{account.name}</p>
                <p className="text-xs text-surface-400">{account.institution} · ••{account.mask}</p>
              </div>
              <button className="text-xs font-medium text-danger hover:text-red-700 transition-colors">
                Unlink
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Data Export */}
      <div className="rounded-2xl bg-white border border-surface-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-surface-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center">
            <Download className="w-4 h-4" />
          </div>
          <h2 className="font-semibold text-surface-800">Data Export</h2>
        </div>
        <div className="p-6">
          <p className="text-sm text-surface-500 mb-4">Download your financial data in CSV format for your records or tax preparation.</p>
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-xl bg-surface-100 text-surface-700 text-sm font-medium hover:bg-surface-200 transition-colors">
              Export Transactions
            </button>
            <button className="px-4 py-2 rounded-xl bg-surface-100 text-surface-700 text-sm font-medium hover:bg-surface-200 transition-colors">
              Export Account Summary
            </button>
            <button className="px-4 py-2 rounded-xl bg-surface-100 text-surface-700 text-sm font-medium hover:bg-surface-200 transition-colors">
              Full Data Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
