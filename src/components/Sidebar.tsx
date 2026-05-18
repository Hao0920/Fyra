type Props = {
  onAdd: () => void
}

export function Sidebar({ onAdd }: Props) {
  const navItems = [
    { label: '首页', icon: '🏠' },
    { label: '项目', icon: '📋' },
    { label: '账户', icon: '💼' },
    { label: '统计', icon: '📈' },
    { label: '设置', icon: '⚙️' },
  ]

  return (
    <div className="flex h-full flex-col items-center justify-between rounded-[3rem] border border-slate-800/90 bg-slate-950/90 px-3 py-6 shadow-2xl shadow-slate-950/40">
      <div className="space-y-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-[2.5rem] bg-slate-900/80 text-2xl text-sky-300 shadow-lg shadow-sky-500/10">F</div>
        <div className="space-y-4">
          {navItems.map((item, index) => (
            <button key={item.label} className={`flex h-16 w-16 items-center justify-center rounded-3xl text-xl transition ${index === 0 ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20' : 'bg-slate-900/80 text-slate-300 hover:bg-slate-900 hover:text-slate-100'}`}>
              <span>{item.icon}</span>
            </button>
          ))}
        </div>
      </div>

      <button onClick={onAdd} className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-sky-500 text-3xl text-slate-950 shadow-lg shadow-sky-500/30 transition hover:bg-sky-400">+</button>
    </div>
  )
}
