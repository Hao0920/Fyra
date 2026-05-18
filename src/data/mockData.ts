import type { Account, SummaryMetric, Transaction } from '../types'

export const summaryMetrics: SummaryMetric[] = [
  {
    label: '本月净支出',
    value: '-$3,248.00',
    trend: '+12.6% 去年同期',
    color: 'from-red-500 to-rose-500',
  },
  {
    label: '账户总额',
    value: '$18,234.86',
    trend: '+8.9% 过去 30 天',
    color: 'from-sky-500 to-blue-500',
  },
  {
    label: '预算使用率',
    value: '72%',
    trend: '剩余 $2,560',
    color: 'from-emerald-500 to-lime-500',
  },
]

export const accounts: Account[] = [
  { id: 'a1', name: '主账户', balance: 9477.56, currency: 'USD', status: '可用余额' },
  { id: 'a2', name: '信用卡', balance: -1240.38, currency: 'USD', status: '到期 5/27' },
  { id: 'a3', name: '旅行钱包', balance: 3269.78, currency: 'EUR', status: '自动换算' },
]

export const transactions: Transaction[] = [
  {
    id: 't1',
    date: '5月18日',
    description: '星巴克',
    category: '餐饮',
    account: '主账户',
    amount: -12.8,
    type: 'expense',
    tags: ['咖啡', '午后'],
  },
  {
    id: 't2',
    date: '5月17日',
    description: 'Apple Store',
    category: '购物',
    account: '信用卡',
    amount: -299.0,
    type: 'expense',
    tags: ['电子', '配件'],
  },
  {
    id: 't3',
    date: '5月16日',
    description: '工资',
    category: '收入',
    account: '主账户',
    amount: 6200.0,
    type: 'income',
    tags: ['薪资'],
  },
  {
    id: 't4',
    date: '5月15日',
    description: '地铁票',
    category: '交通',
    account: '主账户',
    amount: -4.9,
    type: 'expense',
    tags: ['通勤'],
  },
]
