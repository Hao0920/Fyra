import type { Transaction } from '../types'

type Props = {
  transactions: Transaction[]
}

const badgeClasses = {
  income: 'bg-emerald-500/15 text-emerald-300',
  expense: 'bg-rose-500/15 text-rose-300',
}

export function TransactionTable({ transactions }: Props) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-700/80 bg-slate-900/70">
      <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
        <thead className="bg-slate-950/90 text-slate-400">
          <tr>
            <th className="px-6 py-4">日期</th>
            <th className="px-6 py-4">备注</th>
            <th className="px-6 py-4">类别</th>
            <th className="px-6 py-4">账户</th>
            <th className="px-6 py-4">金额</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item, index) => (
            <tr key={item.id} className={index % 2 === 0 ? 'bg-slate-950/50' : 'bg-slate-900/70'}>
              <td className="whitespace-nowrap px-6 py-4 text-slate-300">{item.date}</td>
              <td className="px-6 py-4 text-slate-100">{item.description}</td>
              <td className="px-6 py-4 text-slate-300">{item.category}</td>
              <td className="px-6 py-4 text-slate-300">{item.account}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClasses[item.type]}`}>
                  {item.type === 'expense' ? '-' : '+'}${Math.abs(item.amount).toFixed(2)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
