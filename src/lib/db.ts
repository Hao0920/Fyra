import Dexie, { type Table } from 'dexie';
import type {
  Transaction, Account, Category, Project,
  Tag, Budget, ExchangeRateCache, UserSettings
} from '@/types';

export class FyraDB extends Dexie {
  transactions!: Table<Transaction, string>;
  accounts!: Table<Account, string>;
  categories!: Table<Category, string>;
  projects!: Table<Project, string>;
  tags!: Table<Tag, string>;
  budgets!: Table<Budget, string>;
  exchangeRates!: Table<ExchangeRateCache, string>;
  settings!: Table<UserSettings, number>;

  constructor() {
    super('FyraDB');
    this.version(1).stores({
      transactions: 'id, date, accountId, categoryId, projectId, type, status, [date+type]',
      accounts: 'id, type, name',
      categories: 'id, type, parentId, [type+parentId]',
      projects: 'id, startDate',
      tags: 'id, name',
      budgets: 'id, projectId, categoryId',
      exchangeRates: 'base',
      settings: '++id'
    });
  }
}

export const db = new FyraDB();

export async function initDefaultData() {
  const count = await db.accounts.count();
  if (count > 0) return;

  const now = new Date().toISOString();

  await db.accounts.bulkAdd([
    { id: 'cash', name: '现金', type: 'cash', currency: 'CNY', balance: 0, icon: 'Banknote', color: '#22c55e', createdAt: now, updatedAt: now },
    { id: 'debit', name: '借记卡', type: 'debit', currency: 'CNY', balance: 0, icon: 'CreditCard', color: '#3b82f6', createdAt: now, updatedAt: now },
  ]);

  const expenseCategories = [
    { id: 'food', name: '餐饮', type: 'expense' as const, icon: 'UtensilsCrossed', color: '#ef4444', order: 1, createdAt: now },
    { id: 'transport', name: '交通', type: 'expense' as const, icon: 'Car', color: '#f97316', order: 2, createdAt: now },
    { id: 'shopping', name: '购物', type: 'expense' as const, icon: 'ShoppingBag', color: '#8b5cf6', order: 3, createdAt: now },
    { id: 'housing', name: '居住', type: 'expense' as const, icon: 'Home', color: '#06b6d4', order: 4, createdAt: now },
    { id: 'entertainment', name: '娱乐', type: 'expense' as const, icon: 'Gamepad2', color: '#ec4899', order: 5, createdAt: now },
    { id: 'medical', name: '医疗', type: 'expense' as const, icon: 'Stethoscope', color: '#14b8a6', order: 6, createdAt: now },
    { id: 'education', name: '教育', type: 'expense' as const, icon: 'GraduationCap', color: '#6366f1', order: 7, createdAt: now },
    { id: 'other', name: '其他', type: 'expense' as const, icon: 'MoreHorizontal', color: '#6b7280', order: 99, createdAt: now },
  ];

  const incomeCategories = [
    { id: 'salary', name: '工资', type: 'income' as const, icon: 'Briefcase', color: '#22c55e', order: 1, createdAt: now },
    { id: 'bonus', name: '奖金', type: 'income' as const, icon: 'Gift', color: '#eab308', order: 2, createdAt: now },
    { id: 'investment', name: '理财', type: 'income' as const, icon: 'TrendingUp', color: '#3b82f6', order: 3, createdAt: now },
    { id: 'other-income', name: '其他收入', type: 'income' as const, icon: 'Coins', color: '#6b7280', order: 99, createdAt: now },
  ];

  await db.categories.bulkAdd([...expenseCategories, ...incomeCategories]);

  await db.settings.add({
    id: 1,
    defaultCurrency: 'CNY',
    theme: 'system',
    language: 'zh-CN',
    weekStartsOn: 1,
    numberFormat: 'comma',
    dateFormat: 'YYYY-MM-DD',
    encryptData: false,
  });
}
