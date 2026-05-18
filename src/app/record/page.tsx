'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTransactionStore } from '@/stores/useTransactionStore';
import { useAccountStore } from '@/stores/useAccountStore';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Wallet, Tag, FileText, Calendar, ChevronRight } from 'lucide-react';
import type { TransactionType } from '@/types';

export default function RecordPage() {
  const router = useRouter();
  const addTransaction = useTransactionStore(s => s.add);
  const { accounts } = useAccountStore();
  const { categories } = useCategoryStore();

  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [accountId, setAccountId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [showCategoryPanel, setShowCategoryPanel] = useState(false);
  const [showAccountPanel, setShowAccountPanel] = useState(false);

  const handleNum = useCallback((key: string) => {
    if (key === 'backspace') {
      setAmount(prev => prev.slice(0, -1));
    } else if (key === '.') {
      if (!amount.includes('.')) setAmount(prev => prev + '.');
    } else if (key === 'C') {
      setAmount('');
    } else {
      if (amount.replace('.', '').length >= 9) return;
      const parts = amount.split('.');
      if (parts.length === 2 && parts[1].length >= 2) return;
      setAmount(prev => prev + key);
    }
  }, [amount]);

  const filteredCategories = categories.filter(c => c.type === (type === 'transfer' ? 'expense' : type));
  const selectedCategory = categories.find(c => c.id === categoryId);
  const selectedAccount = accounts.find(a => a.id === accountId);
  const displayAmount = amount || '0';

  const handleSave = () => {
    const numAmount = parseFloat(amount);
    if (!numAmount || !accountId || !categoryId) return;

    addTransaction({
      id: crypto.randomUUID(),
      date: new Date(date).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type,
      status: 'cleared',
      amount: numAmount,
      accountId,
      categoryId,
      tags: [],
      note,
    });

    setAmount('');
    setNote('');
    router.push('/');
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* 顶部栏 */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Tabs value={type} onValueChange={(v) => { setType(v as TransactionType); setCategoryId(''); }}>
          <TabsList className="grid w-48 grid-cols-3">
            <TabsTrigger value="expense" className="text-xs">支出</TabsTrigger>
            <TabsTrigger value="income" className="text-xs">收入</TabsTrigger>
            <TabsTrigger value="transfer" className="text-xs">转账</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="w-10" />
      </div>

      {/* 日期 */}
      <div className="flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <Input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="w-auto border-0 bg-transparent p-0 text-center text-sm"
        />
      </div>

      {/* 金额显示 */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className={`text-6xl font-bold tracking-tight ${
            type === 'income' ? 'text-green-500' : type === 'expense' ? 'text-red-500' : 'text-blue-500'
          }`}>
            {type === 'income' ? '+' : type === 'expense' ? '-' : ''}{displayAmount}
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            {selectedAccount?.name || '选择账户'} · {selectedCategory?.name || '选择分类'}
          </div>
        </div>
      </div>

      {/* 快捷选项 */}
      <div className="px-4 py-3 space-y-3 border-t">
        <button className="flex items-center justify-between w-full py-2" onClick={() => setShowAccountPanel(true)}>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <Wallet className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm">{selectedAccount?.name || '选择账户'}</span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>

        <button className="flex items-center justify-between w-full py-2" onClick={() => setShowCategoryPanel(true)}>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <Tag className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm">{selectedCategory?.name || '选择分类'}</span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
            <FileText className="h-4 w-4 text-primary" />
          </div>
          <Input
            placeholder="添加备注..."
            value={note}
            onChange={e => setNote(e.target.value)}
            className="flex-1 border-0 bg-transparent px-0 text-sm"
          />
        </div>
      </div>

      {/* 数字键盘 */}
      <div className="border-t bg-muted/30">
        <div className="grid grid-cols-4 gap-px bg-border">
          {[
            ['7', '8', '9', 'backspace'],
            ['4', '5', '6', 'C'],
            ['1', '2', '3', '.'],
            ['0', '00', '=', 'save'],
          ].map((row, ri) => (
            <div key={ri} className="contents">
              {row.map((key) => {
                const isAction = ['backspace', 'C', '.', '=', 'save'].includes(key);
                const isSave = key === 'save';
                return (
                  <button
                    key={key}
                    onClick={() => {
                      if (isSave) handleSave();
                      else if (key === '=') return;
                      else handleNum(key);
                    }}
                    className={`h-14 text-lg font-medium flex items-center justify-center active:bg-muted transition-colors ${
                      isSave
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : isAction
                        ? 'bg-muted/50 text-muted-foreground'
                        : 'bg-background hover:bg-muted/50'
                    }`}
                  >
                    {key === 'backspace' ? '⌫' : key === 'save' ? '✓' : key}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* 分类选择面板 */}
      {showCategoryPanel && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={() => setShowCategoryPanel(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-2xl border-t shadow-lg max-h-[70vh] overflow-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-background z-10 px-4 py-3 border-b">
              <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-3" />
              <h3 className="font-semibold">选择分类</h3>
            </div>
            <div className="p-4 grid grid-cols-4 gap-3">
              {filteredCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { setCategoryId(cat.id); setShowCategoryPanel(false); }}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-colors ${
                    categoryId === cat.id ? 'bg-primary/10 ring-2 ring-primary' : 'hover:bg-muted'
                  }`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full text-2xl" style={{ backgroundColor: (cat.color || '#666') + '20', color: cat.color || '#666' }}>
                    {cat.icon || '📦'}
                  </div>
                  <span className="text-xs">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 账户选择面板 */}
      {showAccountPanel && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={() => setShowAccountPanel(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-2xl border-t shadow-lg max-h-[70vh] overflow-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-background z-10 px-4 py-3 border-b">
              <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-3" />
              <h3 className="font-semibold">选择账户</h3>
            </div>
            <div className="p-4 space-y-2">
              {accounts.length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-4">暂无账户，请先添加</p>
              )}
              {accounts.map(acc => (
                <button
                  key={acc.id}
                  onClick={() => { setAccountId(acc.id); setShowAccountPanel(false); }}
                  className={`flex items-center gap-3 w-full p-3 rounded-xl transition-colors ${
                    accountId === acc.id ? 'bg-primary/10 ring-2 ring-primary' : 'hover:bg-muted'
                  }`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full text-xl" style={{ backgroundColor: (acc.color || '#666') + '20' }}>
                    {acc.icon || '💳'}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">{acc.name}</p>
                    <p className="text-xs text-muted-foreground">{acc.type === 'cash' ? '现金' : acc.type === 'debit' ? '借记卡' : acc.type === 'credit' ? '信用卡' : acc.type === 'ewallet' ? '电子钱包' : acc.type}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
