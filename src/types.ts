export type Transaction = {
  id: string
  date: string
  description: string
  category: string
  account: string
  amount: number
  type: 'income' | 'expense'
  tags: string[]
}

export type Account = {
  id: string
  name: string
  balance: number
  currency: string
  status: string
}

export type SummaryMetric = {
  label: string
  value: string
  trend: string
  color: string
}
