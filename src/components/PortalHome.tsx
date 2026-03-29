import Link from 'next/link'
import type { TripSummary } from '../types/plan'

interface Props {
  trips: TripSummary[]
}

const statusCfg: Record<string, { label: string; color: string }> = {
  upcoming:  { label: 'UPCOMING',  color: 'text-[#c9a96e] border-[#c9a96e]/40' },
  completed: { label: 'COMPLETED', color: 'text-[#8a8278] border-[#8a8278]/40' },
  planning:  { label: 'PLANNING',  color: 'text-[#a09080] border-[#a09080]/40' },
}

function formatYear(start: string) {
  return new Date(start).getFullYear()
}
function formatShortDate(start: string, end: string) {
  const s = new Date(start)
  const e = new Date(end)
  return `${s.getMonth()+1}.${String(s.getDate()).padStart(2,'0')} — ${e.getMonth()+1}.${String(e.getDate()).padStart(2,'0')}`
}

export default function PortalHome({ trips }: Props) {
  return (
    <div className="min-h-screen" style={{ background: '#0d0c0a' }}>
      {/* Header */}
      <header className="pt-20 pb-14 px-6 max-w-5xl mx-auto">
        <div className="flex items-start justify-between flex-wrap gap-6">
          <div>
            <p className="text-[10px] tracking-[0.45em] text-[#5a5450] uppercase mb-4">
              LINBEI TRAVEL
            </p>
            <h1 className="font-serif text-5xl md:text-6xl text-[#f0ebe3] tracking-tight leading-none mb-4">
              旅遊記錄
            </h1>
            <div className="w-10 h-px bg-[#c9a96e] mb-5" />
            <p className="text-[#8a8278] text-sm leading-relaxed max-w-xs">
              為家人規劃每一段旅程<br />記錄每一個值得珍藏的時刻
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] tracking-[0.3em] text-[#3a3830] uppercase">
              {trips.length} TRIPS
            </span>
          </div>
        </div>
      </header>

      {/* Thin rule */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-[#2a2720]" />
      </div>

      {/* Cards */}
      <main className="max-w-5xl mx-auto px-6 pt-10 pb-24">
        {trips.length === 0 ? (
          <div className="text-center text-[#3a3830] py-24 text-sm tracking-widest uppercase">
            No trips yet
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#2a2720]">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

function TripCard({ trip }: { trip: TripSummary }) {
  const status = statusCfg[trip.status] ?? statusCfg.planning

  return (
    <Link
      href={`/trips/${trip.id}`}
      className="group relative flex flex-col bg-[#0d0c0a] p-7 hover:bg-[#141210] transition-colors duration-300 focus:outline-none"
    >
      {/* Top row: status badge + year */}
      <div className="flex items-center justify-between mb-8">
        <span className={`text-[9px] tracking-[0.35em] font-medium border px-2.5 py-1 ${status.color}`}>
          {status.label}
        </span>
        <span className="text-[11px] text-[#3a3830] tabular-nums">{formatYear(trip.startDate)}</span>
      </div>

      {/* Emoji + destination */}
      <div className="flex items-end gap-3 mb-5">
        <span className="text-3xl leading-none">{trip.emoji}</span>
        <span className="text-[10px] tracking-[0.25em] text-[#5a5450] uppercase pb-1">{trip.destination}</span>
      </div>

      {/* Title */}
      <h2 className="font-serif text-xl text-[#f0ebe3] leading-snug mb-6 group-hover:text-white transition-colors">
        {trip.title}
      </h2>

      {/* Bottom meta */}
      <div className="mt-auto space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-[#5a5450] tabular-nums">{formatShortDate(trip.startDate, trip.endDate)}</span>
          <span className="text-[#5a5450]">{trip.durationDays}D</span>
        </div>
        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          {trip.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-[9px] tracking-widest text-[#4a4540] uppercase">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Gold left accent on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#c9a96e] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />
    </Link>
  )
}
