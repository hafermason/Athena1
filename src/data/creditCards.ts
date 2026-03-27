import type { CreditCard, CardRecommendation, CreditProfile } from '../types';

// ============================================
// CREDIT CARD DATABASE
// ============================================
// Note: In production, these would come from your backend
// Affiliate links are placeholders - replace with real links from your affiliate networks

export const creditCards: CreditCard[] = [
  // ============ CASHBACK CARDS ============
  {
    id: 'chase-freedom-unlimited',
    name: 'Chase Freedom Unlimited®',
    issuer: 'Chase',
    network: 'visa',
    annualFee: 0,
    foreignTransactionFee: 3,
    rewardType: 'cashback',
    baseRewardRate: 1.5,
    bonusCategories: [
      { category: 'dining', rate: 3, limit: undefined },
      { category: 'drugstores', rate: 3, limit: undefined },
      { category: 'travel', rate: 5, limit: undefined }, // via Chase portal
    ],
    signUpBonus: {
      amount: 200,
      spendRequired: 500,
      timeframeDays: 90,
      estimatedValue: 200,
    },
    benefits: [
      '0% intro APR for 15 months on purchases',
      'No annual fee',
      'Purchase protection',
      'Extended warranty',
    ],
    creditScoreRequired: 'good',
    affiliateLink: 'https://www.flexoffers.com/chase-freedom-unlimited',
    affiliateNetwork: 'flexoffers',
  },
  {
    id: 'chase-freedom-flex',
    name: 'Chase Freedom Flex®',
    issuer: 'Chase',
    network: 'mastercard',
    annualFee: 0,
    foreignTransactionFee: 3,
    rewardType: 'cashback',
    baseRewardRate: 1,
    bonusCategories: [
      { category: 'dining', rate: 3, limit: undefined },
      { category: 'drugstores', rate: 3, limit: undefined },
      { category: 'travel', rate: 5, limit: undefined },
      { category: 'groceries', rate: 5, limit: 1500, isRotating: true }, // Q1 example
    ],
    signUpBonus: {
      amount: 200,
      spendRequired: 500,
      timeframeDays: 90,
      estimatedValue: 200,
    },
    benefits: [
      '5% on rotating quarterly categories (up to $1,500)',
      'Cell phone protection',
      'Trip cancellation insurance',
      'No annual fee',
    ],
    creditScoreRequired: 'good',
    affiliateLink: 'https://www.flexoffers.com/chase-freedom-flex',
    affiliateNetwork: 'flexoffers',
  },
  {
    id: 'citi-double-cash',
    name: 'Citi Double Cash® Card',
    issuer: 'Citi',
    network: 'mastercard',
    annualFee: 0,
    foreignTransactionFee: 3,
    rewardType: 'cashback',
    baseRewardRate: 2, // 1% when you buy + 1% when you pay
    bonusCategories: [],
    benefits: [
      '2% on everything (1% + 1%)',
      'No annual fee',
      'No rotating categories to track',
      'Simple flat-rate rewards',
    ],
    creditScoreRequired: 'good',
    affiliateLink: 'https://www.cj.com/citi-double-cash',
    affiliateNetwork: 'cj',
  },
  {
    id: 'amex-blue-cash-everyday',
    name: 'Blue Cash Everyday® Card',
    issuer: 'American Express',
    network: 'amex',
    annualFee: 0,
    foreignTransactionFee: 2.7,
    rewardType: 'cashback',
    baseRewardRate: 1,
    bonusCategories: [
      { category: 'groceries', rate: 3, limit: 6000 },
      { category: 'gas', rate: 3, limit: 6000 },
      { category: 'online_shopping', rate: 3, limit: 6000 },
    ],
    signUpBonus: {
      amount: 200,
      spendRequired: 2000,
      timeframeDays: 180,
      estimatedValue: 200,
    },
    benefits: [
      '3% at U.S. supermarkets (up to $6,000/year)',
      '3% at U.S. gas stations',
      '3% on U.S. online retail purchases',
      'No annual fee',
    ],
    creditScoreRequired: 'good',
    affiliateLink: 'https://www.cj.com/amex-blue-cash-everyday',
    affiliateNetwork: 'cj',
  },
  {
    id: 'amex-blue-cash-preferred',
    name: 'Blue Cash Preferred® Card',
    issuer: 'American Express',
    network: 'amex',
    annualFee: 95,
    foreignTransactionFee: 2.7,
    rewardType: 'cashback',
    baseRewardRate: 1,
    bonusCategories: [
      { category: 'groceries', rate: 6, limit: 6000 },
      { category: 'streaming', rate: 6, limit: undefined },
      { category: 'gas', rate: 3, limit: undefined },
      { category: 'travel', rate: 3, limit: undefined },
    ],
    signUpBonus: {
      amount: 350,
      spendRequired: 3000,
      timeframeDays: 180,
      estimatedValue: 350,
    },
    benefits: [
      '6% at U.S. supermarkets (up to $6,000/year)',
      '6% on select U.S. streaming subscriptions',
      '3% at U.S. gas stations',
      '3% on transit',
      '$84/year Equinox+ credit',
    ],
    creditScoreRequired: 'good',
    affiliateLink: 'https://www.cj.com/amex-blue-cash-preferred',
    affiliateNetwork: 'cj',
  },
  {
    id: 'discover-it-cash-back',
    name: 'Discover it® Cash Back',
    issuer: 'Discover',
    network: 'discover',
    annualFee: 0,
    foreignTransactionFee: 0,
    rewardType: 'cashback',
    baseRewardRate: 1,
    bonusCategories: [
      { category: 'groceries', rate: 5, limit: 1500, isRotating: true },
      { category: 'gas', rate: 5, limit: 1500, isRotating: true },
      { category: 'dining', rate: 5, limit: 1500, isRotating: true },
    ],
    signUpBonus: {
      amount: 0,
      spendRequired: 0,
      timeframeDays: 0,
      estimatedValue: 150, // Cashback Match doubles first year
    },
    benefits: [
      '5% on rotating quarterly categories',
      'Cashback Match: Discover matches all cash back first year',
      'No annual fee',
      'No foreign transaction fees',
      'Good for building credit',
    ],
    creditScoreRequired: 'fair',
    affiliateLink: 'https://www.flexoffers.com/discover-it',
    affiliateNetwork: 'flexoffers',
  },
  {
    id: 'capital-one-savor-one',
    name: 'Capital One SavorOne',
    issuer: 'Capital One',
    network: 'mastercard',
    annualFee: 0,
    foreignTransactionFee: 0,
    rewardType: 'cashback',
    baseRewardRate: 1,
    bonusCategories: [
      { category: 'dining', rate: 3, limit: undefined },
      { category: 'streaming', rate: 3, limit: undefined },
      { category: 'groceries', rate: 3, limit: undefined },
    ],
    signUpBonus: {
      amount: 200,
      spendRequired: 500,
      timeframeDays: 90,
      estimatedValue: 200,
    },
    benefits: [
      '3% on dining and entertainment',
      '3% at grocery stores',
      '3% on streaming services',
      'No foreign transaction fees',
      'No annual fee',
    ],
    creditScoreRequired: 'good',
    affiliateLink: 'https://www.impact.com/capital-one-savorone',
    affiliateNetwork: 'impact',
  },

  // ============ TRAVEL CARDS ============
  {
    id: 'chase-sapphire-preferred',
    name: 'Chase Sapphire Preferred®',
    issuer: 'Chase',
    network: 'visa',
    annualFee: 95,
    foreignTransactionFee: 0,
    rewardType: 'points',
    baseRewardRate: 1,
    bonusCategories: [
      { category: 'travel', rate: 5, limit: undefined }, // via Chase portal
      { category: 'dining', rate: 3, limit: undefined },
      { category: 'online_shopping', rate: 3, limit: undefined }, // select merchants
      { category: 'streaming', rate: 3, limit: undefined },
    ],
    signUpBonus: {
      amount: 60000,
      spendRequired: 4000,
      timeframeDays: 90,
      estimatedValue: 750, // ~1.25 cpp
    },
    benefits: [
      '5x on travel through Chase',
      '3x on dining',
      '25% more value when redeeming for travel',
      '$50 annual hotel credit',
      'Primary car rental insurance',
      'Trip cancellation/interruption insurance',
    ],
    creditScoreRequired: 'good',
    affiliateLink: 'https://www.bankratecreditcards.com/chase-sapphire-preferred',
    affiliateNetwork: 'bankrate',
  },
  {
    id: 'capital-one-venture',
    name: 'Capital One Venture Rewards',
    issuer: 'Capital One',
    network: 'visa',
    annualFee: 95,
    foreignTransactionFee: 0,
    rewardType: 'miles',
    baseRewardRate: 2,
    bonusCategories: [
      { category: 'travel', rate: 5, limit: undefined }, // via Capital One Travel
    ],
    signUpBonus: {
      amount: 75000,
      spendRequired: 4000,
      timeframeDays: 90,
      estimatedValue: 750,
    },
    benefits: [
      '2x miles on every purchase',
      '5x miles on hotels/rentals via Capital One Travel',
      'Transfer partners for flights',
      'Global Entry/TSA PreCheck credit',
      'No foreign transaction fees',
    ],
    creditScoreRequired: 'good',
    affiliateLink: 'https://www.impact.com/capital-one-venture',
    affiliateNetwork: 'impact',
  },

  // ============ PREMIUM CARDS ============
  {
    id: 'amex-gold',
    name: 'American Express® Gold Card',
    issuer: 'American Express',
    network: 'amex',
    annualFee: 250,
    foreignTransactionFee: 0,
    rewardType: 'points',
    baseRewardRate: 1,
    bonusCategories: [
      { category: 'dining', rate: 4, limit: undefined },
      { category: 'groceries', rate: 4, limit: 25000 },
      { category: 'travel', rate: 3, limit: undefined }, // flights booked directly
    ],
    signUpBonus: {
      amount: 60000,
      spendRequired: 6000,
      timeframeDays: 180,
      estimatedValue: 1200, // ~2 cpp transfer value
    },
    benefits: [
      '4x on restaurants worldwide',
      '4x at U.S. supermarkets (up to $25K)',
      '$120 annual dining credit (Grubhub, etc.)',
      '$120 annual Uber Cash',
      'No foreign transaction fees',
    ],
    creditScoreRequired: 'excellent',
    affiliateLink: 'https://www.cj.com/amex-gold',
    affiliateNetwork: 'cj',
  },
  {
    id: 'chase-sapphire-reserve',
    name: 'Chase Sapphire Reserve®',
    issuer: 'Chase',
    network: 'visa',
    annualFee: 550,
    foreignTransactionFee: 0,
    rewardType: 'points',
    baseRewardRate: 1,
    bonusCategories: [
      { category: 'travel', rate: 10, limit: undefined }, // via Chase portal
      { category: 'dining', rate: 3, limit: undefined },
    ],
    signUpBonus: {
      amount: 60000,
      spendRequired: 4000,
      timeframeDays: 90,
      estimatedValue: 900,
    },
    benefits: [
      '10x on hotels & car rentals via Chase',
      '3x on dining & travel',
      '$300 annual travel credit',
      'Priority Pass lounge access',
      'Global Entry/TSA PreCheck credit',
      '50% more value on travel redemptions',
    ],
    creditScoreRequired: 'excellent',
    affiliateLink: 'https://www.bankratecreditcards.com/chase-sapphire-reserve',
    affiliateNetwork: 'bankrate',
  },

  // ============ CREDIT BUILDING ============
  {
    id: 'discover-it-secured',
    name: 'Discover it® Secured',
    issuer: 'Discover',
    network: 'discover',
    annualFee: 0,
    foreignTransactionFee: 0,
    rewardType: 'cashback',
    baseRewardRate: 1,
    bonusCategories: [
      { category: 'gas', rate: 2, limit: 1000 },
      { category: 'dining', rate: 2, limit: 1000 },
    ],
    benefits: [
      'Build credit with responsible use',
      '2% at gas stations and restaurants (up to $1,000/quarter)',
      'Cashback Match first year',
      'No annual fee',
      'Free FICO score',
      'Automatic reviews for upgrade to unsecured',
    ],
    creditScoreRequired: 'building',
    affiliateLink: 'https://www.flexoffers.com/discover-it-secured',
    affiliateNetwork: 'flexoffers',
  },
  {
    id: 'capital-one-quicksilver-secured',
    name: 'Capital One Quicksilver Secured',
    issuer: 'Capital One',
    network: 'mastercard',
    annualFee: 0,
    foreignTransactionFee: 0,
    rewardType: 'cashback',
    baseRewardRate: 1.5,
    bonusCategories: [],
    benefits: [
      '1.5% unlimited cash back',
      'Build credit with responsible use',
      'No annual fee',
      'Automatic credit line reviews',
    ],
    creditScoreRequired: 'building',
    affiliateLink: 'https://www.impact.com/capital-one-quicksilver-secured',
    affiliateNetwork: 'impact',
  },
];

// ============================================
// USER'S CURRENT CARDS (Mock)
// ============================================
export const userCurrentCards = [
  {
    cardId: 'generic-cashback',
    name: 'Generic Bank Cashback',
    issuer: 'Local Bank',
    baseRewardRate: 1,
    annualFee: 0,
  },
];

// ============================================
// USER'S CREDIT PROFILE (Mock)
// ============================================
export const mockCreditProfile: CreditProfile = {
  creditScoreRange: 'good',
  creditScore: 720,
  creditGoals: ['maximize_cashback', 'travel_rewards'],
  prefersNoAnnualFee: false,
  maxAcceptableAnnualFee: 100,
  monthlySpending: [
    { category: 'groceries', amount: 650 },
    { category: 'dining', amount: 400 },
    { category: 'gas', amount: 200 },
    { category: 'online_shopping', amount: 350 },
    { category: 'streaming', amount: 50 },
    { category: 'travel', amount: 150 },
    { category: 'general', amount: 500 },
  ],
};

// ============================================
// RECOMMENDATION ENGINE (Simplified)
// ============================================
export function generateRecommendations(
  profile: CreditProfile,
  cards: CreditCard[] = creditCards
): CardRecommendation[] {
  const recommendations: CardRecommendation[] = [];

  for (const card of cards) {
    // Skip cards user doesn't qualify for
    const scoreOrder = ['building', 'fair', 'good', 'excellent'];
    const userScoreIndex = scoreOrder.indexOf(profile.creditScoreRange);
    const cardScoreIndex = scoreOrder.indexOf(card.creditScoreRequired);
    if (userScoreIndex < cardScoreIndex) continue;

    // Skip if annual fee exceeds preference
    if (profile.prefersNoAnnualFee && card.annualFee > 0) continue;
    if (profile.maxAcceptableAnnualFee && card.annualFee > profile.maxAcceptableAnnualFee) continue;

    // Calculate estimated annual rewards
    let annualRewards = 0;
    const matchReasons: string[] = [];

    for (const spending of profile.monthlySpending) {
      const bonusCategory = card.bonusCategories.find(
        (bc) => bc.category === spending.category
      );

      const rate = bonusCategory ? bonusCategory.rate : card.baseRewardRate;
      const monthlyReward = (spending.amount * rate) / 100;
      annualRewards += monthlyReward * 12;

      if (bonusCategory && spending.amount > 100) {
        matchReasons.push(
          `${bonusCategory.rate}% back on your $${spending.amount}/mo ${spending.category}`
        );
      }
    }

    // Add sign-up bonus value
    const firstYearValue = annualRewards + (card.signUpBonus?.estimatedValue || 0);

    // Calculate match score (0-100)
    let matchScore = 50; // Base score
    matchScore += Math.min(annualRewards / 20, 25); // Up to 25 points for rewards
    if (card.annualFee === 0) matchScore += 10;
    if (card.signUpBonus) matchScore += 10;
    if (matchReasons.length > 2) matchScore += 5;

    // Add key benefits to reasons
    if (card.annualFee === 0) matchReasons.push('No annual fee');
    if (card.signUpBonus) {
      matchReasons.push(
        `$${card.signUpBonus.estimatedValue} sign-up bonus`
      );
    }

    recommendations.push({
      card,
      matchScore: Math.min(Math.round(matchScore), 100),
      estimatedAnnualRewards: Math.round(annualRewards),
      estimatedFirstYearValue: Math.round(firstYearValue),
      matchReasons: matchReasons.slice(0, 4),
      additionalAnnualValue: Math.round(annualRewards - 200), // vs generic 1% card
    });
  }

  // Sort by match score
  return recommendations.sort((a, b) => b.matchScore - a.matchScore);
}

// Pre-computed recommendations for mock user
export const mockRecommendations = generateRecommendations(mockCreditProfile);
