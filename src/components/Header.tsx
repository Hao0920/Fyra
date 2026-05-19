export function Header() {
  return (
    <div className="card overflow-hidden p-6">
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">今日财务总览</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-100">FYRA iPad 仪表盘</h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-400">高亮账户、账单与日历，快速切换预算、分类与明细。</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="rounded-full border border-slate-700/80 bg-slate-900/80 px-5 py-3 text-sm text-slate-200 transition hover:border-slate-500">消费明细</button>
          <button className="rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:bg-sky-400">快速记账</button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
        <div className="rounded-full border border-slate-700/80 bg-slate-950/80 px-5 py-4 text-slate-300 shadow-inner">
          搜索交易、账户或项目
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {['总览', '分类', '预算', '报表', 'AI'].map((label) => (
            <button key={label} className="rounded-full border border-slate-700/80 bg-slate-900/80 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500 hover:bg-slate-950/90">
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
