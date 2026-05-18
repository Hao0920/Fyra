import { AccountCards } from './components/AccountCards'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { SummaryCards } from './components/SummaryCards'
import { TransactionTable } from './components/TransactionTable'
import { QuickInsights } from './components/QuickInsights'
import { summaryMetrics, accounts, transactions } from './data/mockData'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1800px] gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <aside className="space-y-6">
          <div className="card overflow-hidden p-6">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-slate-400">记账工具</p>
                <h1 className="mt-3 text-3xl font-semibold text-slate-100">Fyra</h1>
              </div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-sky-500 text-xl shadow-lg shadow-sky-500/20">F</div>
            </div>
            <Sidebar />
          </div>

          <AccountCards accounts={accounts} />
          <QuickInsights />
        </aside>

        <main className="space-y-6">
          <Header />

          <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
            <div className="space-y-6">
              <SummaryCards metrics={summaryMetrics} />
              <div className="card overflow-hidden p-6">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">本周现金流</p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-100">累计支出趋势</h2>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/90 bg-slate-900/80 px-4 py-2 text-sm text-slate-200">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /> 14天
                  </div>
                </div>
                <div className="grid gap-4 rounded-[2rem] bg-slate-900/80 p-5 text-slate-300 shadow-inner">
                  <div className="h-[300px] rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-5">
                    <div className="h-full w-full rounded-[2rem] bg-slate-950/70 p-4">
                      <div className="h-full w-full rounded-[2rem] bg-gradient-to-br from-sky-500 via-cyan-400 to-slate-900" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-[1.75rem] bg-slate-950/80 p-4">
                      <p className="text-xs uppercase tracking-[0.32em] text-slate-500">收入</p>
                      <p className="mt-3 text-2xl font-semibold text-slate-100">$8,720</p>
                    </div>
                    <div className="rounded-[1.75rem] bg-slate-950/80 p-4">
                      <p className="text-xs uppercase tracking-[0.32em] text-slate-500">支出</p>
                      <p className="mt-3 text-2xl font-semibold text-slate-100">$4,682</p>
                    </div>
                    <div className="rounded-[1.75rem] bg-slate-950/80 p-4">
                      <p className="text-xs uppercase tracking-[0.32em] text-slate-500">节省</p>
                      <p className="mt-3 text-2xl font-semibold text-slate-100">$2,038</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card overflow-hidden p-6">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">快捷入口</p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-100">常用操作</h2>
                  </div>
                </div>
                <div className="grid gap-4">
                  {['快速记账', '导入发票', '预算提醒', 'AI 分析'].map((item) => (
                    <button key={item} className="rounded-[2rem] border border-slate-700/80 bg-slate-950/80 px-5 py-4 text-left text-slate-100 transition hover:border-slate-500">
                      <p className="text-sm text-slate-400">{item}</p>
                      <p className="mt-2 text-lg font-semibold text-slate-100">立即查看</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="card overflow-hidden p-6">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">账户统计</p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-100">资金分布</h2>
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="rounded-[2rem] bg-slate-950/80 p-5">
                    <p className="text-sm text-slate-400">本周转账</p>
                    <p className="mt-3 text-3xl font-semibold text-slate-100">$1,230</p>
                  </div>
                  <div className="rounded-[2rem] bg-slate-950/80 p-5">
                    <p className="text-sm text-slate-400">信用卡额度</p>
                    <p className="mt-3 text-3xl font-semibold text-slate-100">$6,800</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="card overflow-hidden p-6">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">交易流水</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-100">最近 10 条交易</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="rounded-full border border-slate-700/80 bg-slate-900/80 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500">
                  过滤</button>
                <button className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:bg-sky-400">
                  新增交易</button>
              </div>
            </div>
            <TransactionTable transactions={transactions} />
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
