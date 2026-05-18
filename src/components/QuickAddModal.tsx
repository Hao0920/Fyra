type Props = {
  onClose: () => void
}

const categories = ['餐饮', '购物', '日用', '服饰', '数码', '家居', '汽车', '税金']

export function QuickAddModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="relative grid w-full max-w-[1180px] grid-cols-1 gap-6 overflow-hidden rounded-[3rem] bg-slate-950/95 p-6 shadow-2xl shadow-slate-950/40 xl:grid-cols-[1.2fr_0.8fr]">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/90 text-xl text-slate-200 transition hover:bg-slate-800"
        >
          ×
        </button>

        <div className="space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">新增记录</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-100">选择分类</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-4">
            {categories.map((label) => (
              <button
                key={label}
                className="group rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-5 text-left text-slate-200 transition hover:border-slate-500"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-950/80 text-2xl transition group-hover:bg-sky-500">{label[0]}</div>
                <p className="font-medium">{label}</p>
              </button>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[2rem] border border-slate-800/90 bg-slate-900/80 p-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-slate-950/80 text-xl">💳</span>
                <div>
                  <p className="text-sm text-slate-400">账户</p>
                  <p className="mt-1 text-lg font-semibold text-slate-100">微信钱包 0601</p>
                </div>
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-800/90 bg-slate-900/80 p-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-slate-950/80 text-xl">🏷️</span>
                <div>
                  <p className="text-sm text-slate-400">项目</p>
                  <p className="mt-1 text-lg font-semibold text-slate-100">生活</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 rounded-[2rem] border border-slate-800/90 bg-slate-900/80 p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <button className="rounded-[1.75rem] border border-slate-700/90 bg-slate-950/80 px-4 py-3 text-left text-slate-200">金额 ¥0.00</button>
              <button className="rounded-[1.75rem] border border-slate-700/90 bg-slate-950/80 px-4 py-3 text-left text-slate-200">名称 生活</button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <button className="rounded-[1.75rem] border border-slate-700/90 bg-slate-950/80 px-4 py-3 text-left text-slate-200">账户 微信钱包 0601</button>
              <button className="rounded-[1.75rem] border border-slate-700/90 bg-slate-950/80 px-4 py-3 text-left text-slate-200">类型 单次</button>
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-800/90 bg-slate-900/80 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">备注</p>
            <textarea rows={4} className="mt-3 w-full rounded-3xl border border-slate-700/90 bg-slate-950/80 p-4 text-slate-100 outline-none focus:border-sky-500" placeholder="添加备注..." />
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-slate-800/90 bg-slate-900/90 p-6 text-slate-200">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">计算器</p>
              <p className="mt-1 text-xl font-semibold text-slate-100">总额</p>
            </div>
            <button className="rounded-full border border-slate-700/90 px-3 py-2 text-sm text-slate-300 transition hover:border-slate-500">重置</button>
          </div>
          <div className="rounded-[2rem] bg-slate-950/80 p-5 text-right text-3xl font-semibold text-slate-100">0</div>
          <div className="mt-5 grid grid-cols-4 gap-3 text-xl">
            {['7', '8', '9', 'C', '4', '5', '6', '←', '1', '2', '3', '+', '0', '.', '00', '✓'].map((item) => (
              <button key={item} className="rounded-3xl bg-slate-950/80 px-3 py-4 text-slate-100 transition hover:bg-slate-900">{item}</button>
            ))}
          </div>
          <div className="mt-5 rounded-[2rem] bg-slate-950/80 p-4 text-sm text-slate-300">
            <p className="text-slate-400">常用账户</p>
            <div className="mt-4 grid gap-3">
              {['钱包 0920', '钱包 0601', '钱包 0304', '钱包 0802'].map((item) => (
                <div key={item} className="rounded-3xl bg-slate-900/90 px-4 py-3">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
