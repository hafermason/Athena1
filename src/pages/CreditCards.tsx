import { useState } from 'react';
import {
  CreditCard,
  Star,
  TrendingUp,
  Gift,
  Shield,
  Plane,
  DollarSign,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Info,
  Check,
  Sparkles,
} from 'lucide-react';
import { mockRecommendations, mockCreditProfile } from '../data/creditCards';
import type { CardRecommendation, CreditCard as CreditCardType } from '../types';

// ============================================
// AFFILIATE DISCLOSURE BANNER
// ============================================
function AffiliateDisclosure() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
      <div className="flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm text-amber-800">
            <span className="font-semibold">Advertiser Disclosure:</span>{' '}
            {expanded ? (
              <>
                Athena may receive compensation when you apply for credit cards
                through our links. This compensation may impact which products
                we recommend and where they appear, but it does not affect our
                editorial opinions or the order of recommendations based on your
                personal spending profile. Our recommendations are calculated using
                your actual spending data to find the best rewards for your situation.
                Athena is not a financial advisor. Card offers and terms are subject
                to change. Please review the issuer's terms before applying.
              </>
            ) : (
              <>
                We may earn a commission if you apply through our links.
                This doesn't affect our recommendations or your rates.
              </>
            )}
          </p>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-amber-700 font-medium mt-1 hover:text-amber-800"
          >
            {expanded ? 'Show less' : 'Learn more'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// CREDIT CARD RECOMMENDATION CARD
// ============================================
interface RecommendationCardProps {
  recommendation: CardRecommendation;
  rank: number;
  onApply: (card: CreditCardType) => void;
}

function RecommendationCard({ recommendation, rank, onApply }: RecommendationCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { card, matchScore, estimatedAnnualRewards, estimatedFirstYearValue, matchReasons } =
    recommendation;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50';
    if (score >= 60) return 'text-green-600 bg-green-50';
    return 'text-amber-600 bg-amber-50';
  };

  const getNetworkLogo = (network: string) => {
    const colors: Record<string, string> = {
      visa: 'bg-green-800',
      mastercard: 'bg-gradient-to-r from-red-500 to-yellow-500',
      amex: 'bg-stone-600',
      discover: 'bg-orange-500',
    };
    return colors[network] || 'bg-gray-500';
  };

  return (
    <div className="bg-white rounded-2xl border border-surface-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Top badge for #1 recommendation */}
      {rank === 1 && (
        <div className="bg-gradient-to-r from-green-700 to-green-900 text-white px-4 py-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-semibold">Best Match for You</span>
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          {/* Card visual */}
          <div
            className={`w-20 h-12 rounded-lg ${getNetworkLogo(card.network)} flex items-center justify-center text-white shadow-lg`}
          >
            <CreditCard className="w-8 h-8" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-surface-900 text-lg">{card.name}</h3>
                <p className="text-surface-500 text-sm">{card.issuer}</p>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(matchScore)}`}
              >
                {matchScore}% match
              </div>
            </div>
          </div>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-surface-100">
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-600">
              ${estimatedAnnualRewards}
            </p>
            <p className="text-xs text-surface-500 mt-0.5">Est. Annual Rewards</p>
          </div>
          <div className="text-center border-x border-surface-100">
            <p className="text-2xl font-bold text-athena-600">
              ${estimatedFirstYearValue}
            </p>
            <p className="text-xs text-surface-500 mt-0.5">First Year Value</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-surface-800">
              {card.annualFee === 0 ? '$0' : `$${card.annualFee}`}
            </p>
            <p className="text-xs text-surface-500 mt-0.5">Annual Fee</p>
          </div>
        </div>

        {/* Match reasons */}
        <div className="mt-5 space-y-2">
          {matchReasons.slice(0, expanded ? undefined : 2).map((reason, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-surface-700">{reason}</span>
            </div>
          ))}
        </div>

        {/* Expandable details */}
        {expanded && (
          <div className="mt-5 pt-5 border-t border-surface-100 space-y-4">
            {/* Bonus categories */}
            {card.bonusCategories.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-surface-700 mb-2">
                  Bonus Categories
                </h4>
                <div className="flex flex-wrap gap-2">
                  {card.bonusCategories.map((bc, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-athena-50 text-athena-700 text-xs font-medium rounded-full"
                    >
                      {bc.rate}% {bc.category.replace('_', ' ')}
                      {bc.isRotating && ' (rotating)'}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Sign-up bonus */}
            {card.signUpBonus && (
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                <Gift className="w-5 h-5 text-green-700 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-green-800">
                    Sign-up Bonus: {card.rewardType === 'points' || card.rewardType === 'miles'
                      ? `${card.signUpBonus.amount.toLocaleString()} ${card.rewardType}`
                      : `$${card.signUpBonus.amount}`}
                  </p>
                  <p className="text-xs text-green-700 mt-0.5">
                    Spend ${card.signUpBonus.spendRequired.toLocaleString()} in{' '}
                    {card.signUpBonus.timeframeDays} days
                  </p>
                </div>
              </div>
            )}

            {/* Benefits */}
            <div>
              <h4 className="text-sm font-semibold text-surface-700 mb-2">Key Benefits</h4>
              <ul className="space-y-1.5">
                {card.benefits.slice(0, 4).map((benefit, idx) => (
                  <li key={idx} className="text-sm text-surface-600 flex items-start gap-2">
                    <span className="text-athena-500 mt-1">•</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-5 flex items-center gap-3">
          <button
            onClick={() => onApply(card)}
            className="flex-1 py-3 px-4 bg-athena-600 text-white font-semibold rounded-xl hover:bg-athena-700 transition-colors flex items-center justify-center gap-2"
          >
            Apply Now
            <ExternalLink className="w-4 h-4" />
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="py-3 px-4 bg-surface-100 text-surface-700 font-medium rounded-xl hover:bg-surface-200 transition-colors"
          >
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// SPENDING PROFILE SUMMARY
// ============================================
function SpendingProfileCard() {
  const totalMonthly = mockCreditProfile.monthlySpending.reduce(
    (sum, s) => sum + s.amount,
    0
  );

  return (
    <div className="bg-white rounded-2xl border border-surface-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-athena-100 rounded-xl">
          <TrendingUp className="w-5 h-5 text-athena-600" />
        </div>
        <div>
          <h3 className="font-semibold text-surface-900">Your Spending Profile</h3>
          <p className="text-sm text-surface-500">Based on your transactions</p>
        </div>
      </div>

      <div className="space-y-3">
        {mockCreditProfile.monthlySpending
          .sort((a, b) => b.amount - a.amount)
          .slice(0, 5)
          .map((spending) => (
            <div key={spending.category} className="flex items-center justify-between">
              <span className="text-sm text-surface-700 capitalize">
                {spending.category.replace('_', ' ')}
              </span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-surface-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-athena-500 rounded-full"
                    style={{ width: `${(spending.amount / totalMonthly) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-surface-900 w-16 text-right">
                  ${spending.amount}
                </span>
              </div>
            </div>
          ))}
      </div>

      <div className="mt-4 pt-4 border-t border-surface-100 flex items-center justify-between">
        <span className="text-sm font-medium text-surface-700">Total Monthly</span>
        <span className="text-lg font-bold text-surface-900">
          ${totalMonthly.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

// ============================================
// CREDIT SCORE CARD
// ============================================
function CreditScoreCard() {
  const scoreColors: Record<string, { bg: string; text: string; label: string }> = {
    excellent: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Excellent' },
    good: { bg: 'bg-green-100', text: 'text-green-700', label: 'Good' },
    fair: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Fair' },
    building: { bg: 'bg-stone-100', text: 'text-stone-700', label: 'Building' },
  };

  const colors = scoreColors[mockCreditProfile.creditScoreRange];

  return (
    <div className="bg-white rounded-2xl border border-surface-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-emerald-100 rounded-xl">
          <Shield className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <h3 className="font-semibold text-surface-900">Credit Score</h3>
          <p className="text-sm text-surface-500">Your estimated range</p>
        </div>
      </div>

      <div className="text-center py-4">
        {mockCreditProfile.creditScore && (
          <p className="text-4xl font-bold text-surface-900">
            {mockCreditProfile.creditScore}
          </p>
        )}
        <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text}`}>
          {colors.label}
        </span>
      </div>

      <div className="mt-4 pt-4 border-t border-surface-100">
        <p className="text-sm text-surface-600 text-center">
          You qualify for most premium rewards cards
        </p>
      </div>
    </div>
  );
}

// ============================================
// FILTER TABS
// ============================================
type CardFilter = 'all' | 'cashback' | 'travel' | 'no-fee' | 'building';

interface FilterTabsProps {
  active: CardFilter;
  onChange: (filter: CardFilter) => void;
}

function FilterTabs({ active, onChange }: FilterTabsProps) {
  const tabs: { id: CardFilter; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Cards', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'cashback', label: 'Cash Back', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'travel', label: 'Travel', icon: <Plane className="w-4 h-4" /> },
    { id: 'no-fee', label: 'No Annual Fee', icon: <Star className="w-4 h-4" /> },
    { id: 'building', label: 'Build Credit', icon: <TrendingUp className="w-4 h-4" /> },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
            active === tab.id
              ? 'bg-athena-600 text-white'
              : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function CreditCards() {
  const [filter, setFilter] = useState<CardFilter>('all');

  // Filter recommendations
  const filteredRecommendations = mockRecommendations.filter((rec) => {
    switch (filter) {
      case 'cashback':
        return rec.card.rewardType === 'cashback';
      case 'travel':
        return rec.card.rewardType === 'points' || rec.card.rewardType === 'miles';
      case 'no-fee':
        return rec.card.annualFee === 0;
      case 'building':
        return rec.card.creditScoreRequired === 'building' || rec.card.creditScoreRequired === 'fair';
      default:
        return true;
    }
  });

  const handleApply = (card: CreditCardType) => {
    // Track click for affiliate analytics
    console.log('Card application clicked:', {
      cardId: card.id,
      cardName: card.name,
      affiliateNetwork: card.affiliateNetwork,
      timestamp: new Date().toISOString(),
    });

    // Open affiliate link in new tab
    window.open(card.affiliateLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Credit Card Recommendations</h1>
        <p className="text-surface-500 text-sm mt-1">
          Personalized picks based on your spending habits
        </p>
      </div>

      {/* Affiliate disclosure */}
      <AffiliateDisclosure />

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Recommendations */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filter tabs */}
          <FilterTabs active={filter} onChange={setFilter} />

          {/* Card list */}
          <div className="space-y-4">
            {filteredRecommendations.slice(0, 6).map((rec, idx) => (
              <RecommendationCard
                key={rec.card.id}
                recommendation={rec}
                rank={idx + 1}
                onApply={handleApply}
              />
            ))}
          </div>

          {filteredRecommendations.length === 0 && (
            <div className="text-center py-12 bg-surface-50 rounded-2xl">
              <CreditCard className="w-12 h-12 text-surface-300 mx-auto mb-3" />
              <p className="text-surface-600 font-medium">No cards match this filter</p>
              <p className="text-surface-400 text-sm mt-1">Try a different category</p>
            </div>
          )}
        </div>

        {/* Right column - Sidebar */}
        <div className="space-y-6">
          <SpendingProfileCard />
          <CreditScoreCard />

          {/* Quick stats */}
          <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-2xl p-6 text-white">
            <h3 className="font-semibold mb-4">Potential Rewards</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/80">Best card annual rewards</span>
                <span className="font-bold">
                  ${filteredRecommendations[0]?.estimatedAnnualRewards || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">First year value</span>
                <span className="font-bold">
                  ${filteredRecommendations[0]?.estimatedFirstYearValue || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">vs your current card</span>
                <span className="font-bold text-emerald-300">
                  +${filteredRecommendations[0]?.additionalAnnualValue || 0}/yr
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
