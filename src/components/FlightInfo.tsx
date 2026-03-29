import type { FlightItem } from '../types/plan'

interface Props {
  flights: FlightItem[]
}

const typeCfg: Record<string, { label: string }> = {
  outbound: { label: '去　程' },
  return:   { label: '回　程' },
  domestic: { label: '國內線' },
}

function formatDT(dt: string) {
  const d = new Date(dt)
  if (isNaN(d.getTime())) return dt
  return {
    date: `${d.getMonth()+1}/${d.getDate()}`,
    time: `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`,
  }
}

export default function FlightInfo({ flights }: Props) {
  if (!flights?.length) return null
  return (
    <section className="max-w-4xl mx-auto px-6 py-10">
      {/* Section header */}
      <div className="flex items-baseline gap-4 mb-7">
        <h2 className="font-serif text-2xl text-[#f0ebe3]">參考航班</h2>
        <div className="flex-1 h-px bg-[#2a2720]" />
        <span className="text-[9px] tracking-[0.4em] text-[#4a4540] uppercase">Flights</span>
      </div>

      <div className="space-y-0 border-t border-[#2a2720]">
        {flights.map((f, i) => {
          const cfg = typeCfg[f.type] ?? typeCfg.domestic
          const dep = formatDT(f.departureTime)
          const arr = formatDT(f.arrivalTime)
          const isOut = f.type === 'outbound'
          return (
            <div
              key={i}
              className="group grid grid-cols-[80px_1fr_1fr_1fr] md:grid-cols-[80px_1fr_1fr_1fr_1fr] gap-4 items-center border-b border-[#2a2720] py-5 hover:bg-[#141210] transition-colors px-2"
            >
              {/* Type */}
              <div>
                <span
                  className="text-[9px] tracking-[0.3em] uppercase"
                  style={{ color: isOut ? '#c9a96e' : '#8a8278' }}
                >
                  {cfg.label}
                </span>
              </div>

              {/* Airline + flight no */}
              <div>
                <div className="text-sm text-[#f0ebe3]">{f.airline}</div>
                <div className="text-[10px] text-[#5a5450] font-mono mt-0.5">{f.flightNumber}</div>
              </div>

              {/* From */}
              <div>
                <div className="text-sm text-[#d4cec6]">{f.from}</div>
                {typeof dep === 'object' && (
                  <div className="text-[10px] text-[#5a5450] mt-0.5 tabular-nums">
                    {dep.date} <span className="text-[#8a8278]">{dep.time}</span>
                  </div>
                )}
              </div>

              {/* To */}
              <div>
                <div className="text-sm text-[#d4cec6]">{f.to}</div>
                {typeof arr === 'object' && (
                  <div className="text-[10px] text-[#5a5450] mt-0.5 tabular-nums">
                    {arr.date} <span className="text-[#8a8278]">{arr.time}</span>
                  </div>
                )}
              </div>

              {/* Notes */}
              {f.notes && (
                <div className="hidden md:block text-[11px] text-[#5a5450] leading-snug">{f.notes}</div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
