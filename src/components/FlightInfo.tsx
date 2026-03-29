import type { FlightItem } from '../types/plan'

interface Props {
  flights: FlightItem[]
}

const typeLabel: Record<string, { label: string; color: string }> = {
  outbound: { label: '去程', color: 'text-sky-400 bg-sky-400/10 border-sky-400/20' },
  return:   { label: '回程', color: 'text-violet-400 bg-violet-400/10 border-violet-400/20' },
  domestic: { label: '國內線', color: 'text-slate-400 bg-slate-400/10 border-slate-400/20' },
}

function formatDT(dt: string) {
  const d = new Date(dt)
  if (isNaN(d.getTime())) return dt
  return `${d.getMonth()+1}/${d.getDate()} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
}

export default function FlightInfo({ flights }: Props) {
  if (!flights?.length) return null
  return (
    <section className="max-w-4xl mx-auto px-6 py-8">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span className="text-xl">✈️</span> 參考航班
      </h2>
      <div className="rounded-2xl border border-white/8 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/3 text-slate-500 text-xs uppercase tracking-wide">
              <th className="text-left px-4 py-3">方向</th>
              <th className="text-left px-4 py-3">航空 / 班號</th>
              <th className="text-left px-4 py-3">出發</th>
              <th className="text-left px-4 py-3">抵達</th>
              <th className="text-left px-4 py-3 hidden md:table-cell">備注</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {flights.map((f, i) => {
              const t = typeLabel[f.type] ?? typeLabel.domestic
              return (
                <tr key={i} className="hover:bg-white/3 transition-colors">
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${t.color}`}>{t.label}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-white font-medium">{f.airline}</div>
                    <div className="text-slate-500 font-mono text-xs">{f.flightNumber}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-slate-200">{f.from}</div>
                    <div className="text-slate-500 text-xs">{formatDT(f.departureTime)}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-slate-200">{f.to}</div>
                    <div className="text-slate-500 text-xs">{formatDT(f.arrivalTime)}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs hidden md:table-cell">{f.notes}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
