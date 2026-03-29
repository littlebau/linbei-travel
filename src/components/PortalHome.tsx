import type { TripSummary } from '../types/plan'

interface Props {
  trips: TripSummary[]
  onSelect: (id: string) => void
}

const statusLabel: Record<string, { label: string; color: string }> = {
  upcoming:  { label: '即將出發', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  completed: { label: '已完成',   color: 'bg-slate-500/20 text-slate-300 border-slate-500/30' },
  planning:  { label: '規劃中',   color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
}

function formatDateRange(start: string, end: string) {
  const s = new Date(start)
  const e = new Date(end)
  return `${s.getFullYear()} · ${s.getMonth()+1}/${s.getDate()} — ${e.getMonth()+1}/${e.getDate()}`
}

export default function PortalHome({ trips, onSelect }: Props) {
  return (
    <div className="min-h-screen bg-[#07080f]">
      {/* Header */}
      <header className="pt-16 pb-10 px-6 text-center">
        <p className="text-xs font-semibold tracking-[0.3em] text-slate-500 uppercase mb-3">林北旅行社</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
          旅遊計畫總覽
        </h1>
        <p className="text-slate-400 text-base max-w-md mx-auto">
          為家人規劃每一段旅程，記錄每一個值得珍藏的時刻。
        </p>
      </header>

      {/* Cards Grid */}
      <main className="max-w-5xl mx-auto px-6 pb-20">
        {trips.length === 0 ? (
          <div className="text-center text-slate-600 py-20 text-sm">還沒有旅遊計畫，趕快開始規劃吧！</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} onSelect={onSelect} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

function TripCard({ trip, onSelect }: { trip: TripSummary; onSelect: (id: string) => void }) {
  const status = statusLabel[trip.status] ?? statusLabel.planning

  return (
    <button
      onClick={() => onSelect(trip.id)}
      className="group relative text-left rounded-2xl overflow-hidden border border-white/5 bg-white/3 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 focus:outline-none focus:ring-2 focus:ring-white/20"
    >
      {/* Gradient cover */}
      <div className={`h-36 bg-gradient-to-br ${trip.coverGradient} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10" />
        {/* Decorative blur orb */}
        <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/10 blur-xl" />
        <div className="absolute top-4 left-4">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border backdrop-blur-sm ${status.color}`}>
            {status.label}
          </span>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="text-4xl drop-shadow-lg">{trip.emoji}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="font-bold text-white text-base leading-snug mb-1 group-hover:text-white/90">
          {trip.title}
        </h2>
        <p className="text-slate-400 text-xs mb-3">{trip.destination}</p>

        <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
          <span>{formatDateRange(trip.startDate, trip.endDate)}</span>
          <span>{trip.durationDays} 天</span>
        </div>

        <div className="flex items-center justify-between">
          {/* Tags */}
          <div className="flex gap-1.5 flex-wrap">
            {trip.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/8">
                {tag}
              </span>
            ))}
          </div>
          {/* Members */}
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <span>👥</span>
            <span>{trip.memberCount} 人</span>
          </div>
        </div>
      </div>

      {/* Hover arrow */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white text-xs">
          →
        </div>
      </div>
    </button>
  )
}
