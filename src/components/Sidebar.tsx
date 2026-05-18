export function Sidebar() {
  const navItems = [
    { label: '首页', icon: '🏠' },
    { label: '记账', icon: '🧾' },
    { label: '预算', icon: '📊' },
    { label: '报表', icon: '📈' },
    { label: 'AI 助手', icon: '🤖' },
    { label: '设置', icon: '⚙️' },
  ]

  return (
    <div className="space-y-5 rounded-[2.5rem] border border-slate-800/90 bg-slate-950/90 p-5 shadow-xl shadow-slate-950/40">
      <div className="mb-6 rounded-[2rem] border border-slate-800/90 bg-slate-900/70 p-5">
        <p className="text-xs uppercase tracking-[0.32em] text-slate-500">功能</p>
        <h2 className="mt-3 text-xl font-semibold text-slate-100">快速导航</h2>
      </div>

      <nav>
        <ul className="space-y-3">
          {navItems.map((item, index) => (
            <li key={item.label}>
              <button className={`flex w-full items-center gap-4 rounded-[1.75rem] px-4 py-4 text-left text-sm font-medium transition ${index === 0 ? 'bg-slate-900 text-slate-100 shadow-xl shadow-slate-950/25' : 'text-slate-300 hover:bg-slate-900/80 hover:text-slate-100'}`}>
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="rounded-[2rem] border border-slate-800/90 bg-slate-900/70 p-5">
        <p className="text-xs uppercase tracking-[0.32em] text-slate-500">提示</p>
        <p className="mt-3 text-sm leading-6 text-slate-200">同步自动备份到 GitHub 后，可继续升级为多人协作账本。</p>
      </div>
    </div>
  )
}
