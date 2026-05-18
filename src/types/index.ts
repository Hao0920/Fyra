export type TransactionType = 'expense' | 'income' | 'transfer';
export type AccountType = 'cash' | 'debit' | 'credit' | 'ewallet' | 'investment' | 'receivable' | 'payable';
export type TransactionStatus = 'cleared' | 'pending' | 'refunded';
export type RecurrenceRule = 'daily' | 'weekly' | 'monthly' | 'yearly';
export type BudgetPeriod = 'monthly' | 'yearly' | 'custom';

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  currency: string;
  balance: number;
  icon?: string;
  color?: string;
  note?: string;
  creditLimit?: number;
  billingDay?: number;
  repaymentDay?: number;
  counterparty?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'expense' | 'income';
  icon?: string;
  color?: string;
  parentId?: string;
  order: number;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  color: string;
  budget?: number;
  startDate: string;
  endDate?: string;
  note?: string;
  createdAt: string;
}

export interface Tag {
  id: string;
  name: string;
  color?: string;
  createdAt: string;
}

export interface SplitItem {
  categoryId: string;
  amount: number;
  note?: string;
}

export interface Installment {
  total: number;
  current: number;
  parentId: string;
}

export interface Recurrence {
  rule: RecurrenceRule;
  interval: number;
  endDate?: string;
  count?: number;
}

export interface Transaction {
  id: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  originalAmount?: number;
  originalCurrency?: string;
  exchangeRate?: number;
  accountId: string;
  toAccountId?: string;
  categoryId: string;
  subCategoryId?: string;
  projectId?: string;
  tags: string[];
  discount?: number;
  fee?: number;
  splits?: SplitItem[];
  installment?: Installment;
  recurrence?: Recurrence;
  isTemplate?: boolean;
  refundToId?: string;
  note: string;
  attachments?: string[];
  location?: { lat: number; lng: number; name?: string };
  reconciled?: boolean;
}

export interface Budget {
  id: string;
  name?: string;
  projectId?: string;
  categoryId?: string;
  subCategoryId?: string;
  amount: number;
  period: BudgetPeriod;
  periodStart?: string;
  periodEnd?: string;
  rollover: boolean;
  alertThreshold: number;
  createdAt: string;
}

export interface ExchangeRateCache {
  base: string;
  rates: Record<string, number>;
  timestamp: number;
}

export interface UserSettings {
  id: number;
  defaultCurrency: string;
  theme: 'light' | 'dark' | 'system';
  language: 'zh-CN' | 'zh-TW' | 'en';
  weekStartsOn: 0 | 1;
  numberFormat: 'comma' | 'space';
  dateFormat: string;
  githubToken?: string;
  githubRepo?: string;
  githubBranch?: string;
  githubOwner?: string;
  encryptData: boolean;
  encryptPassword?: string;
  lastSyncAt?: string;
}

export type SyncStatus = 'idle' | 'syncing' | 'success' | 'error' | 'conflict';

export interface SyncState {
  status: SyncStatus;
  lastSync: string | null;
  error: string | null;
  pendingChanges: number;
}

export interface SyncConfig {
  token: string;
  owner: string;
  repo: string;
  branch: string;
  encrypt: boolean;
  password?: string;
}
