import type { Account } from '../types'

type Props = {
  accounts: Account[]
}

export function AccountCards({ accounts }: Props) {
  return (
    <div className="card overflow-hidden p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">账户</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-100">账户余额</h2>
        </div>
        <button className="rounded-full border border-slate-700/80 bg-slate-900/70 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500">
          管理</button>
      </div>
      <div className="space-y-4">
        {accounts.map((account) => (
          <div key={account.id} className="rounded-[2rem] border border-slate-700/80 bg-slate-950/80 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{account.name}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-100">{account.currency} {account.balance.toLocaleString()}</p>
              </div>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">{account.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
