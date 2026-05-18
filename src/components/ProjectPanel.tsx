import type { Project } from '../types'

type Props = {
  projects: Project[]
}

export function ProjectPanel({ projects }: Props) {
  return (
    <div className="card overflow-hidden p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">项目总览</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-100">正在进行中</h2>
        </div>
        <button className="rounded-full border border-slate-700/90 bg-slate-900/80 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500">
          + 新项目
        </button>
      </div>
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-[1.75rem] border border-slate-800/90 bg-slate-950/80 px-4 py-4">
            <div>
              <p className="text-sm font-medium text-slate-100">{project.name}</p>
              <p className="mt-1 text-xs text-slate-500">{project.date}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-emerald-400">{project.amount}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.25em] text-slate-500">{project.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
