import type { Account, Project, SummaryMetric, Transaction } from '../types'

export const summaryMetrics: SummaryMetric[] = [
  {
    label: '余额',
    value: '+¥988,537',
    trend: '0.00% (+0)',
    color: 'from-fuchsia-500 to-violet-500',
  },
  {
    label: '支出',
    value: '¥0',
    trend: '0.00% (+0)',
    color: 'from-rose-500 to-red-500',
  },
  {
    label: '收入',
    value: '¥0',
    trend: '0.00% (+0)',
    color: 'from-emerald-500 to-lime-500',
  },
]

export const accounts: Account[] = [
  { id: 'a1', name: '钱包 0920', balance: 10589.84, currency: 'CNY', status: '现金' },
  { id: 'a2', name: '招商银行 0146', balance: 1562.85, currency: 'CNY', status: '银行' },
  { id: 'a3', name: '工商银行 8424', balance: 0.0, currency: 'CNY', status: '银行' },
]

export const projects: Project[] = [
  { id: 'p1', name: '生活', status: '进行中', amount: '¥0.00', date: '26/05/01 – 26/05/31' },
  { id: 'p2', name: '工作', status: '进行中', amount: '¥0.00', date: '26/05/01 – 26/05/31' },
  { id: 'p3', name: '旅游', status: '进行中', amount: '¥0.00', date: '26/05/06 – 26/05/31' },
]

export const transactions: Transaction[] = [
  {
    id: 't1',
    date: '5月18日',
    description: '星巴克',
    category: '餐饮',
    account: '钱包 0920',
    amount: -12.8,
    type: 'expense',
    tags: ['咖啡', '午后'],
  },
  {
    id: 't2',
    date: '5月17日',
    description: 'Apple Store',
    category: '购物',
    account: '招商银行 0146',
    amount: -299.0,
    type: 'expense',
    tags: ['电子', '配件'],
  },
  {
    id: 't3',
    date: '5月16日',
    description: '工资',
    category: '收入',
    account: '钱包 0920',
    amount: 6200.0,
    type: 'income',
    tags: ['薪资'],
  },
  {
    id: 't4',
    date: '5月15日',
    description: '地铁票',
    category: '交通',
    account: '钱包 0920',
    amount: -4.9,
    type: 'expense',
    tags: ['通勤'],
  },
]
