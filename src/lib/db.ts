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
  settings!: Table<UserSettings, string>;

  constructor() {
    super('FyraDB');
    this.version(2).stores({
      transactions: 'id, date, accountId, categoryId, projectId, type, status, [date+type]',
      accounts: 'id, type, name',
      categories: 'id, type, parentId, [type+parentId], order',
      projects: 'id, startDate',
      tags: 'id, name',
      budgets: 'id, projectId, categoryId',
      exchangeRates: 'base',
      settings: '++id'
    });
  }
}

export const db = new FyraDB();
