import { create } from 'zustand';
import { db } from '@/lib/db';
import { generateId, nowISO } from '@/lib/utils';
import type { Account, AccountType } from '@/types';

interface AccountState {
  accounts: Account[];
  load: () => Promise<void>;
  add: (data: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  update: (id: string, data: Partial<Account>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  getById: (id: string) => Account | undefined;
  getByType: (type: AccountType) => Account[];
}

export const useAccountStore = create<AccountState>((set, get) => ({
  accounts: [],

  load: async () => {
    const list = await db.accounts.toArray();
    set({ accounts: list.sort((a, b) => a.type.localeCompare(b.type)) });
  },

  add: async (data) => {
    const account: Account = {
      ...data,
      id: generateId(),
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };
    await db.accounts.add(account);
    get().load();
  },

  update: async (id, data) => {
    await db.accounts.update(id, { ...data, updatedAt: nowISO() });
    get().load();
  },

  remove: async (id) => {
    const count = await db.transactions.where('accountId').equals(id).count();
    if (count > 0) {
      throw new Error('该账户下存在交易记录，无法删除');
    }
    await db.accounts.delete(id);
    get().load();
  },

  getById: (id) => get().accounts.find(a => a.id === id),
  getByType: (type) => get().accounts.filter(a => a.type === type),
}));
