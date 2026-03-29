'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Trip } from '../types/plan'

interface Props {
  trip: Trip
}

export default function TripHero({ trip }: Props) {
  const start = new Date(trip.startDate)
  const end = new Date(trip.endDate)
  const dateStr = `${start.getFullYear()}.${String(start.getMonth()+1).padStart(2,'0')}.${String(start.getDate()).padStart(2,'0')} — ${String(end.getMonth()+1).padStart(2,'0')}.${String(end.getDate()).padStart(2,'0')}`

  return (
    <div className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_20%_20%,#35547a_0%,#101a2a_45%,#090d16_100%)]">
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[620px] h-[320px] bg-cyan-300/20 blur-3xl rounded-full"
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.03, 0.95] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-120px] right-[-80px] w-[320px] h-[320px] bg-fuchsia-400/20 blur-3xl rounded-full"
        animate={{ opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative max-w-4xl mx-auto px-6 pt-8 pb-12">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-300/70 hover:text-white text-sm transition-colors mb-8 group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
          所有旅遊
        </Link>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-[0.35em] text-cyan-100/70 uppercase mb-3"
        >
          LINBEI TRAVEL STUDIO
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.05 }}
          className="text-3xl md:text-5xl font-black text-white mb-3 drop-shadow"
        >
          {trip.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="text-slate-200/85 max-w-2xl mb-8 leading-relaxed"
        >
          {trip.summary}
        </motion.p>

        {/* Stats row */}
        <div className="flex flex-wrap gap-3">
          {[
            { icon: '📍', label: trip.destination },
            { icon: '📅', label: dateStr },
            { icon: '🕐', label: `${trip.durationDays} 天` },
            { icon: '👥', label: `${trip.members.count} 人 · ${trip.members.names.join('、')}` },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16 + i * 0.07 }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/12 border border-white/25 text-sm text-slate-100 backdrop-blur-md shadow-[0_10px_24px_-15px_rgba(0,0,0,0.8)]"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
