import { useEffect, useMemo, useState } from 'react';
import { useTransactionStore } from '@/stores/useTransactionStore';
import { useAccountStore } from '@/stores/useAccountStore';
import { useProjectStore } from '@/stores/useProjectStore';
import { useBudgetStore } from '@/stores/useBudgetStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatCurrency, formatDate, getMonthRange } from '@/lib/utils';
import { ArrowDownLeft, ArrowUpRight, Wallet, Target } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as ReTooltip } from 'recharts';

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899'];

export default function Dashboard() {
  const { transactions, load } = useTransactionStore();
  const { accounts, load: loadAccounts } = useAccountStore();
  const { projects, load: loadProjects } = useProjectStore();
  const { budgets, load: loadBudgets } = useBudgetStore();
  const [monthRange] = useState(() => getMonthRange(new Date()));

  useEffect(() => { load(); loadAccounts(); loadProjects(); loadBudgets(); }, []);

  const monthlyStats = useMemo(() => {
    const [start, end] = monthRange;
    const monthTxs = transactions.filter(t => {
      const d = new Date(t.date);
      return d >= start && d <= end && t.status !== 'refunded';
    });
    const income = monthTxs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = monthTxs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return { income, expense, balance: income - expense };
  }, [transactions, monthRange]);

  const categoryData = useMemo(() => {
    const [start, end] = monthRange;
    const expenses = transactions.filter(t => {
      const d = new Date(t.date);
      return d >= start && d <= end && t.type === 'expense' && t.status !== 'refunded';
    });
    const map = new Map<string, number>();
    expenses.forEach(t => {
      if (t.splits) t.splits.forEach(s => map.set(s.categoryId, (map.get(s.categoryId) || 0) + s.amount));
      else map.set(t.categoryId, (map.get(t.categoryId) || 0) + t.amount);
    });
    return Array.from(map.entries()).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 7);
  }, [transactions, monthRange]);

  const recentTransactions = useMemo(() => transactions.slice(0, 10), [transactions]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Card><CardHeader className="pb-2"><CardTitle className="text-xs font-normal text-muted-foreground flex items-center gap-1"><ArrowDownLeft className="h-3 w-3 text-green-500" />本月收入</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-green-600">{formatCurrency(monthlyStats.income)}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-xs font-normal text-muted-foreground flex items-center gap-1"><ArrowUpRight className="h-3 w-3 text-red-500" />本月支出</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-red-600">{formatCurrency(monthlyStats.expense)}</div></CardContent></Card>
      </div>
      <Card><CardContent className="pt-6"><div className="flex items-center justify-between"><div><p className="text-xs text-muted-foreground">本月结余</p><p className={cn("text-3xl font-bold", monthlyStats.balance >= 0 ? 'text-green-600' : 'text-red-600')}>{monthlyStats.balance >= 0 ? '+' : ''}{formatCurrency(monthlyStats.balance)}</p></div><div className="text-right"><p className="text-xs text-muted-foreground">净资产</p><p className="text-xl font-semibold">{formatCurrency(accounts.reduce((s, a) => s + a.balance, 0))}</p></div></div></CardContent></Card>
      {categoryData.length > 0 && (
        <Card><CardHeader><CardTitle className="text-sm">支出结构</CardTitle></CardHeader><CardContent><div className="h-48"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={categoryData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value">{categoryData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}</Pie><ReTooltip formatter={(value: number) => formatCurrency(value)} /></PieChart></ResponsiveContainer></div><div className="mt-2 space-y-1">{categoryData.map((item, i) => <div key={item.name} className="flex items-center justify-between text-xs"><div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} /><span>{item.name}</span></div><span className="font-medium">{formatCurrency(item.value)}</span></div>)}</div></CardContent></Card>
      )}
      {budgets.length > 0 && (
        <Card><CardHeader><CardTitle className="text-sm flex items-center gap-1"><Target className="h-4 w-4" />预算进度</CardTitle></CardHeader><CardContent className="space-y-3">{budgets.slice(0, 3).map(budget => <BudgetProgressItem key={budget.id} budget={budget} />)}</CardContent></Card>
      )}
      <Card><CardHeader><CardTitle className="text-sm">最近交易</CardTitle></CardHeader><CardContent className="space-y-2">{recentTransactions.map(tx => (
        <div key={tx.id} className="flex items-center justify-between py-2 border-b last:border-0">
          <div className="flex items-center gap-3">
            <div className={cn("flex h-8 w-8 items-center justify-center rounded-full", tx.type === 'income' ? 'bg-green-100 text-green-600' : tx.type === 'expense' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600')}>
              {tx.type === 'income' ? <ArrowDownLeft className="h-4 w-4" /> : tx.type === 'expense' ? <ArrowUpRight className="h-4 w-4" /> : <Wallet className="h-4 w-4" />}
            </div>
            <div><p className="text-sm font-medium">{tx.note || '无备注'}</p><p className="text-xs text-muted-foreground">{formatDate(tx.date)}</p></div>
          </div>
          <span className={cn("text-sm font-semibold", tx.type === 'income' ? 'text-green-600' : tx.type === 'expense' ? 'text-red-600' : 'text-blue-600')}>
            {tx.type === 'income' ? '+' : tx.type === 'expense' ? '-' : ''}{formatCurrency(tx.amount)}
          </span>
        </div>
      ))}</CardContent></Card>
    </div>
  );
}

function BudgetProgressItem({ budget }: { budget: import('@/types').Budget }) {
  const [progress, setProgress] = useState({ spent: 0, progress: 0, remaining: 0 });
  const { getProgress } = useBudgetStore();
  useEffect(() => { getProgress(budget.id).then(setProgress); }, [budget.id]);
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs"><span>{budget.name || '预算'}</span><span className="text-muted-foreground">{formatCurrency(progress.spent)} / {formatCurrency(budget.amount)}</span></div>
      <Progress value={progress.progress * 100} />
      <div className="flex justify-between text-xs text-muted-foreground"><span>剩余 {formatCurrency(progress.remaining)}</span><span>{Math.round(progress.progress * 100)}%</span></div>
    </div>
  );
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
