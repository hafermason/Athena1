import { Property } from '../types';
import { Building2, Home, Building, MapPin, DollarSign } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onClick?: (property: Property) => void;
  compact?: boolean;
}

const typeIcons = {
  primary: Home,
  rental: Building2,
  commercial: Building,
};

const typeLabels = {
  primary: 'Primary',
  rental: 'Rental',
  commercial: 'Commercial',
};

const typeColors = {
  primary: 'bg-blue-100 text-blue-600',
  rental: 'bg-green-100 text-green-600',
  commercial: 'bg-purple-100 text-purple-600',
};

export default function PropertyCard({ property, onClick, compact }: PropertyCardProps) {
  const Icon = typeIcons[property.type];

  if (compact) {
    return (
      <div
        onClick={() => onClick?.(property)}
        className="flex items-center gap-4 p-4 rounded-xl bg-white border border-surface-200 hover:shadow-md hover:shadow-surface-200/50 cursor-pointer transition-all duration-200"
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${typeColors[property.type]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-surface-800 truncate">{property.nickname}</p>
          <p className="text-xs text-surface-400 truncate">{property.address.split(',')[0]}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-sm font-semibold text-surface-800">{property.currentValue.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}</p>
          <p className="text-xs text-surface-400">{property.monthlyBillsTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}/mo</p>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => onClick?.(property)}
      className="group rounded-2xl bg-white border border-surface-200 overflow-hidden hover:shadow-xl hover:shadow-surface-200/50 cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
    >
      {/* Gradient header */}
      <div className={`h-28 relative overflow-hidden ${
        property.type === 'primary'
          ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
          : property.type === 'rental'
          ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
          : 'bg-gradient-to-br from-purple-500 to-violet-600'
      }`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0djJoLTJ2LTJoMnptMCA2djJoLTJ2LTJoMnptLTYtNnYyaC0ydi0yaDJ6bTAgNnYyaC0ydi0yaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
        <div className="absolute bottom-3 left-4">
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-white/20 text-white backdrop-blur-sm`}>
            <Icon className="w-3 h-3" />
            {typeLabels[property.type]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-surface-900 text-lg">{property.nickname}</h3>
        <div className="flex items-center gap-1 mt-1 text-surface-400">
          <MapPin className="w-3.5 h-3.5" />
          <p className="text-xs truncate">{property.address}</p>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-surface-100">
          <div>
            <p className="text-xs text-surface-400">Current Value</p>
            <p className="text-lg font-bold text-surface-900">{property.currentValue.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-surface-400">Monthly Bills</p>
            <div className="flex items-center gap-1 text-surface-600">
              <DollarSign className="w-3.5 h-3.5" />
              <p className="text-sm font-semibold">{property.monthlyBillsTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
