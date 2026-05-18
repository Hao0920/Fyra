export function Header() {
  return (
    <div className="card flex flex-col gap-6 border-slate-700/80 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">欢迎回来</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-100">今日财务总览</h1>
      </div>

      <div className="grid gap-3 sm:auto-cols-min sm:grid-flow-col">
        <button className="rounded-full border border-slate-700/70 bg-slate-900/80 px-5 py-3 text-sm text-slate-200 transition hover:border-slate-500">
          快速记账</button>
        <button className="rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:bg-sky-400">
          新建预算</button>
      </div>
    </div>
  )
}
