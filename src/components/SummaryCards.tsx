import type { SummaryMetric } from '../types'

type Props = {
  metrics: SummaryMetric[]
}

export function SummaryCards({ metrics }: Props) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {metrics.map((metric) => (
        <div key={metric.label} className="card overflow-hidden p-6">
          <div className={`flex h-full flex-col justify-between rounded-[2rem] bg-gradient-to-br ${metric.color} p-6 text-slate-950`}>
            <div>
              <p className="text-sm uppercase tracking-[0.3em]">{metric.label}</p>
              <p className="mt-5 text-3xl font-semibold leading-tight">{metric.value}</p>
            </div>
            <p className="mt-6 text-sm text-slate-900/80">{metric.trend}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
