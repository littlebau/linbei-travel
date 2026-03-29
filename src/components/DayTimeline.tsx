'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { DayItem } from '../types/plan'

interface Props {
  days: DayItem[]
}

function formatDate(dateStr: string, dow: string) {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return `${d.getMonth()+1}/${d.getDate()}（${dow}）`
}

export default function DayTimeline({ days }: Props) {
  const [expanded, setExpanded] = useState<number | null>(0)
  if (!days?.length) return null

  const tones = [
    'from-cyan-500/25 to-blue-500/10 border-cyan-300/35',
    'from-fuchsia-500/25 to-purple-500/10 border-fuchsia-300/35',
    'from-emerald-500/25 to-teal-500/10 border-emerald-300/35',
    'from-amber-500/25 to-orange-500/10 border-amber-300/35',
  ]

  return (
    <section className="max-w-5xl mx-auto px-6 py-9">
      <div className="mb-4 flex items-center gap-3">
        <div className="h-8 w-1 rounded-full bg-fuchsia-300/70" />
        <h2 className="text-xl font-black tracking-wide text-white">逐日行程</h2>
      </div>

      <div className="space-y-3">
        {days.map((day, i) => {
          const isOpen = expanded === i
          const tone = tones[i % tones.length]
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className={`rounded-2xl border overflow-hidden bg-gradient-to-br ${tone} ${isOpen ? 'shadow-[0_20px_40px_-24px_rgba(0,0,0,0.8)]' : ''}`}
            >
              {/* Header */}
              <button
                className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-white/5 transition-colors"
                onClick={() => setExpanded(isOpen ? null : i)}
              >
                <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex flex-col items-center justify-center text-[11px] font-bold transition-colors ${isOpen ? 'bg-white/15 text-white' : 'bg-black/20 text-slate-300'}`}>
                  <span>DAY</span>
                  <span>{day.dayNumber}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] text-slate-300/70 mb-1">{formatDate(day.date, day.dayOfWeek)}</div>
                  <div className={`font-semibold text-sm truncate transition-colors ${isOpen ? 'text-white' : 'text-slate-100/90'}`}>{day.route}</div>
                </div>
                <span className={`text-slate-300 text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {/* Body */}
              <AnimatePresence initial={false}>
                {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24, ease: 'easeOut' }}
                  className="px-5 pb-5 space-y-4"
                >
                  {/* Meals */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {(['breakfast','lunch','dinner'] as const).map((meal) => {
                      const meta = { breakfast: ['🌅','早餐'], lunch: ['☀️','午餐'], dinner: ['🌙','晚餐'] }
                      const [icon, label] = meta[meal]
                      return day.meals[meal] ? (
                        <div key={meal} className="bg-black/25 rounded-xl p-3 border border-white/10">
                          <div className="text-[10px] text-slate-300 mb-1 font-semibold tracking-wide">{icon} {label}</div>
                          <div className="text-xs text-slate-100/90 leading-snug">{day.meals[meal]}</div>
                        </div>
                      ) : null
                    })}
                  </div>

                  {/* Accommodation */}
                  {day.accommodation?.name && (
                    <div className="flex items-center gap-3 bg-black/25 rounded-xl p-3 border border-white/10">
                      <span className="text-lg">🏨</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] text-slate-300/80">住宿</span>
                          {day.accommodation.checkIn && <span className="text-[10px] text-emerald-300 font-semibold">Check-in</span>}
                          {day.accommodation.checkOut && <span className="text-[10px] text-amber-300 font-semibold">Check-out</span>}
                        </div>
                        {day.accommodation.url ? (
                          <a href={day.accommodation.url} target="_blank" rel="noopener noreferrer"
                            className="text-xs text-cyan-200 hover:text-cyan-100 truncate block">
                            {day.accommodation.name}
                          </a>
                        ) : (
                          <div className="text-xs text-slate-100/90 truncate">{day.accommodation.name}</div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Activities */}
                  {day.activities?.length > 0 && (
                    <div className="space-y-2">
                      {day.activities.map((act, j) => (
                        <div key={j} className="bg-black/25 rounded-xl p-3 border border-white/10">
                          <div className="flex items-start gap-2">
                            <span className="text-slate-300 mt-0.5 text-xs">📍</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span className="text-sm font-medium text-slate-100">{act.name}</span>
                                {act.duration && <span className="text-[10px] text-slate-300/80">{act.duration}</span>}
                              </div>
                              {act.description && <p className="text-xs text-slate-200/85 leading-relaxed mb-2">{act.description}</p>}
                              {act.references?.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {act.references.map((ref, k) => (
                                    <a key={k} href={ref.url} target="_blank" rel="noopener noreferrer"
                                      className="text-[10px] text-cyan-200 hover:text-cyan-100 flex items-center gap-1">
                                      🔗 {ref.title}
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Notes */}
                  {day.notes && (
                    <div className="text-xs text-slate-100/85 bg-amber-500/10 border border-amber-300/30 rounded-xl p-3">
                      💬 {day.notes}
                    </div>
                  )}
                </motion.div>
              )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
