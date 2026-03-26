export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment' | 'loan' | 'mortgage';
  institution: string;
  balance: number;
  lastSynced: string;
  mask: string;
}

export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  category: string;
  accountId: string;
  propertyId?: string;
  pending: boolean;
}

export interface Property {
  id: string;
  address: string;
  nickname: string;
  currentValue: number;
  type: 'primary' | 'rental' | 'commercial';
  monthlyBillsTotal: number;
  imageUrl?: string;
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  estimatedSavings: number;
  source: string;
  type: 'tax' | 'insurance' | 'bills' | 'budget';
  status: 'active' | 'dismissed' | 'completed';
}

export interface SpendingCategory {
  name: string;
  amount: number;
  color: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  notifications: {
    weeklyDigest: boolean;
    billReminders: boolean;
    opportunityAlerts: boolean;
    accountAlerts: boolean;
  };
}
