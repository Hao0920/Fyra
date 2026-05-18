import { create } from 'zustand';
import { db } from '@/lib/db';
import { generateId, nowISO } from '@/lib/utils';
import type { Transaction, SplitItem, Recurrence } from '@/types';

interface TransactionState {
  transactions: Transaction[];
  load: () => Promise<void>;
  add: (tx: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  update: (id: string, data: Partial<Transaction>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  addSplit: (parent: Transaction, splits: SplitItem[]) => Promise<void>;
  addInstallment: (parent: Transaction, totalMonths: number) => Promise<void>;
  addRecurrence: (template: Transaction, rule: Recurrence) => Promise<void>;
  refund: (originalId: string, amount: number) => Promise<void>;
  getById: (id: string) => Transaction | undefined;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],

  load: async () => {
    const txs = await db.transactions.toArray();
    set({ transactions: txs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) });
  },

  add: async (tx) => {
    const now = nowISO();
    const full: Transaction = {
      ...tx,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
    await db.transactions.add(full);
    await updateAccountBalance(full.accountId, full.type === 'income' ? full.amount : -full.amount);
    get().load();
  },

  update: async (id, data) => {
    const old = await db.transactions.get(id);
    if (!old) return;

    await updateAccountBalance(old.accountId, old.type === 'income' ? -old.amount : old.amount);

    await db.transactions.update(id, { ...data, updatedAt: nowISO() });

    const updated = await db.transactions.get(id);
    if (updated) {
      await updateAccountBalance(updated.accountId, updated.type === 'income' ? updated.amount : -updated.amount);
    }
    get().load();
  },

  remove: async (id) => {
    const tx = await db.transactions.get(id);
    if (!tx) return;

    await updateAccountBalance(tx.accountId, tx.type === 'income' ? -tx.amount : tx.amount);
    await db.transactions.delete(id);
    get().load();
  },

  addSplit: async (parent, splits) => {
    const now = nowISO();
    const totalSplit = splits.reduce((s, item) => s + item.amount, 0);

    const parentTx: Transaction = {
      ...parent,
      id: generateId(),
      amount: 0,
      splits,
      createdAt: now,
      updatedAt: now,
    };

    await db.transactions.add(parentTx);
    await updateAccountBalance(parent.accountId, parent.type === 'income' ? totalSplit : -totalSplit);
    get().load();
  },

  addInstallment: async (parent, totalMonths) => {
    const now = nowISO();
    const monthly = Math.round((parent.amount - (parent.discount || 0)) / totalMonths * 100) / 100;
    const list: Transaction[] = [];

    for (let i = 1; i <= totalMonths; i++) {
      const date = new Date(parent.date);
      date.setMonth(date.getMonth() + i);

      list.push({
        ...parent,
        id: generateId(),
        amount: i === totalMonths
          ? parent.amount - monthly * (totalMonths - 1)
          : monthly,
        date: date.toISOString(),
        status: 'pending',
        installment: { total: totalMonths, current: i, parentId: parent.id || generateId() },
        createdAt: now,
        updatedAt: now,
      });
    }

    await db.transactions.bulkAdd(list);
    get().load();
  },

  addRecurrence: async (template, rule) => {
    const now = nowISO();
    const tx: Transaction = {
      ...template,
      id: generateId(),
      isTemplate: true,
      recurrence: rule,
      createdAt: now,
      updatedAt: now,
    };
    await db.transactions.add(tx);
    get().load();
  },

  refund: async (originalId, amount) => {
    const original = await db.transactions.get(originalId);
    if (!original) return;

    const now = nowISO();
    const refundTx: Transaction = {
      id: generateId(),
      date: now,
      createdAt: now,
      updatedAt: now,
      type: original.type === 'expense' ? 'income' : 'expense',
      status: 'cleared',
      amount: Math.min(amount, original.amount),
      accountId: original.accountId,
      categoryId: original.categoryId,
      tags: [...original.tags, '退款'],
      refundToId: originalId,
      note: `退款: ${original.note}`,
    };

    await db.transactions.add(refundTx);
    await db.transactions.update(originalId, { status: 'refunded', updatedAt: now });
    await updateAccountBalance(original.accountId, refundTx.type === 'income' ? refundTx.amount : -refundTx.amount);
    get().load();
  },

  getById: (id) => get().transactions.find(t => t.id === id),
}));

async function updateAccountBalance(accountId: string, delta: number) {
  const account = await db.accounts.get(accountId);
  if (!account) return;
  await db.accounts.update(accountId, {
    balance: Math.round((account.balance + delta) * 100) / 100,
    updatedAt: nowISO(),
  });
}
