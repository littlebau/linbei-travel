'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { TripSummary } from '../types/plan'

interface Props {
  trips: TripSummary[]
}

const statusLabel: Record<string, { label: string; color: string }> = {
  upcoming:  { label: '即將出發', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  completed: { label: '已完成',   color: 'bg-slate-100 text-slate-600 border-slate-200' },
  planning:  { label: '規劃中',   color: 'bg-amber-100 text-amber-700 border-amber-200' },
}

function formatDateRange(start: string, end: string) {
  const s = new Date(start)
  const e = new Date(end)
  return `${s.getFullYear()} · ${s.getMonth()+1}/${s.getDate()} — ${e.getMonth()+1}/${e.getDate()}`
}

export default function PortalHome({ trips }: Props) {
  const confetti = ['✈️', '🧳', '📸', '🌴', '🍹', '🏝️']

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#fff9ef] via-[#fdf3df] to-[#ffeecf]">
      {/* Floating emoji */}
      <div className="pointer-events-none absolute inset-0">
        {confetti.map((icon, i) => (
          <motion.span
            key={icon + i}
            className="absolute text-2xl opacity-30"
            style={{ left: `${8 + i * 15}%`, top: `${12 + (i % 3) * 24}%` }}
            animate={{ y: [0, -16, 0], rotate: [0, 8, -8, 0] }}
            transition={{ duration: 7 + i, repeat: Infinity, ease: 'easeInOut' }}
          >
            {icon}
          </motion.span>
        ))}
      </div>

      {/* Header */}
      <header className="relative pt-16 pb-12 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-[0.35em] text-amber-700/70 uppercase mb-3"
        >
          LINBEI FAMILY CLUB
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="text-4xl md:text-6xl font-black text-[#3c2a1e] tracking-tight mb-3"
        >
          旅遊計畫總覽
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-amber-900/70 text-base max-w-md mx-auto"
        >
          為家人規劃每一段旅程，記錄每一個值得珍藏的時刻。
        </motion.p>
      </header>

      {/* Cards Grid */}
      <main className="relative max-w-6xl mx-auto px-6 pb-20">
        {trips.length === 0 ? (
          <div className="text-center text-amber-900/50 py-20 text-sm">還沒有旅遊計畫，趕快開始規劃吧！</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {trips.map((trip, i) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
                animate={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -8, rotate: 0 }}
              >
                <TripCard trip={trip} />
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

function TripCard({ trip }: { trip: TripSummary }) {
  const status = statusLabel[trip.status] ?? statusLabel.planning

  return (
    <Link
      href={`/trips/${trip.id}`}
      className="group relative block text-left rounded-2xl overflow-hidden bg-white/90 border-2 border-[#f1e2c8] shadow-[0_14px_30px_-18px_rgba(116,74,18,0.45)] transition-all duration-300 focus:outline-none"
    >
      {/* faux tape */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-40 h-8 bg-amber-100/85 border border-amber-200/80 rotate-[-2deg] z-20" />

      <div className="h-40 relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${trip.coverGradient}`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.55),transparent_55%)]" />

        <div className="absolute top-4 left-4">
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${status.color}`}>
            {status.label}
          </span>
        </div>

        <div className="absolute right-4 top-4 text-3xl drop-shadow">{trip.emoji}</div>

        <div className="absolute bottom-3 left-4 text-white/95">
          <p className="text-xs tracking-[0.2em] uppercase mb-1">Destination</p>
          <p className="font-black text-lg leading-tight">{trip.destination}</p>
        </div>
      </div>

      <div className="p-5 bg-[linear-gradient(180deg,#fffef8_0%,#fff8e8_100%)]">
        <h2 className="font-black text-[#3f2b1f] text-lg leading-snug mb-1 group-hover:text-[#6d4722] transition-colors">
          {trip.title}
        </h2>
        <p className="text-amber-900/60 text-xs mb-3">{formatDateRange(trip.startDate, trip.endDate)}</p>

        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-[11px] text-amber-800 font-semibold border border-amber-200">
            {trip.durationDays} 天旅程
          </span>
          <span className="text-xs text-amber-900/60">{trip.memberCount} 人同行</span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-1.5 flex-wrap">
            {trip.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-amber-200 text-amber-800/80 font-medium">
                {tag}
              </span>
            ))}
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-200 to-amber-100 text-amber-700 flex items-center justify-center text-sm shadow-sm group-hover:scale-110 transition-transform">
            →
          </div>
        </div>
      </div>
    </Link>
  )
}
