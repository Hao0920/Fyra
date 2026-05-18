export function Header() {
  return (
    <div className="card overflow-hidden p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">欢迎回来</p>
          <h1 className="mt-2 text-4xl font-semibold text-slate-100">今日财务总览</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-400">这是你的 iPad 风格仪表盘，支持快速记账、预算提醒和智能分析。</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="rounded-full border border-slate-700/80 bg-slate-900/80 px-5 py-3 text-sm text-slate-200 transition hover:border-slate-500">快速记账</button>
          <button className="rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:bg-sky-400">新建预算</button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-[2rem] border border-slate-700/80 bg-slate-900/70 p-4 text-sm text-slate-300">
        {['总览', '分类', '预算', '报表', 'AI'].map((label) => (
          <button key={label} className="rounded-full border border-slate-700/80 bg-slate-950/80 px-4 py-2 transition hover:border-slate-500 hover:bg-slate-900/90">{label}</button>
        ))}
      </div>
    </div>
  )
}
