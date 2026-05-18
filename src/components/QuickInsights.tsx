export function QuickInsights() {
  return (
    <div className="card overflow-hidden p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">洞察</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-100">快速提示</h2>
        </div>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-400">最新</span>
      </div>
      <div className="space-y-4">
        <div className="rounded-[2rem] border border-slate-700/80 bg-slate-950/80 p-4">
          <p className="text-sm text-slate-400">本月卡片支出增长 16%，建议检查订阅与定期消费。</p>
          <p className="mt-3 text-sm font-medium text-slate-100">推荐：创建“订阅”专案并开启预算提醒。</p>
        </div>
        <div className="rounded-[2rem] border border-slate-700/80 bg-slate-950/80 p-4">
          <p className="text-sm text-slate-400">信用卡还款日 5/27，将自动进行分期提醒。</p>
          <p className="mt-3 text-sm font-medium text-slate-100">开启“延后入账”模式，避免账单遗漏。</p>
        </div>
        <div className="rounded-[2rem] border border-slate-700/80 bg-slate-950/80 p-4">
          <p className="text-sm text-slate-400">旅行钱包已有 3,269 欧元，可在下次外币消费时自动换算。</p>
          <p className="mt-3 text-sm font-medium text-slate-100">可添加“兑换提醒”与“行程预算”。</p>
        </div>
      </div>
    </div>
  )
}
