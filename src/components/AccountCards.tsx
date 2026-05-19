import type { Account } from '../types'

type Props = {
  accounts: Account[]
}

export function AccountCards({ accounts }: Props) {
  return (
    <div className="card overflow-hidden p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">账户</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-100">账户余额与支出</h2>
        </div>
        <button className="rounded-full border border-slate-700/80 bg-slate-900/70 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500">
          管理
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
        <div className="space-y-4">
          <div className="rounded-[1.75rem] bg-gradient-to-br from-slate-800 to-slate-700 p-5 shadow-inner">
            <div className="flex items-start gap-4">
              <div className="h-28 w-28 rounded-[1rem] bg-gradient-to-br from-fuchsia-500 via-sky-500 to-cyan-400 shadow-2xl" />
              <div>
                <p className="text-sm text-slate-300">总资产</p>
                <p className="mt-2 text-3xl font-semibold text-slate-100">+¥988,537</p>
                <p className="mt-2 text-sm text-slate-400">本期 0.00%（+0）</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {accounts.map((account) => (
              <div key={account.id} className="rounded-2xl bg-slate-900/80 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">{account.name}</p>
                    <p className="mt-1 text-lg font-semibold text-slate-100">¥{account.balance.toLocaleString()}</p>
                  </div>
                  <span className="ml-4 rounded-full bg-slate-800/60 px-3 py-1 text-xs text-slate-300">{account.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block w-[260px]">
          <div className="rounded-[1.5rem] border border-slate-800/80 bg-slate-950/80 p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">最近账单</p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/80 px-3 py-3">
                <div>
                  <p className="text-sm text-slate-100">招商银行 7987</p>
                  <p className="text-xs text-slate-500">到期 5/23</p>
                </div>
                <p className="text-sm font-semibold text-rose-400">¥16,038</p>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/80 px-3 py-3">
                <div>
                  <p className="text-sm text-slate-100">招商银行 0925</p>
                  <p className="text-xs text-slate-500">到期 5/28</p>
                </div>
                <p className="text-sm font-semibold text-rose-400">¥10,859</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
