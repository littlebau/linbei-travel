import type { Trip } from '../types/plan'

interface Props {
  trip: Trip
  onBack: () => void
}

export default function TripHero({ trip, onBack }: Props) {
  const start = new Date(trip.startDate)
  const end = new Date(trip.endDate)
  const dateStr = `${start.getFullYear()}.${String(start.getMonth()+1).padStart(2,'0')}.${String(start.getDate()).padStart(2,'0')} — ${String(end.getMonth()+1).padStart(2,'0')}.${String(end.getDate()).padStart(2,'0')}`

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#0e0f1a] to-[#07080f] border-b border-white/5">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 blur-3xl rounded-full" />

      <div className="relative max-w-4xl mx-auto px-6 pt-8 pb-12">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-300 text-sm transition-colors mb-8 group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
          所有旅遊
        </button>

        <p className="text-xs font-semibold tracking-[0.3em] text-slate-500 uppercase mb-3">林北旅行社</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{trip.title}</h1>
        <p className="text-slate-400 max-w-xl mb-8 leading-relaxed">{trip.summary}</p>

        {/* Stats row */}
        <div className="flex flex-wrap gap-3">
          {[
            { icon: '📍', label: trip.destination },
            { icon: '📅', label: dateStr },
            { icon: '🕐', label: `${trip.durationDays} 天` },
            { icon: '👥', label: `${trip.members.count} 人 · ${trip.members.names.join('、')}` },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/8 text-sm text-slate-300">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
