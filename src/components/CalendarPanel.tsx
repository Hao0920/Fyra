export function CalendarPanel() {
  return (
    <div className="card overflow-hidden p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-slate-400">日历</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-100">2026/05/19</h2>
        </div>
        <button className="rounded-full border border-slate-700/90 bg-slate-900/80 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500">查看</button>
      </div>

      <div className="rounded-[2rem] bg-slate-950/90 p-4">
        <div className="grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-[0.25em] text-slate-500">
          {['日', '一', '二', '三', '四', '五', '六'].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-7 gap-2 text-center text-sm">
          {Array.from({ length: 35 }, (_, index) => {
            const day = index + 1
            const isCurrent = day === 19
            const isPlaceholder = day > 31
            return (
              <div
                key={index}
                className={`rounded-2xl p-3 ${isPlaceholder ? 'bg-slate-950/50 text-slate-600' : isCurrent ? 'border border-sky-400 bg-slate-900 text-sky-300' : 'bg-slate-900/80 text-slate-300'}`}
              >
                <div className="text-base font-semibold">{isPlaceholder ? '' : day}</div>
                <div className="mt-1 text-[10px] text-slate-500">{isCurrent ? '今' : ''}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
