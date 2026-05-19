import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { CalendarPanel } from './components/CalendarPanel'
import { QuickAddModal } from './components/QuickAddModal'
import { summaryMetrics, transactions } from './data/mockData'

function App() {
  const [showQuickAdd, setShowQuickAdd] = useState(false)

  return (
    <div className="min-h-screen bg-slate-950 px-2 py-6 text-slate-100 sm:px-4 lg:px-6">
      <div className="mx-auto grid w-full max-w-[2300px] gap-6 xl:grid-cols-[96px_minmax(0,1fr)_420px]">
        <aside className="hidden xl:block">
          <Sidebar onAdd={() => setShowQuickAdd(true)} />
        </aside>

        <main className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr] xl:items-start">
            <section className="space-y-6">
              <div className="card overflow-hidden p-6">
                <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">概览</p>
                    <h1 className="mt-2 text-3xl font-semibold text-slate-100">FYRA iPad 仪表盘</h1>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <button className="rounded-full border border-slate-700/80 bg-slate-900/80 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500">筛选</button>
                    <button className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:bg-sky-400">快速记账</button>
                  </div>
                </div>

                <div className="grid gap-4 xl:grid-cols-3">
                  {summaryMetrics.map((metric) => (
                    <div key={metric.label} className="rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-5">
                      <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{metric.label}</p>
                      <p className="mt-4 text-3xl font-semibold text-slate-100">{metric.value}</p>
                      <p className="mt-3 text-sm text-slate-400">{metric.trend}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-[2.5rem] border border-slate-800/90 bg-slate-900/80 p-5">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">趋势图</p>
                      <h2 className="mt-2 text-xl font-semibold text-slate-100">30 天收支变化</h2>
                    </div>
                    <button className="rounded-full border border-slate-700/90 bg-slate-950/80 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500">按日</button>
                  </div>
                  <div className="h-[320px] rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-5">
                    <div className="h-full w-full rounded-[2rem] bg-slate-900/90 p-4">
                      <div className="h-full w-full rounded-[2rem] bg-gradient-to-br from-fuchsia-500 via-sky-500 to-cyan-400" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <aside className="space-y-6">
              <CalendarPanel />
            </aside>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr] xl:items-start">
            <div className="space-y-6">
              <div className="card overflow-hidden p-6">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">信用卡账单</p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-100">应还与待完成</h2>
                  </div>
                  <span className="rounded-full bg-slate-900/80 px-3 py-2 text-xs uppercase tracking-[0.25em] text-slate-300">4 项</span>
                </div>
                <div className="space-y-4">
                  {[
                    { title: '蚂蚁花呗 0920', due: '5/8', amount: '¥89.82' },
                    { title: '蚂蚁花呗 0601', due: '5/15', amount: '¥193.74' },
                    { title: '招商银行 7987', due: '5/23', amount: '¥16,038.20' },
                    { title: '招商银行 0925', due: '5/28', amount: '¥10,859.23' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-center justify-between rounded-3xl bg-slate-900/90 px-4 py-4">
                      <div>
                        <p className="font-semibold text-slate-100">{item.title}</p>
                        <p className="mt-1 text-xs text-slate-500">到期 {item.due}</p>
                      </div>
                      <p className="text-right text-sm font-semibold text-rose-400">{item.amount}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">待完成交易</p>
                      <p className="mt-1 text-xs text-slate-500">3 条 · 最近更新</p>
                    </div>
                    <button className="rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-2 text-xs text-slate-300 transition hover:border-slate-500">全部</button>
                  </div>
                  <div className="space-y-3">
                    {['配件', '配件', '配件'].map((item, index) => (
                      <div key={`${item}-${index}`} className="flex items-center justify-between rounded-3xl bg-slate-900/90 px-4 py-4">
                        <div>
                          <p className="font-semibold text-slate-100">{item}</p>
                          <p className="mt-1 text-xs text-slate-500">分期 1/3 · 淘宝</p>
                        </div>
                        <p className="text-right text-sm font-semibold text-rose-400">¥32.01</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card overflow-hidden p-6 min-h-[560px]">
                <div className="mb-6 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">MOZE</p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-100">未来 30 天交易</h2>
                  </div>
                  <button className="rounded-full border border-slate-700/90 bg-slate-900/80 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500">按日</button>
                </div>
                <div className="flex h-[420px] items-center justify-center rounded-[2rem] border border-dashed border-slate-700/80 bg-slate-900/80 text-center text-slate-400">
                  <div>
                    <p className="text-xl font-semibold text-slate-200">暂无未来计划交易</p>
                    <p className="mt-3 text-sm text-slate-500">MOZE 会在这里显示未来 30 天的交易预测。</p>
                  </div>
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="card rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-6">
                <div className="h-[420px] rounded-[1.75rem] bg-slate-900/80" />
              </div>
            </aside>
          </div>
        </main>
      </div>

      {showQuickAdd && <QuickAddModal onClose={() => setShowQuickAdd(false)} />}
    </div>
  )
}

export default App
