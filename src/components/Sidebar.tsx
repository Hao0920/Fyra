export function Sidebar() {
  const navItems = [
    { label: '首页', icon: '🏠' },
    { label: '账户', icon: '💳' },
    { label: '交易', icon: '🧾' },
    { label: '预算', icon: '📊' },
    { label: '报表', icon: '📈' },
    { label: '设置', icon: '⚙️' },
  ]

  return (
    <div className="card flex h-full flex-col overflow-hidden">
      <div className="border-b border-slate-700/80 px-6 py-6">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Fyra</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-100">财务仪表盘</h1>
        <p className="mt-2 text-sm text-slate-400">以 Moze iPad 风格为基准，打造现代记账体验。</p>
      </div>

      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <button className="flex w-full items-center gap-4 rounded-3xl px-4 py-4 text-left text-slate-200 transition hover:bg-slate-800/80 hover:text-white">
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-slate-700/80 px-6 py-5">
        <div className="rounded-3xl bg-slate-900/80 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">提醒</p>
          <p className="mt-3 text-sm leading-6 text-slate-200">下个月预算提醒已开启。记得调整信用卡还款日期。</p>
        </div>
      </div>
    </div>
  )
}
