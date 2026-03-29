import Link from 'next/link'
import type { Trip } from '../types/plan'

interface Props {
  trip: Trip
}

export default function TripHero({ trip }: Props) {
  const start = new Date(trip.startDate)
  const end   = new Date(trip.endDate)
  const year  = start.getFullYear()
  const dateStr = `${start.getMonth()+1}.${String(start.getDate()).padStart(2,'0')} — ${end.getMonth()+1}.${String(end.getDate()).padStart(2,'0')}`

  return (
    <div style={{ background: '#0d0c0a', borderBottom: '1px solid #2a2720' }}>
      <div className="max-w-4xl mx-auto px-6 pt-10 pb-14">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.35em] text-[#5a5450] hover:text-[#c9a96e] uppercase transition-colors duration-200 mb-12 group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform inline-block">←</span>
          All Trips
        </Link>

        {/* Label row */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-[9px] tracking-[0.4em] text-[#5a5450] uppercase">LINBEI TRAVEL</span>
          <span className="w-6 h-px bg-[#2a2720]" />
          <span className="text-[9px] tracking-[0.4em] text-[#5a5450] uppercase">{year}</span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-4xl md:text-5xl text-[#f0ebe3] leading-tight tracking-tight mb-2">
          {trip.title}
        </h1>

        {/* Gold divider */}
        <div className="w-12 h-px bg-[#c9a96e] mb-6" />

        {/* Summary */}
        <p className="text-[#8a8278] text-sm leading-relaxed max-w-lg mb-10">
          {trip.summary}
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap gap-6">
          {[
            { label: 'DESTINATION', value: trip.destination },
            { label: 'DATE',        value: dateStr },
            { label: 'DURATION',    value: `${trip.durationDays} Days` },
            { label: 'MEMBERS',     value: trip.members.names.join('・') },
          ].map((item) => (
            <div key={item.label}>
              <div className="text-[9px] tracking-[0.35em] text-[#4a4540] uppercase mb-1.5">{item.label}</div>
              <div className="text-sm text-[#d4cec6]">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
