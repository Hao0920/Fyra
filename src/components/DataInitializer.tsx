'use client';

import { useEffect } from 'react';
import { useAccountStore } from '@/stores/useAccountStore';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useProjectStore } from '@/stores/useProjectStore';
import { useBudgetStore } from '@/stores/useBudgetStore';
import { useTransactionStore } from '@/stores/useTransactionStore';

export function DataInitializer() {
  const loadAccounts = useAccountStore(s => s.load);
  const loadCategories = useCategoryStore(s => s.load);
  const loadProjects = useProjectStore(s => s.load);
  const loadBudgets = useBudgetStore(s => s.load);
  const loadTransactions = useTransactionStore(s => s.load);

  useEffect(() => {
    loadAccounts();
    loadCategories();
    loadProjects();
    loadBudgets();
    loadTransactions();
  }, []);

  return null;
}
