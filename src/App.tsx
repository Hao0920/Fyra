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
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-[1700px] gap-6">
        <aside className="hidden w-[280px] shrink-0 xl:block">
          <Sidebar />
        </aside>

        <main className="flex-1 space-y-6">
          <Header />
          <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
            <div className="space-y-6">
              <SummaryCards metrics={summaryMetrics} />
              <div className="card overflow-hidden p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">本周支出趋势</p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-100">近期消费概览</h2>
                  </div>
                  <button className="rounded-full border border-slate-700/80 bg-slate-900/70 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500">
                    14天</button>
                </div>
                <div className="h-[300px] rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 shadow-inner">
                  <div className="flex h-full flex-col justify-between text-slate-400">
                    <div className="h-3/4 rounded-3xl bg-slate-800/70 p-4">
                      <div className="h-full w-full rounded-3xl bg-gradient-to-br from-sky-600 to-cyan-400" />
                    </div>
                    <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
                      <div className="rounded-2xl bg-slate-900/80 px-3 py-4">
                        <p className="text-slate-400">收入</p>
                        <p className="mt-2 text-lg font-semibold text-slate-100">$8,720</p>
                      </div>
                      <div className="rounded-2xl bg-slate-900/80 px-3 py-4">
                        <p className="text-slate-400">支出</p>
                        <p className="mt-2 text-lg font-semibold text-slate-100">$4,682</p>
                      </div>
                      <div className="rounded-2xl bg-slate-900/80 px-3 py-4">
                        <p className="text-slate-400">节省</p>
                        <p className="mt-2 text-lg font-semibold text-slate-100">$2,038</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <AccountCards accounts={accounts} />
              <QuickInsights />
            </aside>
          </section>

          <section className="card overflow-hidden p-6">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">交易流水</p>
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
