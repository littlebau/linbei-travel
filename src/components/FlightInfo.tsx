'use client'

import { motion } from 'framer-motion'
import type { FlightItem } from '../types/plan'

interface Props {
  flights: FlightItem[]
}

const typeLabel: Record<string, { label: string; color: string }> = {
  outbound: { label: 'GO', color: 'text-cyan-100 bg-cyan-500/20 border-cyan-300/40' },
  return:   { label: 'BACK', color: 'text-fuchsia-100 bg-fuchsia-500/20 border-fuchsia-300/40' },
  domestic: { label: 'LOCAL', color: 'text-slate-100 bg-slate-500/20 border-slate-300/40' },
}

function formatDT(dt: string) {
  const d = new Date(dt)
  if (isNaN(d.getTime())) return dt
  return `${d.getMonth()+1}/${d.getDate()} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
}

export default function FlightInfo({ flights }: Props) {
  if (!flights?.length) return null
  return (
    <section className="max-w-5xl mx-auto px-6 py-9">
      <div className="mb-4 flex items-center gap-3">
        <div className="h-8 w-1 rounded-full bg-cyan-300/70" />
        <h2 className="text-xl font-black tracking-wide text-white">參考航班</h2>
      </div>

      <div className="space-y-3">
        {flights.map((f, i) => {
          const t = typeLabel[f.type] ?? typeLabel.domestic
          return (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-2xl border border-white/12 bg-white/6 backdrop-blur-md p-4 md:p-5 shadow-[0_16px_36px_-22px_rgba(0,0,0,0.7)]"
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${t.color}`}>
                  {t.label}
                </span>
                <span className="text-slate-100 font-semibold">{f.airline}</span>
                <span className="text-slate-400 text-xs font-mono">{f.flightNumber}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-center">
                <div className="rounded-xl bg-black/20 border border-white/10 px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Departure</p>
                  <p className="text-sm text-white font-medium">{f.from}</p>
                  <p className="text-xs text-cyan-200 mt-1">{formatDT(f.departureTime)}</p>
                </div>

                <div className="hidden md:flex items-center justify-center text-slate-300 text-xs">
                  <span>──────── ✈ ────────</span>
                </div>

                <div className="rounded-xl bg-black/20 border border-white/10 px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Arrival</p>
                  <p className="text-sm text-white font-medium">{f.to}</p>
                  <p className="text-xs text-fuchsia-200 mt-1">{formatDT(f.arrivalTime)}</p>
                </div>
              </div>

              {f.notes && (
                <p className="mt-3 text-xs text-slate-300/80">備註：{f.notes}</p>
              )}
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
