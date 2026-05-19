export function CalendarPanel() {
  return (
    <div className="card overflow-hidden p-6">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-slate-400">日历</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-100">2026/05/19</h2>
        </div>
        <div className="flex flex-col items-end gap-2">
          <button className="rounded-full border border-slate-700/90 bg-slate-900/80 px-3 py-2 text-xs text-slate-300 transition hover:border-slate-500">周视图</button>
          <div className="rounded-full bg-slate-900/80 px-3 py-1 text-xs text-slate-300">本月 · 5 项提醒</div>
        </div>
      </div>

      <div className="grid gap-3 rounded-[1.75rem] bg-slate-950/90 p-4 text-sm text-slate-300">
        <div className="grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-[0.25em] text-slate-500">
          {['日', '一', '二', '三', '四', '五', '六'].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 text-center text-sm">
          {Array.from({ length: 30 }, (_, index) => {
            const day = index + 1
            const isActive = day === 19
            const isWeekend = [0, 6].includes((index + 2) % 7)
            return (
              <div
                key={day}
                className={`rounded-2xl p-3 ${isActive ? 'border border-sky-400 bg-gradient-to-br from-slate-800 to-slate-900 text-sky-200' : 'bg-slate-900/80 text-slate-300'} ${isWeekend ? 'text-rose-300' : ''}`}
              >
                <div className="text-base font-semibold">{day}</div>
                <div className="mt-1 text-[10px] text-slate-500">{isActive ? '今天' : ''}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-5 rounded-[1.5rem] border border-slate-800/90 bg-slate-900/70 p-4 text-sm text-slate-300">
        <p className="text-xs uppercase tracking-[0.32em] text-slate-500">待处理</p>
        <div className="mt-3 space-y-3">
          <div className="flex items-center justify-between rounded-2xl bg-slate-950/80 px-3 py-3">
            <div>
              <p className="text-sm font-semibold text-slate-100">信用卡账单</p>
              <p className="text-xs text-slate-500">5/23 还款</p>
            </div>
            <span className="rounded-full bg-rose-500/10 px-3 py-1 text-xs text-rose-300">¥16,038</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-slate-950/80 px-3 py-3">
            <div>
              <p className="text-sm font-semibold text-slate-100">待完成交易</p>
              <p className="text-xs text-slate-500">3 条 / 本周</p>
            </div>
            <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs text-sky-300">查看</span>
          </div>
        </div>
      </div>
    </div>
  )
}
