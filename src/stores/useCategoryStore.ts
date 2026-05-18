import { create } from 'zustand';
import { db } from '@/lib/db';
import type { Category } from '@/types';

interface CategoryState {
  categories: Category[];
  load: () => Promise<void>;
  add: (category: Category) => Promise<void>;
  update: (id: string, data: Partial<Category>) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

const DEFAULT_CATEGORIES: Category[] = [
  { id: 'food', name: '餐饮', type: 'expense', icon: '\ud83c\udf54', color: '#ef4444', order: 1 },
  { id: 'transport', name: '交通', type: 'expense', icon: '\ud83d\ude97', color: '#f97316', order: 2 },
  { id: 'shopping', name: '购物', type: 'expense', icon: '\ud83d\udecd\ufe0f', color: '#eab308', order: 3 },
  { id: 'entertainment', name: '娱乐', type: 'expense', icon: '\ud83c\udfae', color: '#22c55e', order: 4 },
  { id: 'housing', name: '居住', type: 'expense', icon: '\ud83c\udfe0', color: '#3b82f6', order: 5 },
  { id: 'medical', name: '医疗', type: 'expense', icon: '\ud83d\udc8a', color: '#8b5cf6', order: 6 },
  { id: 'education', name: '教育', type: 'expense', icon: '\ud83d\udcda', color: '#ec4899', order: 7 },
  { id: 'other-exp', name: '其他', type: 'expense', icon: '\ud83d\udce6', color: '#6b7280', order: 8 },
  { id: 'salary', name: '工资', type: 'income', icon: '\ud83d\udcb0', color: '#22c55e', order: 1 },
  { id: 'bonus', name: '奖金', type: 'income', icon: '\ud83c\udf81', color: '#eab308', order: 2 },
  { id: 'investment', name: '投资', type: 'income', icon: '\ud83d\udcc8', color: '#3b82f6', order: 3 },
  { id: 'other-inc', name: '其他', type: 'income', icon: '\ud83d\udce6', color: '#6b7280', order: 4 },
];

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],

  load: async () => {
    const list = await db.categories.toArray();
    if (list.length === 0) {
      await db.categories.bulkAdd(DEFAULT_CATEGORIES);
      set({ categories: DEFAULT_CATEGORIES });
    } else {
      set({ categories: list.sort((a, b) => a.order - b.order) });
    }
  },

  add: async (category) => {
    await db.categories.add(category);
    await get().load();
  },

  update: async (id, data) => {
    await db.categories.update(id, data);
    await get().load();
  },

  remove: async (id) => {
    await db.categories.delete(id);
    await get().load();
  },
}));
