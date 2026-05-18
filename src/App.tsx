import { useState } from 'react'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { ProjectPanel } from './components/ProjectPanel'
import { SummaryCards } from './components/SummaryCards'
import { TransactionTable } from './components/TransactionTable'
import { CalendarPanel } from './components/CalendarPanel'
import { QuickAddModal } from './components/QuickAddModal'
import { summaryMetrics, transactions, projects } from './data/mockData'

function App() {
  const [showQuickAdd, setShowQuickAdd] = useState(false)

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1900px] gap-6 xl:grid-cols-[96px_1.35fr_0.75fr]">
        <aside className="hidden xl:block">
          <Sidebar onAdd={() => setShowQuickAdd(true)} />
        </aside>

        <main className="space-y-6">
          <Header />

          <ProjectPanel projects={projects} />

          <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
            <div className="space-y-6">
              <SummaryCards metrics={summaryMetrics} />

              <div className="card overflow-hidden p-6">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">概览</p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-100">账户余额与支出</h2>
                  </div>
                  <button className="rounded-full border border-slate-700/90 bg-slate-900/80 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500">
                    2026/05/01 - 2026/05/31
                  </button>
                </div>

                <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
                  <div className="space-y-5">
                    <div className="grid gap-4 sm:grid-cols-3">
                      {[
                        { title: '余额', value: '+¥988,537', hint: '0.00% (+0)' },
                        { title: '支出', value: '¥0', hint: '0.00% (+0)' },
                        { title: '收入', value: '¥0', hint: '0.00% (+0)' },
                      ].map((item) => (
                        <div key={item.title} className="rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-5">
                          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{item.title}</p>
                          <p className="mt-3 text-2xl font-semibold text-slate-100">{item.value}</p>
                          <p className="mt-2 text-sm text-slate-400">{item.hint}</p>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-[2.5rem] border border-slate-800/90 bg-slate-900/80 p-5 shadow-inner">
                      <div className="mb-5 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">图表</p>
                          <h3 className="mt-2 text-xl font-semibold text-slate-100">月度趋势</h3>
                        </div>
                        <button className="rounded-full border border-slate-700/90 bg-slate-950/80 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500">
                          按日
                        </button>
                      </div>
                      <div className="h-[320px] rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-5">
                        <div className="h-full w-full rounded-[2rem] bg-slate-900/90 p-4">
                          <div className="h-full w-full rounded-[2rem] bg-gradient-to-br from-fuchsia-500 via-sky-500 to-cyan-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-5">
                      <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">信用卡账单</p>
                        <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs text-slate-300">4项</span>
                      </div>
                      <div className="mt-4 space-y-4">
                        {[
                          { title: '蚂蚁花呗 0920', due: '5/8', amount: '¥89.82' },
                          { title: '蚂蚁花呗 0601', due: '5/15', amount: '¥193.74' },
                          { title: '招商银行 7987', due: '5/23', amount: '¥16,038.20' },
                          { title: '招商银行 0925', due: '5/28', amount: '¥10,859.23' },
                        ].map((item) => (
                          <div key={item.title} className="flex items-center justify-between rounded-3xl bg-slate-900/90 px-4 py-4">
                            <div>
                              <p className="font-semibold text-slate-100">{item.title}</p>
                              <p className="text-xs text-slate-500">到期 {item.due}</p>
                            </div>
                            <p className="text-right text-sm font-semibold text-rose-400">{item.amount}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-5">
                      <p className="text-sm uppercase tracking-[0.3em] text-slate-500">待完成交易</p>
                      <div className="mt-4 space-y-4">
                        {['配件', '配件', '配件'].map((item, index) => (
                          <div key={item + index} className="flex items-center justify-between rounded-3xl bg-slate-900/90 px-4 py-4">
                            <div>
                              <p className="font-semibold text-slate-100">{item}</p>
                              <p className="text-xs text-slate-500">分期 1/3 · 淘宝</p>
                            </div>
                            <p className="text-right text-sm font-semibold text-rose-400">¥32.01</p>
                          </div>
                        ))}
                      </div>
                    </div>
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

        <aside className="hidden xl:block">
          <CalendarPanel />
        </aside>
      </div>

      {showQuickAdd && <QuickAddModal onClose={() => setShowQuickAdd(false)} />}
    </div>
  )
}

export default App
