import { useState } from 'react';
import { Users, Plus, Mail, Phone, Building2, User, X } from 'lucide-react';
import { mockContacts } from '../data/mockData';
import type { Contact } from '../types';

type ContactType = Contact['type'];

const typeLabels: Record<ContactType, string> = {
  cpa: 'Tax & Accounting',
  attorney: 'Legal',
  insurance_agent: 'Insurance',
  financial_advisor: 'Financial',
  property_manager: 'Property',
  other: 'Other',
};

const typeSections: { label: string; types: ContactType[] }[] = [
  { label: 'Tax & Accounting', types: ['cpa'] },
  { label: 'Legal', types: ['attorney'] },
  { label: 'Insurance', types: ['insurance_agent'] },
  { label: 'Financial', types: ['financial_advisor'] },
  { label: 'Property', types: ['property_manager'] },
  { label: 'Other', types: ['other'] },
];

const typeColors: Record<ContactType, string> = {
  cpa: 'bg-green-100 text-green-700',
  attorney: 'bg-emerald-100 text-emerald-700',
  insurance_agent: 'bg-green-50 text-green-600',
  financial_advisor: 'bg-stone-100 text-stone-600',
  property_manager: 'bg-stone-100 text-stone-700',
  other: 'bg-surface-100 text-surface-600',
};

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  // Form state
  const [formType, setFormType] = useState<ContactType>('other');
  const [formName, setFormName] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formNotes, setFormNotes] = useState('');

  const openAddForm = () => {
    setFormType('other');
    setFormName('');
    setFormCompany('');
    setFormEmail('');
    setFormPhone('');
    setFormNotes('');
    setEditingContact(null);
    setShowAddForm(true);
  };

  const openEditForm = (contact: Contact) => {
    setFormType(contact.type);
    setFormName(contact.name);
    setFormCompany(contact.company || '');
    setFormEmail(contact.email || '');
    setFormPhone(contact.phone || '');
    setFormNotes(contact.notes || '');
    setEditingContact(contact);
    setShowAddForm(true);
  };

  const handleSave = () => {
    if (editingContact) {
      setContacts(prev => prev.map(c => c.id === editingContact.id ? {
        ...c, type: formType, name: formName, company: formCompany || undefined, email: formEmail || undefined, phone: formPhone || undefined, notes: formNotes || undefined
      } : c));
    } else {
      setContacts(prev => [...prev, {
        id: `c${Date.now()}`,
        type: formType,
        name: formName,
        company: formCompany || undefined,
        email: formEmail || undefined,
        phone: formPhone || undefined,
        notes: formNotes || undefined,
      }]);
    }
    setShowAddForm(false);
  };

  const sectionsWithContacts = typeSections
    .map(section => ({
      ...section,
      contacts: contacts.filter(c => section.types.includes(c.type)),
    }))
    .filter(s => s.contacts.length > 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Key Contacts</h1>
          <p className="text-surface-400 text-sm mt-1">Your financial team · {contacts.length} contacts</p>
        </div>
        <button
          onClick={openAddForm}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-athena-600 text-white text-sm font-semibold hover:bg-athena-700 transition-colors shadow-lg shadow-athena-600/25"
        >
          <Plus className="w-4 h-4" /> Add Contact
        </button>
      </div>

      {/* Contact sections */}
      <div className="space-y-6">
        {sectionsWithContacts.map((section) => (
          <div key={section.label} className="rounded-2xl bg-white border border-surface-200 overflow-hidden">
            <div className="px-6 py-3 border-b border-surface-100 bg-surface-50/50">
              <h2 className="text-xs font-semibold text-surface-500 uppercase tracking-wider">{section.label}</h2>
            </div>
            <div className="divide-y divide-surface-100">
              {section.contacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => openEditForm(contact)}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-surface-50 cursor-pointer transition-colors"
                >
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${typeColors[contact.type]}`}>
                    {contact.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-surface-900">{contact.name}</p>
                    {contact.company && (
                      <p className="text-xs text-surface-400 flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3 h-3" /> {contact.company}
                      </p>
                    )}
                  </div>

                  {/* Contact methods */}
                  <div className="flex items-center gap-3 shrink-0">
                    {contact.email && (
                      <a
                        href={`mailto:${contact.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-lg text-surface-400 hover:text-athena-600 hover:bg-athena-50 transition-colors"
                        title={contact.email}
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                    {contact.phone && (
                      <a
                        href={`tel:${contact.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-lg text-surface-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                        title={contact.phone}
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* Notes */}
                  {contact.notes && (
                    <p className="text-xs text-surface-400 max-w-[200px] truncate hidden lg:block">
                      {contact.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {contacts.length === 0 && (
        <div className="rounded-2xl bg-white border border-surface-200 py-16 text-center">
          <Users className="w-8 h-8 text-surface-300 mx-auto mb-3" />
          <p className="text-surface-500 font-medium">No contacts yet</p>
          <p className="text-sm text-surface-400 mt-1">Add your financial team members</p>
        </div>
      )}

      {/* Add/Edit modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="p-6 border-b border-surface-100">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-surface-900 text-lg">
                  {editingContact ? 'Edit Contact' : 'Add Contact'}
                </h3>
                <button onClick={() => setShowAddForm(false)} className="p-1 rounded-lg hover:bg-surface-100">
                  <X className="w-5 h-5 text-surface-400" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-surface-500 mb-1.5 block">Type</label>
                <select
                  value={formType}
                  onChange={(e) => setFormType(e.target.value as ContactType)}
                  className="w-full px-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300"
                >
                  {Object.entries(typeLabels).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-surface-500 mb-1.5 block">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="John Smith"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300 focus:ring-2 focus:ring-athena-100"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-surface-500 mb-1.5 block">Company</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                  <input
                    type="text"
                    value={formCompany}
                    onChange={(e) => setFormCompany(e.target.value)}
                    placeholder="Acme Corp"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300 focus:ring-2 focus:ring-athena-100"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-surface-500 mb-1.5 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                    <input
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300 focus:ring-2 focus:ring-athena-100"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-surface-500 mb-1.5 block">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                    <input
                      type="text"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="801-555-1234"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300 focus:ring-2 focus:ring-athena-100"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-surface-500 mb-1.5 block">Notes</label>
                <textarea
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Estate planning attorney, handles trust amendments..."
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300 focus:ring-2 focus:ring-athena-100 resize-none"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-surface-100 flex justify-end gap-2">
              <button onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-surface-600 hover:bg-surface-100">Cancel</button>
              <button
                onClick={handleSave}
                disabled={!formName}
                className="px-4 py-2 rounded-xl bg-athena-600 text-white text-sm font-medium hover:bg-athena-700 transition-colors disabled:opacity-50"
              >
                {editingContact ? 'Save Changes' : 'Add Contact'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
