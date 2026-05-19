import type { SummaryMetric } from '../types'

type Props = {
  metrics: SummaryMetric[]
}

export function SummaryCards({ metrics }: Props) {
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      {metrics.map((metric) => (
        <div key={metric.label} className="rounded-[2rem] p-0">
          <div className={`flex h-full flex-col justify-between rounded-[1.75rem] bg-gradient-to-br ${metric.color} p-5 text-slate-950 shadow-2xl`}>
            <div>
              <p className="text-xs uppercase tracking-[0.3em]">{metric.label}</p>
              <p className="mt-4 text-2xl font-semibold leading-tight">{metric.value}</p>
            </div>
            <p className="mt-4 text-sm text-slate-900/80">{metric.trend}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
