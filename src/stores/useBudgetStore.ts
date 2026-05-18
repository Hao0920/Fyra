import { create } from 'zustand';
import { db } from '@/lib/db';
import { generateId, nowISO, getMonthRange } from '@/lib/utils';
import type { Budget } from '@/types';

interface BudgetState {
  budgets: Budget[];
  load: () => Promise<void>;
  add: (data: Omit<Budget, 'id' | 'createdAt'>) => Promise<void>;
  update: (id: string, data: Partial<Budget>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  getProgress: (budgetId: string, date?: Date) => Promise<{ spent: number; progress: number; remaining: number }>;
}

export const useBudgetStore = create<BudgetState>((set, get) => ({
  budgets: [],

  load: async () => {
    const list = await db.budgets.toArray();
    set({ budgets: list });
  },

  add: async (data) => {
    const budget: Budget = {
      ...data,
      id: generateId(),
      createdAt: nowISO(),
    };
    await db.budgets.add(budget);
    get().load();
  },

  update: async (id, data) => {
    await db.budgets.update(id, data);
    get().load();
  },

  remove: async (id) => {
    await db.budgets.delete(id);
    get().load();
  },

  getProgress: async (budgetId, date = new Date()) => {
    const budget = await db.budgets.get(budgetId);
    if (!budget) return { spent: 0, progress: 0, remaining: 0 };

    let range: [Date, Date];
    if (budget.period === 'monthly') {
      range = getMonthRange(date);
    } else if (budget.period === 'yearly') {
      range = [new Date(date.getFullYear(), 0, 1), new Date(date.getFullYear(), 11, 31, 23, 59, 59)];
    } else {
      range = [new Date(budget.periodStart || date), new Date(budget.periodEnd || date)];
    }

    const txs = await db.transactions
      .where('date')
      .between(range[0].toISOString(), range[1].toISOString())
      .and(t => {
        if (t.type !== 'expense' || t.status === 'refunded') return false;
        if (budget.projectId && t.projectId !== budget.projectId) return false;
        if (budget.categoryId && t.categoryId !== budget.categoryId) return false;
        if (budget.subCategoryId && t.subCategoryId !== budget.subCategoryId) return false;
        return true;
      })
      .toArray();

    const spent = txs.reduce((sum, t) => {
      if (t.splits) {
        return sum + t.splits
          .filter(s => !budget.subCategoryId || s.categoryId === budget.subCategoryId)
          .reduce((s, sp) => s + sp.amount, 0);
      }
      return sum + t.amount;
    }, 0);

    return {
      spent,
      progress: budget.amount > 0 ? Math.min(spent / budget.amount, 1) : 0,
      remaining: Math.max(budget.amount - spent, 0),
    };
  },
}));
